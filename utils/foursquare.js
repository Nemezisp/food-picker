const buildUrl = (ll, categories, limit, radius) => {
    return `https://api.foursquare.com/v3/places/search?ll=${ll}&radius=${radius}&categories=${categories}&limit=${limit}`
}

let restaurantCategories = ''
for (let i = 13065; i < 13387; i++) {
    restaurantCategories = restaurantCategories + i +  ','
}
restaurantCategories = restaurantCategories + 13387

export const fetchFoursquareRestaurants = async (ll, limit, radius) => {
    let url = buildUrl(ll, restaurantCategories, limit, radius)

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
}

export const fetchPlaceDetails = async (id) => {
    const response =  await fetch(
        `https://api.foursquare.com/v3/places/${id}`,
        {
            "headers": {
                'Authorization': process.env.NEXT_PUBLIC_FOURSQUARE_API_AUTH_KEY
            }
        }
    )

    const data = await response.json()
    return data
}

export const fetchPlacePhoto = async (id, width, height) => {
    const foursquareResponse =  await fetch(
        `https://api.foursquare.com/v3/places/${id}/photos?limit=1`,
        {
            "headers": {
                'Authorization': process.env.NEXT_PUBLIC_FOURSQUARE_API_AUTH_KEY
            }
        }
    )
    
    const data = await foursquareResponse.json()
    return (`https://fastly.4sqi.net/img/general/${width}x${height}` + data[0].suffix)
}

export const fetchPlaceTips = async (id) => {
    const response =  await fetch(
        `https://api.foursquare.com/v3/places/${id}/tips?sort=POPULAR&limit=3`,
        {
            "headers": {
                'Authorization': process.env.NEXT_PUBLIC_FOURSQUARE_API_AUTH_KEY
            }
        }
    )

    const data = await response.json()
    return data
}