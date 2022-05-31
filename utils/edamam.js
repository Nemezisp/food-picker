const buildUrl = (searchTerm) => {
    return `https://api.edamam.com/api/recipes/v2?type=public&app_key=${process.env.NEXT_PUBLIC_EDAMAM_API_KEY}&app_id=${process.env.NEXT_PUBLIC_EDAMAM_APP_ID}&q=${searchTerm}&random=true`
}

export const buildLongUrl = (searchProperties) => {
    console.log(searchProperties)
    let url = `https://api.edamam.com/api/recipes/v2?type=public&app_key=${process.env.NEXT_PUBLIC_EDAMAM_API_KEY}&app_id=${process.env.NEXT_PUBLIC_EDAMAM_APP_ID}&random=true`
    url = url.concat(`&q=${searchProperties.mainIngredient}`)
    for (let diet of searchProperties.diet) {
        url = url.concat(`&diet=${diet}`)
    }
    for (let mealType of searchProperties.mealType) {
        url = url.concat(`&mealType=${mealType}`)
    }
    for (let cuisineType of searchProperties.cuisineType) {
        url = url.concat(`&cuisineType=${encodeURI(cuisineType)}`)
    }
    for (let dishType of searchProperties.dishType) {
        url = url.concat(`&dishType=${encodeURI(dishType)}`)
    }
    return url
} 

const fetchRecipes = async (url) => {
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

export const getRandomRecipes = async (amount) => {
    let url = buildUrl(String.fromCharCode(97+Math.floor(Math.random() * 26)));
    let data = await fetchRecipes(url);
    let randomNumbers = getRandomNumbersFromRange(0, data.hits.length, amount)
    let recipes = [];
    for (let number of randomNumbers) {
        recipes.push(data.hits[number].recipe)
    }
    return recipes;
}

export const getRecipes = async (searchProperties, amount) => {
    let url = buildLongUrl(searchProperties);
    let data = await fetchRecipes(url);
    let recipesFoundNumber = data.hits.length
    let recipes = []
    for (let i = 0; i < Math.min(recipesFoundNumber, amount); i ++) {
        recipes.push(data.hits[i].recipe)
    }
    return recipes
}