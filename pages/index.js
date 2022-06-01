import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Food Picker</title>
        <meta name="description" content="Let us pick a restaurant/recipe/cocktail for you!" />
        <link rel="icon" href="/favicon.ico" />
        <script src="https://cdn.lordicon.com/xdjxvujz.js"></script>
      </Head>
      <div className={styles.main}>
        <div className={styles.header}>
          <div className={styles.heading}>
            <span className={styles.titleFirstPart}>Food Picker</span>
            <span className={styles.titleSecondPart}> Ultimativo</span>
          </div>
          <Image src="/static/chef.png" alt='smiling chef' height={150} width={150}/>
        </div>
        <div className={styles.innerContainer}>
          <span className={styles.subHeading}>Don&apos;t know where to eat?</span>
          <Link passHref={false} href="/restaurants">
            <div className={styles.buttonWithIcon}>
              <lord-icon
                  src="https://cdn.lordicon.com/jpdtnwas.json"
                  trigger="hover"
                  colors="primary:#000000,secondary:#fd670a"
                  style={{width:"70px", height:"70px"}}>    
              </lord-icon>
              <button className={styles.restaurantButton}>Restaurant Picker</button>
            </div>
          </Link>
          <span className={styles.subHeading}>Don&apos;t know what to cook?</span>
          <Link passHref={false} href="/recipes">
            <div className={styles.buttonWithIcon}>
              <lord-icon
                  src="https://cdn.lordicon.com/itmmouju.json"
                  trigger="hover"
                  colors="primary:#000000,secondary:#fd670a"
                  style={{width:"70px", height:"70px"}}>
              </lord-icon>
              <button className={styles.recipeButton}>
                Recipe Picker
              </button>
            </div>
          </Link>
          <span className={styles.subHeading}>Don&apos;t know what to drink?</span>
          <Link passHref={false} href="/cocktails">
            <div className={styles.buttonWithIcon}>
              <lord-icon
                  src="https://cdn.lordicon.com/kdruzgxz.json"
                  trigger="hover"
                  colors="primary:#000000,secondary:#fd670a"
                  stroke="40"
                  style={{width:"70px", height:"70px"}}>
              </lord-icon>
              <button className={styles.cocktailButton}>Cocktail Picker</button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}