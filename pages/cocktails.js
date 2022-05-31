import styles from '../styles/Cocktails.module.css'
import Head from 'next/head'
import CocktailBanner from '../components/cocktailBanner.component'
import PreviewCard from '../components/previewCard.component'
import CocktailForm from '../components/cocktailForm.component'
import { useContext, useState, Fragment } from 'react'
import { StoreContext } from '../context/store-context'
import { getRandomCocktails } from '../utils/cocktaildb'
import { ACTION_TYPES } from '../context/store-context'
import Navigation from '../components/navigation.component'

const Cocktail = () => {  
    const {dispatch, state} = useContext(StoreContext);
    const {randomCocktails} = state;

    const [gettingCocktails, setGettingCocktails] = useState(false)

    async function fetchRandomCocktails() {
        setGettingCocktails(true);
        try {
            const cocktails = await getRandomCocktails(4)
            dispatch({
                type: ACTION_TYPES.SET_RANDOM_COCKTAILS,
                payload: cocktails
            })

        } catch (err) {
            alert(err.message)
        }
        setGettingCocktails(false);
    }

    return (
      <div className={styles.container}>
        <Head>
          <title>Cocktail Picker</title>
          <meta name="description" content="Let us pick a cocktail for you!" />
        </Head>
  
        <Navigation site="cocktails"/>
        <div className={styles.main}>
            <CocktailBanner buttonAction={fetchRandomCocktails} buttonLoading={gettingCocktails}/>
            
            {(randomCocktails.length > 0) &&
                <Fragment>
                    <h2 className={styles.heading2}>Random cocktails:</h2>
                    <div className={styles.cardsContainer}>
                    {randomCocktails.map((cocktail, index) => {
                        return <PreviewCard smaller={false} key={index} type="cocktail" name={cocktail.drinks[0].strDrink} category={cocktail.drinks[0].strIngredient1} imgUrl={cocktail.drinks[0].strDrinkThumb} href={`/cocktail/${cocktail.drinks[0].idDrink}`}/>
                    })}
                    </div>
                </Fragment>
            }
            
            <h2 className={styles.heading2}>Or let us find an ideal cocktail for you:</h2>
            <CocktailForm/>
        
        </div>
      </div>
    )
}

export default Cocktail;