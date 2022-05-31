import Head from 'next/head'
import styles from '../styles/Restaurants.module.css'
import PreviewCard from '../components/previewCard.component'

import { fetchFoursquareRestaurants, fetchPlacePhoto } from '../utils/foursquare'

import Banner from '../components/banner.component'
import Navigation from '../components/navigation.component'

import { Fragment, useEffect, useState, useContext } from 'react'
import { ACTION_TYPES, StoreContext } from "../context/store-context";

const fetchPhotosForRestaurants = async (restaurants) => {
  let restaurantPhotoUrls = [];

  for (let i=0; i<restaurants.results.length; i++) {
    let restaurantPhotoUrl = await fetchPlacePhoto(restaurants.results[i].fsq_id, 430, 260);
    restaurantPhotoUrls.push(restaurantPhotoUrl);
  }

  return restaurantPhotoUrls;
}

export async function getStaticProps(context) {
  const restaurants = await fetchFoursquareRestaurants("52.23631515025,20.98001539258103", "9", "2000");
  const restaurantPhotoUrls = await fetchPhotosForRestaurants(restaurants);

  return {
    props: {
      restaurants: restaurants.results,
      restaurantPhotoUrls
    },
  }
}

export default function Restaurants(props) {
  const {dispatch, state} = useContext(StoreContext);
  const {latLong, nearbyRestaurants, nearbyRestaurantPhotoUrls} = state;

  const [areNearbyRestaurantsLoading, setNearbyRestaurantsLoading] = useState(false);
  const [shouldNearbyRestaurantsLoad, setShouldNearbyRestaurantsLoad] = useState(false)

  async function fetchNearbyRestaurants() {
    if(latLong && nearbyRestaurants.length === 0) {
      setNearbyRestaurantsLoading(true);
      try {
        const fetchedRestaurants = await fetchFoursquareRestaurants(latLong, "9", "2000")
        const restaurantPhotoUrls = await fetchPhotosForRestaurants(fetchedRestaurants);

        dispatch({
          type: ACTION_TYPES.SET_NEARBY_RESTAURANTS,
          payload: fetchedRestaurants.results
        })

        dispatch({
          type: ACTION_TYPES.SET_NEARBY_RESTAURANT_PHOTO_URLS,
          payload: restaurantPhotoUrls
        })
      } catch (err) {
        alert(err.message)
      }
      setNearbyRestaurantsLoading(false);
    }
  }

  useEffect(() => {
    if (shouldNearbyRestaurantsLoad) {
      fetchNearbyRestaurants();
      setShouldNearbyRestaurantsLoad(false);
    } 
  }, [latLong])

  return (
    <div>
      <Head>
        <title>Restaurant Picker</title>
        <meta name="description" content="Let us pick a restaurant for you!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navigation site="restaurants"/>
      <div className={styles.main}>
        <Banner areNearbyRestaurantsLoading={areNearbyRestaurantsLoading} setShouldNearbyRestaurantsLoad={setShouldNearbyRestaurantsLoad} fetchNearbyRestaurants={fetchNearbyRestaurants}/>
        {(nearbyRestaurants.length > 0 && nearbyRestaurantPhotoUrls.length > 0) &&
          <Fragment>
            <h2 className={styles.heading2}>Restaurants near you</h2>
            <div className={styles.cardsContainer}>
              {nearbyRestaurants.map((restaurant, index) => {
                  return <PreviewCard smaller={false} key={restaurant.fsq_id} type="restaurant" name={restaurant.name} category={restaurant.categories[0].name} imgUrl={nearbyRestaurantPhotoUrls[index]} href={`/restaurant/${restaurant.fsq_id}`}/>
              })}
            </div>
          </Fragment>
        }
        <h2 className={styles.heading2}>Warsaw Restaurants</h2>
        <div className={styles.cardsContainer}>
          {props.restaurants.map((restaurant, index) => {
              return <PreviewCard smaller={false} key={restaurant.fsq_id} type="restaurant" name={restaurant.name} category={restaurant.categories[0].name} imgUrl={props.restaurantPhotoUrls[index]} href={`/restaurant/${restaurant.fsq_id}`}/>
          })}
        </div>
      </div>
    </div>
  )
}