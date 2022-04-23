import Image from "next/image";
import Link from "next/link";
import cls from "classnames"

import styles from "./previewCard.module.css"

const PreviewCard = (props) => {
    return (
        <div className={cls("glass", styles.container)}>
            <Link href={props.href}>
                <a className={styles.cardLink}>
                        <div className={styles.imageContainer}>
                            <Image className={styles.cardImage} src = {props.imgUrl} alt={props.name} layout="responsive" width="100" height="60"/>
                        </div>
                        <div className={styles.headerContainer}>
                            <div className={styles.infoWithIcon}>
                                <Image src="/static/restaurant-icon.png" height="48" width="48" alt='restaurant-icon'/>
                                <h2 className={styles.cardHeader}>{props.name}</h2>
                            </div>

                            <div className={styles.infoWithIcon}>
                                <Image src="/static/category-icon.png" height="48" width="48" alt='category-icon'/>
                                <h2 className={styles.cardHeader}>{props.category}</h2>
                            </div>
                        </div>
                </a>
            </Link>
        </div>
    )
}

export default PreviewCard;