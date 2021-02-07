const mealItems = document.getElementById("meal-list");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const modal = document.getElementById("modal");
const closeModalBtn = document.getElementById("close-modal");

// Search Meal Items From API
searchBtn.addEventListener("click", () => {
  const inputValue = searchInput.value;
  getMealItems(inputValue);
  searchInput.value = "";
});

// Display Meal Items From API

function getMealItems(inputValue) {
  const fetchItem = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`;
  fetch(fetchItem)
    .then((res) => res.json())
    .then((data) => {
      displayMealItems(data);
    })
    .catch((err) => console.log(err));
}

function displayMealItems(items) {
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
  } else {
    mealItems.innerHTML = `
      
      <h4>Sorry ! The Item you are looking for is not Available. <br> Please search another item </h4>
    `;
  }
}

// Modal
function displayMealIDetails(item) {
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
