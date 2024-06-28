import numpy as np
import joblib
import tensorflow as tf
import pandas as pd

# Load your trained model and encoders
model = tf.keras.models.load_model('./course_recommendation_model/model')
encoder = joblib.load('./course_recommendation_model/encoder.joblib')
label_encoder = joblib.load('./course_recommendation_model/label_encoder.joblib')

def predict_courses(user_responses):
    # Convert user_responses to a DataFrame
    user_df = pd.DataFrame(user_responses)
    
    # Encode the user responses
    user_encoded = encoder.transform(user_df[['business_area_id', 'skills', 'proficiency']])
    
    # Get predictions (probability scores for each course)
    predictions = model.predict(user_encoded)

    # Sum the probabilities for each course to get a relevance score
    relevance_scores = predictions.sum(axis=0)

    # Define a threshold for relevance (e.g., courses with a relevance score above a certain threshold)
    threshold = 0.1  # Adjust based on your requirements

    # Get indices of courses above the threshold
    relevant_indices = np.where(relevance_scores > threshold)[0]

    # Decode these indices back to course IDs
    relevant_courses = label_encoder.inverse_transform(relevant_indices)

    # Ensure only unique courses are included
    unique_relevant_courses = np.unique(relevant_courses)
    
    return unique_relevant_courses.tolist()

