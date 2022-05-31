import Head from 'next/head';
import styles from '../styles/home.module.css';
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Food Picker</title>
        <meta name="description" content="Let us pick a restaurant/recipe/cocktail for you!" />
        <link rel="icon" href="/favicon.ico" />
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
          <Link passHref="false" href="/restaurants">
            <button className={styles.restaurantButton}>Restaurant Picker</button>
          </Link>
          <span className={styles.subHeading}>Don&apos;t know what to cook?</span>
          <Link passHref="false" href="/recipes">
            <button className={styles.recipeButton}>Recipe Picker</button>
          </Link>
          <span className={styles.subHeading}>Don&apos;t know what to drink?</span>
          <Link passHref="false" href="/cocktails">
            <button className={styles.cocktailButton}>Cocktail Picker</button>
          </Link>
        </div>
      </div>
    </div>
  )
}