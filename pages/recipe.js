import styles from '../styles/Recipe.module.css'
import Head from 'next/head'
import FoodBanner from '../components/foodBanner.component'
import PreviewCard from '../components/previewCard.component'
import RecipePropertiesForm from '../components/recipePropertiesForm.component'
import { useContext, useState, Fragment } from 'react'
import { StoreContext } from '../context/store-context'
import { getRandomRecipes, getRecipe } from '../utils/edamam'
import { ACTION_TYPES } from '../context/store-context'

const Recipe = () => {  
    const {dispatch, state} = useContext(StoreContext);
    const {randomRecipes} = state;

    const [gettingRecipes, setGettingRecipes] = useState(false)

    async function fetchRandomRecipes() {
        setGettingRecipes(true);
        try {
            const fetchedRecipes = await getRandomRecipes(4)
            console.log(fetchRandomRecipes)
            dispatch({
                type: ACTION_TYPES.SET_RANDOM_RECIPES,
                payload: fetchedRecipes
            })

        } catch (err) {
            alert(err.message)
        }
        setGettingRecipes(false);
    }

    return (
      <div className={styles.container}>
        <Head>
          <title>Recipe Picker</title>
          <meta name="description" content="Let us pick a recipe for you!" />
          <script src="https://developer.edamam.com/attribution/badge.js"></script>
        </Head>
  
        <div className={styles.main}>
            <FoodBanner buttonAction={fetchRandomRecipes} buttonLoading={gettingRecipes}/>
            <div className={styles.edamamContainer}>
                <div id="edamam-badge" data-color="white"></div>
            </div>
            {(randomRecipes.length > 0) &&
                <Fragment>
                    <h2 className={styles.heading2}>Random recipes:</h2>
                    <div className={styles.cardsContainer}>
                    {randomRecipes.map((recipe, index) => {
                        return <PreviewCard key={index} type="recipe" name={recipe.label} category={recipe.cuisineType[0]} imgUrl={recipe.image} href={recipe.url}/>
                    })}
                    </div>
                </Fragment>
            }
            <RecipePropertiesForm/>
        </div>
      </div>
    )
}

export default Recipe;