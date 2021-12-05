const inputsCheckbox = document.querySelectorAll('.container-custom-checkbox input'),  // html-collection - NodeList
      ingredients = document.querySelectorAll('.current-pizza-item'),  // html collection - pseudo-array
      drinks = document.querySelectorAll('.select-drink-item'),  // html collection - pseudo-array
      totalAmount = document.querySelector('.total-amount>.summ'),
      orderBtn = document.querySelector('.typical-btn'),
      modalWindow = document.querySelector('.modal-window'),
      submitBtn = document.querySelector('.modal-window__submit-btn');

const subject = document.querySelector('.modal-window__subject'),
      ingredientsSpan = document.querySelector('.modal-window__ingredients'),
      drinksSpan = document.querySelector('.modal-window__drinks');

      // Adding ingredients
const addIngredients = checkboxes => {
    const checkboxesArray = Array.from(checkboxes);  // to convert pseudo-array(html collection) into array
    const ingredientsArray = Array.from(ingredients);  // to convert pseudo-array(html collection) into array
    ingredientsArray.splice(0, 2);  // remove two first elements as they are set by default

    for(let checkbox of checkboxes) {
        checkbox.addEventListener('click', event => {
            // console.log(event.target);   // clicked input
            event.target.parentNode.classList.toggle('active');  // add class to <label>
            const index = checkboxesArray.indexOf(event.target); // get index of clicked input/label
            ingredientsArray[index].classList.toggle('active');
            calculateOrder();
        })
    }
}

addIngredients(inputsCheckbox);


      // Adding drinks
const addDrinks = drinkItems => {
    for(let drink of drinkItems) {
        drink.addEventListener('click', event => {
            event.target.parentNode.classList.toggle('active');   // add class to drink <div>
            calculateOrder();
        })
    }
}

addDrinks(drinks);


      // Calculate order
const calculateOrder = () => {
    const ingredients = document.querySelectorAll('.container-custom-checkbox.active'), // get all 'active' ingredients
          drinks = document.querySelectorAll('.select-drink-item.active'); //get all 'active' drinks
    
    const startPrice = 300,
          ingredientsPrice = ingredients.length * 25,  // calculate selected ingredients price
          drinksPrice = drinks.length * 95;

    totalAmount.innerHTML = `${startPrice + ingredientsPrice + drinksPrice}₽`;
}


// Modal window content

const prepareWindowModalContent = () => {
    subject.innerHTML = '';    // clear all data each time as modal window is closed
    ingredientsSpan.innerHTML = '';
    drinksSpan.innerHTML = '';

    const addedIngredients = document.querySelectorAll('.container-custom-checkbox.active'), // get all 'active' ingredients
          addedDrinks = document.querySelectorAll('.select-drink-item.active'); //get all 'active' drinks

    let ingredientsList = [];
    if(addedIngredients) {
        for(let ingredient of addedIngredients) {
            ingredientsList.push(ingredient.innerText);
        }
    }

    let drinksList = [];
    if(addedDrinks) {
        for(let drink of addedDrinks) {
            drinksList.push(drink.dataset.name);
        }
    }

    const totalIngredients = ingredientsList .join(', ') || 'no ingredients';
    const totalDrinks = drinksList .join(', ') || 'no drinks';
    const totalText = `You have ordered pizza with following ingredients: ${totalIngredients}. Drinks: ${totalDrinks}. Total amount: ${totalAmount.innerHTML}`;
    
    subject.innerHTML = totalText;

    console.log(ingredientsList);
    console.log(drinksList);
}

        // Order Modal window

orderBtn.addEventListener('click', () => {
    modalWindow.classList.remove('none')    // remove class 'none' from button
    prepareWindowModalContent();
})

window.addEventListener('click', event => {   // if we clicked on modal window (not on a content)  - close it
    if(event.target === modalWindow) {
        modalWindow.classList.add('none');
    }
});

submitBtn.addEventListener('click', () => {  // if clicked inner button in modal-window__content - close modal window
    modalWindow.classList.add('none');
});





