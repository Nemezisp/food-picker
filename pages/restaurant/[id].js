import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import dynamic from 'next/dynamic'

import useSWR from 'swr'

const Map = dynamic(() => import('../../components/map.component'), {ssr:false}); 

import { fetchFoursquareRestaurants, fetchPlaceDetails, fetchPlacePhoto, fetchPlaceTips } from '../../utils/foursquare'
import { createCookie, getCookie, updateCookie } from '../../utils/cookies'

import cls from 'classnames'

import styles from '../../styles/restaurant.module.css'
import { useEffect, useState } from 'react'

export async function getStaticProps({params}) {
    const restaurant = await fetchPlaceDetails(params.id)
    const mainPhotoUrl = await fetchPlacePhoto(params.id, 600, 400)
    const placeTips = await fetchPlaceTips(params.id)

    let tipArray = []
    for (let i = 0; i < 3; i++){
        placeTips[i] ? tipArray.push(placeTips[i].text) : tipArray.push("No review")
    }

    return {
        props: {
            name: restaurant.name,
            category: restaurant.categories[0].name,
            address: restaurant.location.address || "No address",
            mainPhotoUrl,
            placeTips: tipArray,
            latLong: [restaurant.geocodes.main.latitude, restaurant.geocodes.main.longitude]
        }
    }
}

export async function getStaticPaths() {
    const restaurants = await fetchFoursquareRestaurants("52.23631515025,20.98001539258103", "9", "2000")

    const paths = restaurants.results.map(restaurant => {
        return {
            params: {
                id: restaurant.fsq_id.toString()
            }
        }
    })
    return {
        paths,
        fallback: true
    }
}

const Restaurant = (props) => {
    const router = useRouter()
    let id = router.query.id

    const {name, address, category, mainPhotoUrl, placeTips, latLong} = props

    const [voteCount, setVoteCount] = useState(0)
    const [rating, setRating] = useState(0)
    const [userRating, setUserRating] = useState(null)
    const [votedMessage, setVotedMessage] = useState(null)

    const fetcher = (url) => fetch(url).then((res) => res.json());

    const {data, error} = useSWR(`/api/getRestaurantById?id=${id}`, fetcher)

    const handleCreateRestaurantRecord = async () => {
        const data = {
            id,
            name,
            'address': address || "No address for this place",
            'category': category,
            'photoUrl': mainPhotoUrl,
            'tip1': placeTips[0] || "No tip",
            'tip2': placeTips[1] || "No tip",
            'tip3': placeTips[2] || "No tip",
            'votes': 0,
            'rating': 0,
        }
        
        try {
            const response = await fetch(('/api/createRestaurant'),
                {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }
            )

            const restaurant = await response.json()
        } catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (name) {
            handleCreateRestaurantRecord()
        }
    }, [id, name])


    useEffect(() => {
        if (data && data.Id) {
            setVoteCount(data.Votes)
            setRating(data.Rating)
        }
    }, [data])
    
    const clickVoteButton = async () => {
        if (userRating) {

            if (getCookie('vote')) {
                if (getCookie('vote').includes(id)) {
                    setVotedMessage('You already voted on this restaurant!')
                    console.log('here')
                    return
                } else {
                    updateCookie('vote', id)
                }
            } else {
                createCookie('vote', id)
            }

            try {
                const response = await fetch((`/api/voteRestaurantById?id=${id}`),
                    {
                        method: 'PUT',
                        headers: {
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify({'rating': userRating})
                    }
                )
                const restaurant = await response.json()
                if (restaurant && restaurant.Id) {
                    const newRating = (rating*voteCount+userRating)/(voteCount+1)
                    setRating(newRating)
                    const votes = voteCount + 1;
                    setVoteCount(votes)
                    setVotedMessage('Thank you for voting!')
                }
            } catch(err) {
                console.log(err)
            }  
        }
    }

    const handleRatingInput = (event) => {
        setUserRating(parseFloat(event.target.value))
        document.getElementById('rating').style.setProperty('--value', event.target.value)
    }

    if (error) {
        return <div className={styles.loading}>Something went wrong when retrieving cofee store page</div>
    }

    if (router.isFallback) {
        return <div className={styles.loading}>Loading restaurant data...</div>
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>{name}</title>
            </Head>
            <div className={styles.topContainer}>
                <div className={styles.leftColumn}>
                    <div className={styles.homeLinkContainer}>
                        <Link href="/"><a className={styles.homeLink}>&#x2190; Back Home</a></Link>
                    </div>
                    <h1 className={styles.name}>{name}</h1>
                    <Image className={styles.mainImage} src = {mainPhotoUrl} alt={name} layout="responsive" width="100" height="60"/>
                </div>
                <div className={styles.rightColumn}>
                    <div className={cls("glass-no-hover", styles.infoContainer)}>
                        <div className={styles.infoWithIcon}>
                            <Image src="/static/address-icon.png" height="48" width="48" alt='address-icon'/>
                            <span>{address}</span>
                        </div>
                        <div className={styles.infoWithIcon}>
                            <Image src="/static/category-icon.png" height="48" width="48" alt='category-icon'/>
                            <span>{category}</span>
                        </div>
                        <div className={styles.infoWithIcon}>
                            <Image src="/static/star-icon.png" height="48" width="48" alt='star-icon'/>
                            <span>{rating.toFixed(1)} ({voteCount})</span>
                        </div>
                        {votedMessage 
                            ? <span className={styles.votedMessage}>{votedMessage}</span>
                            :                    
                            <div className={styles.ratingContainer}>
                                <input
                                    className={styles.rating}
                                    id='rating'
                                    max="5"
                                    onInput={(event) => handleRatingInput(event)}
                                    step="0.5"
                                    type="range"
                                    value="1"/>
                            <button type='button' className={styles.button} onClick={() => clickVoteButton()}>Rate!</button>
                            </div>
                        }           
                    </div>
                    <div className={styles.mapContainer}>
                        <Map latlong={latLong} restaurantName={name}/>
                    </div>
                </div>
            </div>
            <h3 className={styles.opinionHeading}>Popular reviews:</h3>
            <div className={styles.bottomContainer}>
                <div className={cls("glass-no-hover", styles.tipContainer)}>{placeTips[0]}</div>
                <div className={cls("glass-no-hover", styles.tipContainer)}>{placeTips[1]} </div>
                <div className={cls("glass-no-hover", styles.tipContainer)}>{placeTips[2]} </div>
            </div>
        </div>
    )
}

export default Restaurant;