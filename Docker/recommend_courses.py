import numpy as np
import joblib
import tensorflow as tf

# Load your trained model and encoders
model = tf.keras.models.load_model('./course_recommendation_model/model')
encoder = joblib.load('./course_recommendation_model/encoder.joblib')
label_encoder = joblib.load('./course_recommendation_model/label_encoder.joblib')

def predict_courses(user_responses):
    # Convert user_responses to a DataFrame
    user_df = pd.DataFrame(user_responses)
    
    # Encode the user responses
    user_encoded = encoder.transform(user_df[['business_area_id', 'skills', 'proficiency']])
    
    # Predict courses
    predictions = model.predict(user_encoded)
    
    # Get the index of the highest probability class for each example
    predicted_labels = np.argmax(predictions, axis=1)
    
    # Decode these labels back to course IDs
    predicted_courses = label_encoder.inverse_transform(predicted_labels)
    
    # Use numpy.unique to get only unique courses
    unique_predicted_courses = np.unique(predicted_courses)
    
    return unique_predicted_courses.tolist()

