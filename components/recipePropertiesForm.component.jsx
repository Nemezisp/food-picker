import styles from "./recipePropertiesForm.module.css"
import { useState, Fragment } from "react"
import {getRecipes} from '../utils/edamam'
import PreviewCard from "./previewCard.component"

const defaultRecipeProperties = {
    cuisineType: [],
    mealType: [],
    diet: [],
    dishType: [],
    mainIngredient: ""
}

const possibleCuisineTypes = ["American", "Asian", "British", "Carribean", "Central Europe", "Chinese", "Eastern Europe", "French", "Italian", "Indian", "Japanese", "Mexican", "Mediterranean", "Middle Eastern", "Nordic", "South American", "South East Asian", "Any"]
const possibleMealTypes = ["Breakfast", "Dinner", "Lunch", "Teatime", "Snack", "Any"]
const possibleDiets = ["Balanced", "High-fiber", "High-protein", "Low-carb", "Low-fat", "Low-sodium", "No diet"]
const possibleDishTypes = ["Biscuits and Cookies", "Bread", "Condiments and Sauces", "Desserts", "Drinks", "Main course", "Salad", "Sandwiches", "Side dish", "Soup", "Starter", "Sweets", "Any"]

const RecipePropertiesForm = () => {

    const [chosenRecipeProperties, setChosenRecipeProperties] = useState(defaultRecipeProperties)
    const [recipes, setRecipes] = useState([])
    const [noRecipesFound, setNoRecipesFound] = useState(false)
    const [searchingForRecipes, setSearchingForRecipes] = useState(false)
    const [error, setError] = useState(false)

    const handleSubmit = async () => {
        setSearchingForRecipes(true)
        setError(false)
        try {
            let recipes = await getRecipes(chosenRecipeProperties, 8)
            if (recipes.length === 0) {
                setNoRecipesFound(true)
                setRecipes([])
            } else {
                setNoRecipesFound(false)
                setRecipes(recipes)
            }
        } catch (err) {
            setError(err)
        }
        setSearchingForRecipes(false)
    }

    const handleMealTypeChange = (event) => {
        if (event.target.value === "Any") return

        let tempTypes = [...chosenRecipeProperties.mealType]

        if (event.target.checked) {
            tempTypes.push(event.target.value)
        } else {
            tempTypes = tempTypes.filter((value) => value !== event.target.value)
        }

        setChosenRecipeProperties({...chosenRecipeProperties, mealType: tempTypes})   
    }

    const handleCuisineTypeChange = (event) => {
        if (event.target.value === "Any") return
        let tempTypes = [...chosenRecipeProperties.cuisineType]

        if (event.target.checked) {
            tempTypes.push(event.target.value)
        } else {
            tempTypes = tempTypes.filter((value) => value !== event.target.value)
        }

        setChosenRecipeProperties({...chosenRecipeProperties, cuisineType: tempTypes})   
    }

    const handleDietChange = (event) => {
        if (event.target.value === "No Diet") return

        let diet = event.target.value.toLowerCase()
        let tempDiet = [...chosenRecipeProperties.diet]
        
        if (event.target.checked) {
            tempDiet.push(diet)
        } else {
            tempDiet = tempDiet.filter((value) => value !== diet)
        }

        setChosenRecipeProperties({...chosenRecipeProperties, diet: tempDiet})
    }

    const handleDishTypeChange = (event) => {
        if (event.target.value === "Any") return
        let tempTypes = [...chosenRecipeProperties.dishType]

        if (event.target.checked) {
            tempTypes.push(event.target.value)
        } else {
            tempTypes = tempTypes.filter((value) => value !== event.target.value)
        }

        setChosenRecipeProperties({...chosenRecipeProperties, dishType: tempTypes})   
    }

    const handleMainIngredientChange = (event) => {
        setChosenRecipeProperties({...chosenRecipeProperties, mainIngredient: event.target.value})
    }

    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                <h3 className={styles.smallHeading}>Cuisine Type:</h3>
                <div className={styles.checkpointBoxContainer}>
                    {possibleCuisineTypes.map((type, index) => {
                        return (
                            <div key={index} className={styles.checkboxInput}>
                                <input className={styles.checkbox} type="checkbox" value={type} onClick={handleCuisineTypeChange}/>
                                <label className={styles.label}>{type}</label>
                            </div>
                        )
                    })}
                </div>
                <h3 className={styles.smallHeading}>Diet:</h3>
                <div className={styles.checkpointBoxContainer}>
                    {possibleDiets.map((diet, index) => {
                        return (
                            <div key={index} className={styles.checkboxInput}>
                                <input className={styles.checkbox} type="checkbox" value={diet} onClick={handleDietChange}/>
                                <label className={styles.label}>{diet}</label>
                            </div>
                        )
                    })}
                </div>
                <h3 className={styles.smallHeading}>Meal Type:</h3>
                <div className={styles.checkpointBoxContainer}>
                    {possibleMealTypes.map((type, index) => {
                        return (
                            <div key={index} className={styles.checkboxInput}>
                                <input className={styles.checkbox} type="checkbox" value={type} onClick={handleMealTypeChange}/>
                                <label className={styles.label}>{type}</label>
                            </div>
                        )
                    })}
                </div>
                <h3 className={styles.smallHeading}>Dish Type:</h3>
                <div className={styles.checkpointBoxContainer}>
                    {possibleDishTypes.map((type, index) => {
                        return (
                            <div key={index} className={styles.checkboxInput}>
                                <input className={styles.checkbox} type="checkbox" value={type} onClick={handleDishTypeChange}/>
                                <label className={styles.label}>{type}</label>
                            </div>
                        )
                    })}
                </div>
                <div className={styles.inputAndSubmitContainer}>
                    <h3 className={styles.smallHeading}>Main Ingredient:</h3>
                    <input type="text" onChange={handleMainIngredientChange}/>
                    <button className={styles.searchButton} onClick={handleSubmit}>{searchingForRecipes ? "Searching..." : "Search!"}</button>
                </div>
                {noRecipesFound && <span style={{"fontSize": "20px"}}>No recipes matching your search criteria found!</span>}
                {error && <span style={{"fontSize": "20px"}}>Problem interacting with API.</span>}
                {recipes.length ?
                <Fragment>
                    <h2 className={styles.bigHeadingBlack}>Some recipes you will like:</h2>
                    <div className={styles.cardsContainer}>
                        {recipes.map((recipe, index) => {
                            return <PreviewCard key={index} smaller={true} type="recipe" name={recipe.label} category={recipe.cuisineType[0]} imgUrl={recipe.image} href={recipe.url}/>
                        })}
                    </div>
                </Fragment>              
                : null}
            </div>
        </div>
    )
}

export default RecipePropertiesForm;