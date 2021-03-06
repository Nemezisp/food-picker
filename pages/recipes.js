import styles from '../styles/Recipes.module.css'
import Head from 'next/head'
import Banner from '../components/banner.component'
import PreviewCard from '../components/previewCard.component'
import RecipePropertiesForm from '../components/recipePropertiesForm.component'
import Navigation from '../components/navigation.component'
import { useContext, useState, Fragment } from 'react'
import { StoreContext } from '../context/store-context'
import { getRandomRecipes } from '../utils/edamam'
import { ACTION_TYPES } from '../context/store-context'

const Recipes = () => {  
    const {dispatch, state} = useContext(StoreContext);
    const {randomRecipes} = state;

    const [gettingRecipes, setGettingRecipes] = useState(false)

    async function fetchRandomRecipes() {
        setGettingRecipes(true);
        try {
            const fetchedRecipes = await getRandomRecipes(4)
            dispatch({
                type: ACTION_TYPES.SET_RANDOM_RECIPES,
                payload: fetchedRecipes
            })
        } catch (err) {
            alert('Problem connecting to API')
        }
        setGettingRecipes(false);
    }

    return (
      <div className={styles.container}>

        <Head>
          <title>Recipe Picker</title>
          <meta name="description" content="Let us pick a recipe for you!" />
        </Head>
  
        <Navigation site="recipes"/>
        <div className={styles.main}>
            <Banner buttonAction={fetchRandomRecipes} 
                    buttonLoading={gettingRecipes}
                    type="recipe"
                    subHeading="Don&apos;t know what to cook?"/>

            {(randomRecipes.length > 0) &&
                <Fragment>
                    <h2 className={styles.heading2}>Random recipes:</h2>
                    <div className={styles.cardsContainer}>
                    {randomRecipes.map((recipe, index) => {
                        return <PreviewCard smaller={false} key={index} type="recipe" name={recipe.label} category={recipe.cuisineType[0]} imgUrl={recipe.image} href={recipe.url}/>
                    })}
                    </div>
                </Fragment>
            }
            <h2 className={styles.heading2}>Or let us find an ideal recipe for you:</h2>
            <RecipePropertiesForm/>
        </div>
      </div>
    )
}

export default Recipes;