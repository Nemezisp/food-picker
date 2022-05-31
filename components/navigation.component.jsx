import styles from "./navigation.module.css"
import Link from "next/link";

const Navigation = ({site}) => {
    return (
        <div className={styles.navContainer}>
            {site !== "restaurants" &&  
                <Link passHref={false} href="/restaurants">
                    <div className={styles.restaurantsLink}>Go to Restaurants</div>
                </Link>
            }
            {site !== "recipes" &&  
                <Link passHref={false} href="/recipes">
                    <div className={styles.recipesLink}>Go to Recipes</div>
                </Link>
            }
            {site !== "cocktails" &&  
                <Link passHref={false} href="/cocktails">
                    <div className={styles.cocktailsLink}>Go to Cocktails</div>
                </Link>
            }
        </div>
    )
}

export default Navigation;