import os
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from joblib import load
import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from scipy.sparse import csr_matrix
from course_recommender import predict_courses

app = Flask(__name__)
# Enable CORS for all domains on all routes with automatic options responses.
CORS(app, supports_credentials=True)
# Load the model from the file
model = load('model.joblib')

# Load the CSV files into DataFrames
user_profiles = pd.read_csv('./data/user_profiles.csv')
user_responses = pd.read_csv('./data/user_responses.csv')


def create_interaction_matrix(df, user_col, item_col, rating_col, threshold=None):
    if threshold is not None:
        user_count = df.groupby(user_col)[rating_col].count()
        df = df[df[user_col].isin(user_count[user_count >= threshold].index)]

    # Use pivot_table with an aggregation function
    interaction_df = df.pivot_table(index=user_col, columns=item_col, values=rating_col, aggfunc='max')
    interaction_df = interaction_df.fillna(0)

    user_index = interaction_df.index
    item_index = interaction_df.columns
    interaction_matrix = csr_matrix(interaction_df.values)

    return interaction_matrix, user_index, item_index

def predict_scores(interaction_matrix, user_similarity):
    # Ensure interaction_matrix is dense if it's sparse
    if hasattr(interaction_matrix, "toarray"):
        interaction_matrix_dense = interaction_matrix.toarray()
    else:
        interaction_matrix_dense = interaction_matrix

    # Compute predicted scores as a dot product of user similarity and interaction matrix
    predicted_scores = np.dot(user_similarity, interaction_matrix_dense) / np.array([np.abs(user_similarity).sum(axis=1)]).T

    return predicted_scores

def rank_questions(predicted_scores, item_index, max_questions=10):
    ranked_question_indices = np.argsort(-predicted_scores, axis=1)
    ranked_questions = []
    for user_rank in ranked_question_indices:
        # Limit the number of questions to max_questions
        ranked_questions.append([item_index[i] for i in user_rank][:max_questions])
    return ranked_questions

def get_recommendations(new_user_profile_dict):
    
    # Convert the new user profile dictionary to DataFrame
    new_user_profile = pd.DataFrame([new_user_profile_dict])
    cluster = model.predict(new_user_profile)[0]
    
    # Filter users in the same cluster and compute similarities, etc.
    similar_users = user_profiles[user_profiles['cluster'] == cluster]['user_id']

    filtered_responses = user_responses[user_responses['user_id'].isin(similar_users)]

    # Create the user-item interaction matrix
    interaction_matrix, user_index, item_index = create_interaction_matrix(filtered_responses, 'user_id', 'question_id', 'response')

    # Compute user similarity matrix
    user_similarity = cosine_similarity(interaction_matrix)

    # Predict scores for unanswered questions
    predicted_scores = predict_scores(interaction_matrix, user_similarity)

    # Rank questions for each user based on predicted scores
    recommended_questions = rank_questions(predicted_scores, item_index)

    # Return ranked question recommendations
    return recommended_questions



@app.route('/recommend', methods=['POST'])
@cross_origin()
def recommend():
    data = request.json
    new_user_profile = data['new_user_profile']
    recommendations = get_recommendations(new_user_profile)
    response =jsonify(recommendations)
    return response


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