const fetchCocktails = async (url) => {
    try {
        const response =  await fetch(url)
        const data = await response.json()
        return data
    } catch (err) {
        return err
    }
}

const getRandomNumbersFromRange = (min, max, amount) => {
    let numbers = [];
    while(numbers.length < amount){
        let number = Math.floor(Math.random() * (max - min + 1)) + min;
        if(numbers.indexOf(number) === -1) numbers.push(number);
    }
    return numbers
}

export const getCocktailById = async (id) => {
    let url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    let cocktail = await fetchCocktails(url)
    return cocktail
}

export const getRandomCocktails = async (amount) => {
    let url = "https://www.thecocktaildb.com/api/json/v1/1/random.php"
    let cocktails = []

    for (let i = 0; i < amount; i++) {
        let cocktail = await fetchCocktails(url);
        cocktails.push(cocktail)
    }

    return cocktails;
}

export const getCocktailsByIngredient = async (ingredient, amount) => {
    let url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`
    let allCocktails = await fetchCocktails(url);
    allCocktails = allCocktails.drinks
    let randomNumbers = getRandomNumbersFromRange(0, allCocktails.length-1, amount < allCocktails.length ? amount : allCocktails.length)
    let cocktails = [];
    for (let number of randomNumbers) {
        let cocktail = await getCocktailById(allCocktails[number].idDrink)
        cocktails.push(cocktail)
    }
    return cocktails
}
