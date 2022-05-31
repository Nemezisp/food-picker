import styles from "./foodBanner.module.css"
import Image from 'next/image'

const FoodBanner = (props) => {
    return (
        <div className={styles.container}>
            <div className={styles.left_container}> 
                <h1 className={styles.title}>
                    <span className={styles.title_first_part}>Recipe Picker</span>
                    <span className={styles.title_second_part}> Ultimativo</span>
                </h1>
                <div className={styles.small_image_container}>
                    <Image src="/static/cooking.png" alt='cooking pot' height={80} width={80}/>
                </div>
                <p className={styles.subtitle}>Don&apos;t know what to cook?</p>
                <div className={styles.buttons}>
                    <button className={styles.button} onClick={() => props.buttonAction()}>
                        {props.buttonLoading ? "Loading..." : "Get random recipes"}
                    </button>
                    <div className={styles.edamamContainer}>
                        <div id="edamam-badge" data-color="white"></div>
                    </div>
                </div>
            </div>
            <div className={styles.big_image_container}>
                <Image src="/static/cooking.png" alt='cooking pot' height={220} width={220}/>
            </div>
        </div>
    )
}

export default FoodBanner;