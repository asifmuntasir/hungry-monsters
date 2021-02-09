// Track all div
const food_container = document.getElementById('food_container');
const searchBtn = document.getElementById('searchBtn');
const warning = document.getElementById('warning');
const foodsIngredients = document.getElementById('foodsIngredients');
const ingredients = [];



// Search Button Function
searchBtn.addEventListener('click', searchingFood);


// searchingFood about Input after click the searchBtn
function searchingFood(){
    const inputValue = document.getElementById('inputValue').value;
    food_container.innerHTML = '';
    if(inputValue === ''){
        warning.style.display = 'block';
    }else{
        getInputFood(inputValue);
        warning.style.display = 'none';
    }
}


// Details about food
const displayFoodDetails = (name) => {
    const food_api = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${name}`;
    fetch(food_api)
        .then(res => res.json())
        .then(data => {
            displayFood_Ingredients(data.meals[0]);
            // console.log(data.meals[0]);
        });
} 


// Display Single Food Ingredients
const displayFood_Ingredients = (food) => {
    for(let i=1; ; i++){
        if (food[`strIngredient${i}`]) {
            ingredients.push(`${food[`strIngredient${i}`]} >> ${food[`strMeasure${i}`]}`);
        } else {
            break;
        }
    }
    // foodsIngredients.style.padding="20px";
    // foodsIngredients.style.margin = "auto";
    // foodsIngredients.style.border = "1px";
    // foodsIngredients.style.radius = "5px";
    foodsIngredients.innerHTML = `
    <img class="img-fluid rounded mb-3" src="${food.strMealThumb}" alt="">
    <h2>${food.strMeal}</h2>
    <h5 class="pt-3 pb-2"><i class="icon-fire icons"></i> Ingredients</h5>
    <ul class="list-unstyled mb-1">
    ${ingredients.map((ingredient) => `<li>${ingredient}</li>`).join('')}
    </ul>
    `;
    // food_container.innerHTML = '';
}


// Get Input value Food Info
function getInputFood(meal_Id){
    const food_ingredientApi = `https://www.themealdb.com/api/json/v1/1/search.php?s=${meal_Id}`;
    fetch(food_ingredientApi)
        .then(res => res.json())
        .then(data => {
            displayFood_Item(data.meals);
            // console.log(displayFood_Item);
        });

    const displayFood_Item = (food_items) => {
        if(food_items != null){
            food_items.map(food => {
                const foodDiv = document.createElement('div');
                foodDiv.className = 'col-md-4';
                foodDiv.style.cursor = 'pointer';
                const foodInfo = `
                <div onclick="displayFoodDetails('${food.idMeal}')" class="border rounded text-center h-100" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <img class="img-fluid rounded-top" src="${food.strMealThumb}" alt="">
                <h4 class="h5 py-4 px-2 mb-0">${food.strMeal}</h4>
                `;
                foodDiv.innerHTML = foodInfo;
                food_container.appendChild(foodDiv);
            });
        }else{
            warning.style.display = 'block';
        }
        // searchBtn.addEventListener('click', searchingFood);
    }
}