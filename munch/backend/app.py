from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/api/restaurants')
def get_restaurants():
    restaurants = [
        {"name": "Sushi Palace", "cuisine": "Japanese", "image": "/images/sushi.jpg"},
        {"name": "Pasta Heaven", "cuisine": "Italian", "image": "/images/pasta.jpg"}
    ]
    return jsonify(restaurants)

if __name__ == '__main__':
    app.run(debug=True)
