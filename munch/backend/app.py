# import os
# import json
# import random
# from flask import Flask, jsonify, request
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)

# # Load restaurant data into memory on server startup for efficiency
# json_file_path = os.path.join(app.root_path, '../data/businesses/Manhattan_restaurants.json')
# if os.path.exists(json_file_path):
#     with open(json_file_path, 'r') as json_file:
#         restaurant_data = json.load(json_file)
#     restaurants = restaurant_data['businesses']
# else:
#     restaurants = []

# # Store the seen restaurants in memory (resets when server restarts)
# seen_restaurants = set()

# # @app.route('/api/restaurant')
# # def get_restaurant():
# #     global seen_restaurants
# #     count = int(request.args.get('count', 1))  # Default to 1 if no count is provided
# #     unseen_restaurants = [r for r in restaurants if r['id'] not in seen_restaurants]

# #     if not unseen_restaurants:
# #         return jsonify({"error": "No more restaurants available"}), 404

# #     # If count is greater than the available unseen restaurants, return as many as possible
# #     count = min(count, len(unseen_restaurants))

# #     # Pick the first `count` unseen restaurants
# #     selected_restaurants = random.sample(unseen_restaurants, count)
    
# #     # Add selected restaurants to seen set
# #     for restaurant in selected_restaurants:
# #         seen_restaurants.add(restaurant['id'])

# #     return jsonify(selected_restaurants)


# @app.route('/api/restaurant')
# def get_restaurant():
#     global seen_restaurants
#     unseen_restaurants = [r for r in restaurants if r['id'] not in seen_restaurants]

#     if not unseen_restaurants:
#         return jsonify({"error": "No more restaurants available"}), 404

#     restaurant = random.choice(unseen_restaurants)
#     seen_restaurants.add(restaurant['id'])
#     return jsonify(restaurant)


# if __name__ == '__main__':
#     app.run(debug=True)












import os
import json
import random
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load restaurant data into memory on server startup for efficiency
json_file_path = os.path.join(app.root_path, '../data/businesses/Manhattan_restaurants.json')
if os.path.exists(json_file_path):
    with open(json_file_path, 'r') as json_file:
        restaurant_data = json.load(json_file)
    restaurants = restaurant_data['businesses']
else:
    restaurants = []

# Store the seen restaurants in memory (resets when server restarts)
seen_restaurants = set()

@app.route('/api/restaurant')
def get_restaurant():
    global seen_restaurants
    count = int(request.args.get('count', 1))  # Default to 1 if no count is provided
    unseen_restaurants = [r for r in restaurants if r['id'] not in seen_restaurants]

    if not unseen_restaurants:
        return jsonify([])  # Return an empty list if no more restaurants

    # If count is greater than the available unseen restaurants, return as many as possible
    count = min(count, len(unseen_restaurants))

    # Pick the first `count` unseen restaurants
    selected_restaurants = random.sample(unseen_restaurants, count)

    # Add selected restaurants to seen set
    for restaurant in selected_restaurants:
        seen_restaurants.add(restaurant['id'])

    return jsonify(selected_restaurants)  # Ensure this always returns a list

if __name__ == '__main__':
    app.run(debug=True)




