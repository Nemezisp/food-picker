import styles from "./banners.module.css";
import Image from 'next/image';
import cls from "classnames";

const CocktailBanner = (props) => {
    return (
        <div className={styles.container}>
            <div className={styles.left_container}> 
                <h1 className={styles.title}>
                    <span className={styles.title_first_part}>Cocktail Picker</span>
                    <span className={styles.color_cocktails}> Ultimativo</span>
                </h1>
                <div className={styles.small_image_container}>
                    <Image src="/static/cocktail.png" alt='cocktail' height={80} width={80}/>
                </div>
                <p className={styles.subtitle}>Don&apos;t know what to drink?</p>
                <div className={styles.buttons}>
                    <button className={cls(styles.button, styles.background_cocktails)} onClick={() => props.buttonAction()}>
                        {props.buttonLoading ? "Loading..." : "Get random cocktails"}
                    </button>
                </div>
            </div>
            <div className={styles.big_image_container}>
                <Image src="/static/cocktail.png" alt='cocktail' height={220} width={220}/>
            </div>
        </div>
    )
}

export default CocktailBanner;