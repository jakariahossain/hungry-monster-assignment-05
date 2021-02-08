const mealItems = document.getElementById("meal-list");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const modal = document.getElementById("modal");
const closeModalBtn = document.getElementById("close-modal");
const errMsg = document.getElementById('err-msg');
const dataErrMsg = document.getElementById('data-err-msg');


// Search Meal Items, If input field not empty pass the value through function
searchBtn.addEventListener("click", () => {
  const inputValue = searchInput.value;
  if(inputValue == ""){
    errMsg.style.display = "block";
    dataErrMsg.style.display = "none";
  }else{
    errMsg.style.display = "none";
    dataErrMsg.style.display = "none";
    getMealItems(inputValue);
  }
  
  searchInput.value = "";
});

// Display Meal Items By User Input and Passing data through function
const  getMealItems = async (inputValue) => {
  const fetchUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`;
  const res = await fetch(fetchUrl);
  const data = await res.json();
  displayMealItems(data);
}

// Display Meal Item Function with Validation
const displayMealItems = (items) => {
  mealItems.innerHTML = "";
  const getItem = items.meals;
  if (getItem != null) {
    getItem.forEach((item) => {
      const itemDiv = document.createElement("div");
      itemDiv.classList.add("card");
      itemDiv.innerHTML = `
          <div class="card-body">
            <img src="${item.strMealThumb}" alt="Germany" />
            <h2 class="item-name">${item.strMeal}</h2>
          </div>
    
    `;
      // console.log(item);
      itemDiv.addEventListener("click", () => {
        modal.style.display = "flex";
        displayMealIDetails(item);
      });

      mealItems.appendChild(itemDiv);
    });
  }else {
    dataErrMsg.style.display = "block";
  }
}

// Modal
const displayMealIDetails = (item) => {
  const modalBody = document.querySelector(".modal-body");
  modalBody.innerHTML = `

      <img src="${item.strMealThumb}" >
      <div class="modal-content">
        <h1>${item.strMeal}</h1>
        <h3>Ingredient</h3>
        <ul>
            <li><i class="fas fa-check-square"></i> ${item.strIngredient1}</li>
            <li><i class="fas fa-check-square"></i> ${item.strIngredient2}</li>
            <li><i class="fas fa-check-square"></i> ${item.strIngredient3}</li>
            <li><i class="fas fa-check-square"></i> ${item.strIngredient4}</li>
            <li><i class="fas fa-check-square"></i> ${item.strIngredient5}</li>
            <li><i class="fas fa-check-square"></i> ${item.strIngredient6}</li>   
              
        </ul>
      </div>
    `;
}

// Close the modal
closeModalBtn.addEventListener("click", () => {
  modal.style.display = "none";
});
