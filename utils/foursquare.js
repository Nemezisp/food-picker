const buildUrl = (ll, categories, limit, radius) => {
    return `https://api.foursquare.com/v3/places/search?ll=${ll}&radius=${radius}&categories=${categories}&limit=${limit}`
}

let restaurantCategories = ''
for (let i = 13065; i < 13381; i++) {
    restaurantCategories = restaurantCategories + i +  ','
}

const fetchFromForsquare = async (url) => {
    try {
        const response =  await fetch(
            url,
            {
                "headers": {
                    'Authorization': process.env.NEXT_PUBLIC_FOURSQUARE_API_AUTH_KEY,
                }
            }
        )
    
        const data = await response.json()
        return data
    } catch (err) {
        return err
    }
   
}

export const fetchFoursquareRestaurants = async (ll, limit, radius) => {
    let url = buildUrl(ll, restaurantCategories, limit, radius)
    return await fetchFromForsquare(url)
}

export const fetchSingleFoursquareRestaurant = async (ll, categories, radius) => {
    let chosenCategories;
    switch (categories) {
        case "all":
            chosenCategories = restaurantCategories;
            break;
        case "european":
            chosenCategories = '13074,13077,13136,13139,13142,13148,13165,13197,13236,13324,13325,13329,13336,13341,13345,13349,13374';
            break;
        case "asian":
            chosenCategories = '13072,13075,13096,13099,13194,13198,13199,13225,13263,13289,13312,13316,13340,13348,13352,13355,13379';
            break;
        case "middle-east":
            chosenCategories = '13071,13078,13093,13177,13234,13235,13302,13317,13350,13356,13380';
            break;
        case "american":
            chosenCategories = '13070,13079,13097,13133,13135,13141,13192,13297,13303,13305,13306,13322,13327,13333,13343,13378'
            break;
    }

    let url = buildUrl(ll, chosenCategories, 1, radius)
    
    return await fetchFromForsquare(url)
}

export const fetchPlaceDetails = async (id) => {
    return await fetchFromForsquare(`https://api.foursquare.com/v3/places/${id}`)
}

export const fetchPlacePhoto = async (id, width, height) => {
    const data = await fetchFromForsquare( `https://api.foursquare.com/v3/places/${id}/photos?limit=1`)
    return (`https://fastly.4sqi.net/img/general/${width}x${height}` + data[0].suffix)
}

export const fetchPlaceTips = async (id) => {
    return await fetchFromForsquare(`https://api.foursquare.com/v3/places/${id}/tips?sort=POPULAR&limit=3`)
}