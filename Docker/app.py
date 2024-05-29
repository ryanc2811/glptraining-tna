import os
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from joblib import load
import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from course_recommender import predict_courses

app = Flask(__name__)
# Enable CORS for all domains on all routes with automatic options responses.
CORS(app, supports_credentials=True)
# Load the pre-trained TF-IDF vectorizer
tfidf_vectorizer = load('tfidf_vectorizer.joblib')

# Load the CSV files into DataFrames
user_profiles = pd.read_csv('./data/user_profiles.csv')
questions_data = pd.read_csv('./data/questions_data.csv')
user_responses = pd.read_csv('./data/user_responses.csv')


# Ensure the dev_areas_str and key_dev_areas_str columns are created
user_profiles['dev_areas_str'] = user_profiles['developmentAreas'].apply(lambda x: ' '.join(eval(x)) if isinstance(x, str) else '')
questions_data['key_dev_areas_str'] = questions_data['key_development_areas'].apply(lambda x: ' '.join(eval(x)) if isinstance(x, str) else '')

# Transform the questions data using the TF-IDF vectorizer
questions_transformed = tfidf_vectorizer.transform(questions_data['key_dev_areas_str'])

def recommend_questions(user_profile, questions_data, tfidf_vectorizer, questions_transformed, top_n=10):
    user_vector = tfidf_vectorizer.transform([user_profile['dev_areas_str'].values[0]])
    similarity_scores = cosine_similarity(user_vector, questions_transformed).flatten()
    
    # Rank questions by similarity scores
    ranked_indices = similarity_scores.argsort()[::-1]
    recommended_questions = questions_data.iloc[ranked_indices].head(top_n)  # Recommend top N questions

    return recommended_questions['question_id'].values.tolist()



@app.route('/recommend', methods=['POST'])
@cross_origin()
def recommend():
    data = request.json
    new_user_profile = pd.DataFrame([data['new_user_profile']])
    new_user_profile['dev_areas_str'] = new_user_profile['developmentAreas'].apply(lambda x: ' '.join(x) if isinstance(x, list) else '')
    recommendations = recommend_questions(new_user_profile, questions_data, tfidf_vectorizer, questions_transformed)
    return jsonify({'recommended_questions': recommendations})

@app.route('/predict', methods=['POST'])
def recommend_courses():
    try:
        # Receive JSON data from the client
        data = request.get_json(force=True)
        
        # Extract user responses from the data
        user_responses = data['user_responses']
        
        # Call the recommendation engine
        predictions = predict_courses(user_responses)
        
        # Return predictions
        return jsonify({'predicted_courses': predictions}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 8080)))