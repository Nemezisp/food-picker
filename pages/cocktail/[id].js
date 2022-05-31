import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import cls from 'classnames'
import { getCocktailById } from '../../utils/cocktaildb'

import styles from '../../styles/cocktail.module.css'
import { Fragment, useEffect, useState } from 'react'

const Cocktail = () => {
    const router = useRouter()

    const [cocktail, setCocktail] = useState(null)
    const [ingredients, setIngredients] = useState([])

    const getCocktail = async (id) => {
        try {
            let cocktail = await getCocktailById(id)
            console.log(cocktail)
            setCocktail(cocktail.drinks[0])
        } catch (err) {
            alert(err)
        }
    }

    const getIngredients = () => {
        let i = 1;
        let ingredientNameVariable = `strIngredient${i}` 
        let ingredients = [];
        while (cocktail && cocktail[ingredientNameVariable]) {
            let ingredientAmountVariable = `strMeasure${i}`
            ingredients.push({
                name: cocktail[ingredientNameVariable],
                amount: cocktail[ingredientAmountVariable]
            })
            i++;
            ingredientNameVariable = `strIngredient${i}`;
        }
       return ingredients;
    }

    useEffect(()=>{
        if(!router.isReady) return;
        getCocktail(router.query.id)
    }, [router.isReady]);

    useEffect(()=>{
        if(!cocktail) return;
        setIngredients(getIngredients())
    }, [cocktail]);

    return (
        cocktail ? 
        <div className={styles.outerContainer}>
            <div className={styles.innerContainer}>
                <Head>
                    <title>{cocktail.strDrink}</title>
                </Head>
                <div className={styles.homeLinkContainer}>
                    <Link href="/cocktails"><a className={styles.homeLink}>&#x2190; Back Home</a></Link>
                </div>
                <h1 className={styles.name}>{cocktail.strDrink}</h1>
                <div className={styles.bottomContainer}>
                    <div className={styles.imageContainer}>
                        <Image className={cocktail.strDrinkThumb} src = {cocktail.strDrinkThumb} alt={cocktail.strDrink} layout="responsive" width="100" height="100"/>
                    </div>
                    <div className={cls("glass-no-hover", styles.infoContainer)}>
                        <h3 className={styles.infoHeading}>Ingredients:</h3>
                        <div className={styles.ingredientsContainer}>
                            {ingredients.length > 0 && ingredients.map((ingredient, index) => {
                                return (
                                    <Fragment key={index}>
                                        <span><i>{ingredient.amount}</i></span>
                                        <span>{ingredient.name}</span>
                                    </Fragment>
                                )
                            })}
                        </div>
                        <div className={styles.recipeContainer}>
                            <h3 className={styles.infoHeading}>Recipe:</h3>
                            <span>{cocktail.strInstructions}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        : <div className={styles.loading}>Loading cocktail data...</div>
    )
}

export default Cocktail;