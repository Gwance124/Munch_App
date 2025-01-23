import os
import json
import pandas as pd
import requests
import time

# Function to save the JSON data and convert it to CSV
def save_data_to_files(business_data, file_name_prefix):
    # Ensure the folder exists
    os.makedirs('../data/businesses', exist_ok=True)
    
    # Save JSON
    json_file_path = f'../data/businesses/{file_name_prefix}.json'
    with open(json_file_path, 'w') as json_file:
        json.dump(business_data, json_file, indent=4)
    
    # Convert to DataFrame for CSV
    businesses = business_data.get('businesses', [])  # Use .get() to handle missing 'businesses' key
    data = []
    
    for business in businesses:
        business_info = {
            'id': business.get('id', "N/A"),
            'name': business.get('name', "N/A"),
            'rating': business.get('rating', "N/A"),
            'review_count': business.get('review_count', "N/A"),
            'categories': [category.get('title', "N/A") for category in business.get('categories', [])],
            'price': business.get('price', "N/A"),
            'address': " ".join(business.get('location', {}).get('display_address', ["N/A"])),
            'phone': business.get('phone', "N/A"),
            'image_url': business.get('image_url', "N/A"),
            'url': business.get('url', "N/A"),
            'latitude': business.get('coordinates', {}).get('latitude', "N/A"),
            'longitude': business.get('coordinates', {}).get('longitude', "N/A"),
            'distance': business.get('distance', "N/A")
        }
        data.append(business_info)
    
    # Convert to pandas DataFrame and save to CSV
    df = pd.DataFrame(data)
    csv_file_path = f'../data/businesses/{file_name_prefix}.csv'
    df.to_csv(csv_file_path, index=False)
    print(f"Data saved to {json_file_path} and {csv_file_path}")

# Function to save the API call parameters for state tracking
def save_api_call_params(api_params, file_name='api_calls_state.json'):
    os.makedirs('../data/businesses', exist_ok=True)
    state_file_path = f'../data/businesses/{file_name}'
    
    if os.path.exists(state_file_path):
        with open(state_file_path, 'r') as state_file:
            state_data = json.load(state_file)
    else:
        state_data = {}

    state_data[str(api_params)] = api_params

    with open(state_file_path, 'w') as state_file:
        json.dump(state_data, state_file, indent=4)

# Function to check if the region has been processed before
def check_previous_call(api_params, file_name='api_calls_state.json'):
    state_file_path = f'../data/businesses/{file_name}'
    if os.path.exists(state_file_path):
        with open(state_file_path, 'r') as state_file:
            state_data = json.load(state_file)
        return str(api_params) in state_data
    return False

# Fetch Yelp data with pagination
def fetch_yelp_data(api_url, headers, params, max_results=240):
    """
    Fetch data from Yelp API, handling pagination and respecting the 240 results limit.
    """
    results = []
    limit = 50  # Maximum results per request
    max_offset = min(max_results, 240) - limit  # Ensure offset doesn't exceed 240 - limit

    for offset in range(0, max_offset + 1, limit):
        params['limit'] = limit
        params['offset'] = offset
        if check_previous_call(params):
            print(f"Skipping previously fetched data for: {params}")
            continue

        print(f"Fetching data with parameters: {params}")
        response = requests.get(api_url, headers=headers, params=params)
        
        if response.status_code == 200:
            data = response.json()
            businesses = data.get('businesses', [])
            results.extend(businesses)
            save_api_call_params(params)
            print(f"Fetched {len(businesses)} businesses (offset: {offset}).")
            time.sleep(1)  # Prevent hitting API rate limits
        else:
            print(f"Failed API call: {response.status_code} - {response.text}")
            break

        # Stop if we fetch fewer results than the limit, meaning no more data is available
        if len(businesses) < limit:
            print(f"Fewer results fetched ({len(businesses)}); no more data to fetch.")
            break

    if results:
        business_data = {"businesses": results}
        save_data_to_files(business_data, f"{params['location']}_restaurants")
    else:
        print("No data retrieved.")


def main():
    API_URL = "https://api.yelp.com/v3/businesses/search"
    headers = {
        "accept": "application/json",
        "authorization": "Bearer API_KEY"
    }
    params_list = [
        {"location": "Manhattan", "latitude": 40.7831, "longitude": -73.9712, "radius": 4000, "term": "restaurants"},
        {"location": "Upper Manhattan", "latitude": 40.8610, "longitude": -73.9375, "radius": 4000, "term": "restaurants"},
        {"location": "Lower Manhattan", "latitude": 40.7128, "longitude": -74.0060, "radius": 4000, "term": "restaurants"},
    ]

    for params in params_list:
        fetch_yelp_data(API_URL, headers, params)

if __name__ == '__main__':
    main()