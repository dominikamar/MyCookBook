const addBtn = document.querySelector(".create-recipe__btn");
const savedRecipesBox = document.querySelector(".recipes__saved-recipes");
const titleInput = document.querySelector("input.recipe-title");
const ingredientsInput = document.querySelector("textarea.recipe-ingredients");
const instructionsInput = document.querySelector(
	"textarea.recipe-instructions"
);

const photoInput = document.querySelector("input.recipe-img");
const recipeModal = document.querySelector(".recipes__recipe-modal");
const errorModalText = document.querySelector(".create-recipe__error-text");
const errorRecipesText = document.querySelector(".error-recipes");

const searchInput = document.querySelector(".search-bar-input");
const closeModalBtn = document.querySelector(".close-recipe-btn");
const rating = document.querySelector("#recipe-rating");
let selectedValue;
let test;

const checkForm = () => {
	if (
		titleInput.value === "" ||
		ingredientsInput.value === "" ||
		instructionsInput.value === "" ||
		rating.options[rating.selectedIndex].text ===
			"-- Please choose the option --"
	) {
		errorModalText.style.visibility = "visible";
	} else {
		addRecipe();
		errorModalText.style.visibility = "hidden";
	}
};

const addRecipe = () => {
	const newRecipeBox = document.createElement("div");
	newRecipeBox.classList.add("recipes__recipe-box");
	newRecipeBox.innerHTML = `<div class="recipes__recipe-img">
    <img src="${photoInput.value}" alt="Photo of the prepared meal">
</div>
<h3 class="recipes__recipe-title">${titleInput.value}</h3>
<div class="recipes__recipe-rating">
	${test}
</div>
<div class="recipes__icons">
          <button class="delete">
            <i class="fa-solid fa-trash"></i>
        </button>
    <button class="recipes__show-recipe-btn">
        <i class="fa-solid fa-circle-info"></i>
    </button>
</div>
<dialog class="recipes__recipe-modal">
    <h3>Ingredients:</h3>
    <p>${ingredientsInput.value}</p>
    <h3>Instructions:</h3>
    <p>${instructionsInput.value}</p>
    <button class="close-recipe-btn">Close</button>
    </dialog>`;

	savedRecipesBox.append(newRecipeBox);
	titleInput.value = "";
	photoInput.value = "";
	ingredientsInput.value = "";
	instructionsInput.value = "";
	rating.selectedIndex = 0;
};

const selectValue = () => {
	selectedValue = rating.options[rating.selectedIndex].text;
	if (selectedValue === "Delicious") {
		test = `<i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>`;
	} else if (selectedValue === "Very good") {
		test = `<i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-regular fa-star"></i>`;
	} else if (selectedValue === "Quite tasty") {
		test = `<i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i>`;
	} else if (selectedValue === "Not my favourite") {
		test = `<i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i>`;
	} else if (selectedValue === "Needs some work") {
		test = `<i class="fa-solid fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i>`;
	}
};

const checkClick = (e) => {
	if (e.target.matches(".recipes__show-recipe-btn")) {
		showRecipeModal(e);
	} else if (e.target.matches(".delete")) {
		deleteRecipe(e);
	} else if (e.target.matches(".close-recipe-btn")) {
		const modalToClose = e.target.closest(".recipes__recipe-modal");
		modalToClose.close();
	}
};

const showRecipeModal = (e) => {
	const clickedModal = e.target.closest("div").nextElementSibling;
	clickedModal.showModal();
};

const deleteRecipe = (e) => {
	e.target.closest("div.recipes__recipe-box").remove();
	const allRecipes = document.querySelectorAll(".recipes__recipe-box");
	if (allRecipes.length === 0) {
		errorRecipesText.style.visibility = "visible";
	}
};

const search = () => {
	const searchText = searchInput.value.toLowerCase();
	const allTitles = document.querySelectorAll(".recipes__recipe-title");
	allTitles.forEach((el) => {
		if (el.textContent.toLowerCase().indexOf(searchText) !== -1) {
			el.closest("div.recipes__recipe-box").style.display = "block";
		} else {
			el.closest("div.recipes__recipe-box").style.display = "none";
		}
	});
};
searchInput.addEventListener("keyup", search);
addBtn.addEventListener("click", checkForm);
savedRecipesBox.addEventListener("click", checkClick);
