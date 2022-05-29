import Image from "next/image";
import Link from "next/link";
import cls from "classnames"

import styles from "./previewCard.module.css"

const PreviewCard = (props) => {

    let imageWidth = props.type === "restaurant" ? "100" : "60"
    let containerClass = props.smaller === true ? "smallerContainer container" : "container"

    return (
        <div className={cls("glass", styles[containerClass])}>
            <Link href={props.href}>
                <a className={styles.cardLink}>
                    <div className={styles.imageContainer}>
                        <Image src = {props.imgUrl} alt={props.name} layout="responsive" width={imageWidth} height="60"/>
                    </div>
                    <div className={styles.headerContainer}>
                        <div className={styles.infoWithIcon}>
                            {props.type === "restaurant" && <Image src="/static/restaurant-icon.png" height="48" width="48" alt='restaurant-icon'/>}
                            {props.type === "recipe" && <Image src="/static/category-icon.png" height="48" width="48" alt='restaurant-icon'/>}
                            <h2 className={styles.cardHeader}>{props.name.length > 28 ? props.name.slice(0, 25) + "..." : props.name}</h2>
                        </div>

                        <div className={styles.infoWithIcon}>
                            {props.type === "restaurant" && <Image src="/static/category-icon.png" height="48" width="48" alt='restaurant-icon'/>}
                            {props.type === "recipe" && <Image src="/static/map.png" height="48" width="48" alt='restaurant-icon'/>}
                            <h2 className={styles.cardHeader}>{props.category}</h2>
                        </div>
                    </div>
                </a>
            </Link>
        </div>
    )
}

export default PreviewCard;