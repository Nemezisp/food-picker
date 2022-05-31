import styles from "./banners.module.css";
import Image from 'next/image';
import cls from "classnames";

const Banner = (props) => {
    const typeSingular = props.type
    const typePlural = typeSingular+'s'
    const colorClass = "color_" + typePlural
    const backgroundClass = "background_" + typePlural

    return (
        <div className={styles.container}>
            <div className={styles.left_container}> 
                <h1 className={styles.title}>
                    <span className={styles.title_first_part}>{typeSingular} Picker</span>
                    <span className={styles[colorClass]}> Ultimativo</span>
                </h1>
                <div className={styles.small_image_container}>
                    <Image src={`/static/${typeSingular}.png`} alt={typeSingular} height={80} width={80}/>
                </div>
                <p className={styles.subtitle}>Don&apos;t know what to drink?</p>
                <div className={styles.buttons}>
                    <button className={cls(styles.button, styles[backgroundClass])} onClick={() => props.buttonAction()}>
                        {props.buttonLoading ? "Loading..." : `Get random ${typePlural}`}
                    </button>
                    {typeSingular === "recipe" &&
                        <div className={styles.edamamContainer}>
                            <div id="edamam-badge" data-color="white"></div>
                        </div>
                    }
                </div>
            </div>
            <div className={styles.big_image_container}>
                <Image src={`/static/${typeSingular}.png`} alt={typeSingular} height={220} width={220}/>
            </div>
        </div>
    )
}

export default Banner;