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
                    <Image src={`/static/banner-${typeSingular}-main.png`} alt={typeSingular} height={80} width={80}/>
                </div>
                <p className={styles.subtitle}>{props.subHeading}</p>
                <div className={styles.buttons}>
                    {props.buttonLoading ? 
                        <button className={cls(styles.button, styles[backgroundClass])} onClick={null}>
                            Loading...
                        </button> 
                        :
                        <button className={cls(styles.button, styles[backgroundClass])} onClick={() => props.buttonAction()}>
                            {`Get random ${typePlural}`}
                        </button>
                    }
                    {typeSingular === "recipe" &&
                        <a href="https://www.edamam.com/" className={styles.edamamContainer}>
                            <Image src="/static/edamam-white.png" alt="edamam badge" layout="responsive" height={26} width={130}/>
                        </a>
                    }
                </div>
            </div>
            <div className={styles.big_image_container}>
                <Image src={`/static/banner-${typeSingular}-main.png`} alt={typeSingular} height={220} width={220}/>
            </div>
        </div>
    )
}

export default Banner;