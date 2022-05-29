import styles from "./pickRestaurant.module.css"
import { useState, useContext, useEffect } from "react"
import { StoreContext } from "../context/store-context";
import PreviewCard from "./previewCard.component";
import { fetchSingleFoursquareRestaurant, fetchPlacePhoto } from "../utils/foursquare";

const PickRestaurant = (props) => {
    const {state} = useContext(StoreContext);
    const {latLong} = state;

    const [step, setStep] = useState('range')
    const [chosenRadius, setChosenRadius] = useState(null)
    const [chosenType, setChosenType] = useState(null)
    const [chosenRestaurant, setChosenRestaurant] = useState(null)

    useEffect(() => {
        const findRestaurant = async () => {
            const data = await fetchSingleFoursquareRestaurant(latLong, chosenType, chosenRadius);
            const restaurant = data.results[0]
            const photoUrl = await fetchPlacePhoto(restaurant.fsq_id, 430, 260)
            restaurant['imageUrl'] = photoUrl
            setChosenRestaurant(restaurant)
            setStep('result')
        }
        if (chosenType) {
            findRestaurant()
        }
    }, [chosenType])

    const handleRadiusButtonClick = (option) => {
        setChosenRadius(option)
        setStep('type')
    }
    
    const handleTypeButtonClick = async (option) => {
        setChosenType(option)
    }

    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                {step === 'range' && 
                    <div className={styles.stepContainer}>
                        <h2 className={styles.heading}>How far are you willing to go?</h2>
                        <div className={styles.optionsContainer}> 
                            <button className={styles.optionButton} onClick={() => handleRadiusButtonClick('1000')}> A short walk (Less than 1km) </button>
                            <button className={styles.optionButton} onClick={() => handleRadiusButtonClick('3000')}> A longer walk (Less than 3km)</button>
                            <button className={styles.optionButton} onClick={() => handleRadiusButtonClick('6000')}> A short drive (Less than 6km)</button>
                            <button className={styles.optionButton} onClick={() => handleRadiusButtonClick('9000')}> A longer drive (Less than 9km) </button>
                            <div className={styles.lastOption}>
                                <button className={styles.optionButton} onClick={() => handleRadiusButtonClick('15000')}> Doesn&apos;t matter! </button>
                            </div>
                        </div>
                    </div>
                }
                {step === 'type' && 
                    <div className={styles.stepContainer}>
                        <h2 className={styles.heading}>Any preferences about cuisine type?</h2>
                        <div className={styles.optionsContainer}> 
                            <button className={styles.optionButton} onClick={() => handleTypeButtonClick('asian')}> Asian </button>
                            <button className={styles.optionButton} onClick={() => handleTypeButtonClick('european')}> European </button>
                            <button className={styles.optionButton} onClick={() => handleTypeButtonClick('american')}> American (Central/South) </button>
                            <button className={styles.optionButton} onClick={() => handleTypeButtonClick('middle-east')}> Middle Eastern / Balkan </button>
                            <div className={styles.lastOption}>
                                <button className={styles.optionButton} onClick={() => handleTypeButtonClick('all')}> No preference at all! </button>
                            </div>
                        </div>
                    </div>
                }
                {step === 'result' && 
                    <div className={styles.stepContainer}>
                        <h2 className={styles.heading}>Ideal restaurant for you:</h2>
                        <div className={styles.resultCard}>
                            <PreviewCard type={"restaurant"} smaller={true} key={chosenRestaurant.fsq_id} name={chosenRestaurant.name} category={chosenRestaurant.categories[0].name} imgUrl={chosenRestaurant.imageUrl} href={`/restaurant/${chosenRestaurant.fsq_id}`}/>
                        </div>
                    </div>
                }
                <div className={styles.modalClose} onClick={() => props.setIsModalOpen(false)}>&times;</div>
            </div>
        </div>
    )
}

export default PickRestaurant;