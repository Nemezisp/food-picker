import styles from "./forms.module.css"
import { useState, Fragment, useContext, useEffect } from "react"
import PreviewCard from "./previewCard.component"
import { getCocktailsByIngredient } from "../utils/cocktaildb"
import { StoreContext, ACTION_TYPES } from "../context/store-context"
import cls from "classnames";

const possibleIngredient = ["Vodka", "Gin", "Dark rum", "Light rum", "Tequila", "Cider", "Beer", "Absinthe", "Cachaca", "Scotch", "Red Wine", "Bourbon", "Amaretto", "Cognac", "Campari", "Sweet Vermouth", "Dry Vermouth", "Triple sec", "Brandy", "Kahlua"]

const CocktailForm = () => {

    const {dispatch, state} = useContext(StoreContext);
    const {foundCocktails} = state;

    const [chosenIngredient, setChosenIngredient] = useState("")

    const [searchingForCocktails, setSearchingForCocktails] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        if (foundCocktails && foundCocktails.length) {
            document.getElementById("cocktailCardsContainer").scrollIntoView({behavior: "smooth"});
        }
    }, [foundCocktails])

    const handleSubmit = async () => {
        setSearchingForCocktails(true)
        setError(false)
        try {
            let cocktails = await getCocktailsByIngredient(chosenIngredient, 8)
            dispatch({
                type: ACTION_TYPES.SET_FOUND_COCKTAILS,
                payload: cocktails
            })
        } catch (err) {
            setError(err)
        }
        setSearchingForCocktails(false)
    }

    const handleMainIngredientChange = (event) => {
        setChosenIngredient(event.target.value)
    }

    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                <h3 className={styles.smallHeading}>Choose an ingredient:</h3>
                <div className={styles.checkpointBoxContainer}>
                    {possibleIngredient.map((ingredient, index) => {
                        return (
                            <div key={index} className={styles.input}>
                                <input className={styles.checkbox} type="radio" name="ingredient" value={ingredient} onClick={handleMainIngredientChange}/>
                                <label className={styles.label}>{ingredient}</label>
                            </div>
                        )
                    })}
                </div>
                <button className={cls(styles.searchButton, styles.backgroundCocktails)} onClick={handleSubmit}>{searchingForCocktails ? "Searching..." : "Search!"}</button>
                {error && <div style={{"fontSize": "20px"}}>Problem interacting with API.</div>}
                {foundCocktails && foundCocktails.length ?
                <Fragment>
                    <h2 className={styles.bigHeadingBlack}>Some cocktails you will like:</h2>
                    <div className={styles.cardsContainer} id="cocktailCardsContainer">
                        {foundCocktails.map((cocktail, index) => {
                            return <PreviewCard key={index} smaller={true} type="cocktail" name={cocktail.drinks[0].strDrink} category={cocktail.drinks[0].strIngredient1} imgUrl={cocktail.drinks[0].strDrinkThumb} href={`/cocktail/${cocktail.drinks[0].idDrink}`}/>
                        })}
                    </div>
                </Fragment>              
                : null}
            </div>
        </div>
    )
}

export default CocktailForm;