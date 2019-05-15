import { PetShopModel } from "../models/petShop.model.js";
import { PetShopView } from "../views/petShop.view.js";

export class PetShopController {

	constructor(petShopElement) {
		this.petShopModel = new PetShopModel();
		this.petShopView = new PetShopView(petShopElement);

		this.petShopView.controller = this;
	}

	initiatePetShop() {
		this.fetchAnimalCategories()
			.then(response => {

				return response.json();
			})
			.then(data => {
				const animalCategories = data.categories;
				const petsToStore = this.transformAnimalsIntoPets(animalCategories);

				this.storePets(petsToStore);
				this.fillTopCategories();
				this.renderMainElements();
				this.addMainListeners();
			})
			.catch(error => {
				alert(error);
			});
	}

	fetchAnimalCategories() {
		const url = 'https://kostyashabalev.github.io/pet-shop/assets/pets.json';

		return fetch(url);
	}

	transformAnimalsIntoPets(animalCategories) {
		const mainStoreCategories = Object.keys(this.petShopModel.categories.mainCategories);

		let pets = {};

		for (let category in animalCategories) {

			if ( mainStoreCategories.includes(category) ) {
				
				pets[category] = this.createPets(animalCategories[category], category);
			}
		}

		return pets;
	}

	createPets(animals, category) {
		const newPets = animals.map(animal => {
			let newPet = this.petShopModel.createPet(animal, category);
			newPet.id = this.petShopModel.idCounter++;

			return newPet;
		});

		return newPets;
	}

	storePets(petsToStore) {
		let mainStore = this.petShopModel.categories.mainCategories;

		for (let category in mainStore) {
			mainStore[category] = petsToStore[category];
		}
	}

  fillTopCategories() {
		let topCategories = this.petShopModel.categories.topCategories;

    for (let category in topCategories) {
			topCategories[category] = this.fillTopCategory(category);
		}
  }

  fillTopCategory(category) {
    switch (category) {
			case 'cats':

				return this.getFromCategory('cats');

			case 'expensive':

				return this.getExpensivePets();

			case 'whiteOrFluffy':

				return this.getWhiteOrFlyffyPets();
		}
	}

	getFromCategory(category) {
		const categories = this.petShopModel.categories.mainCategories;

		return categories[category];
	}

  getExpensivePets() {
		const pets = this.getPetsFromStore();
		const averagePrice = this.getAveragePrice(pets);

		const higherThanAverage = pets.filter(pet => {
			
			return pet.price > averagePrice;
		});

		return higherThanAverage;
	}

	getAveragePrice(pets) {
		const totalPrice = this.getTotalPrice(pets);
		
		return totalPrice / pets.length;
	}
	
	getTotalPrice(pets) {
		let totalPrice = 0;
		let pricesToCount = [];

		pets.forEach( item => {
			
			if (!pricesToCount.includes(item.price)) {
				pricesToCount.push(item.price);
				totalPrice += item.price;
			}
		});

		return totalPrice;
	}

	getWhiteOrFlyffyPets() {
		const pets = this.getPetsFromStore();
		
		const whiteOrFluffyPets = pets.filter(pet => {
			
			return ( (pet.color === 'white') || pet.isFluffy);
		});

		return whiteOrFluffyPets;
	}

	renderMainElements() {
		const categoriesToRender = this.petShopModel.categories;

		this.petShopView.renderTopCategories(categoriesToRender.topCategories);
		this.petShopView.renderMainCategories(categoriesToRender.mainCategories);
	}

	addMainListeners() {
		this.petShopView.addTopCategoriesListeners();
		this.petShopView.addMainCategoriesListeners();
		this.petShopView.addCartButtonListeners();
	}

	onMainCategoryEnter(currentElement) {
		// const currentElement = event.target;
		const mainCategories = this.petShopModel.categories.mainCategories;
		const selectedCategory = this.getSelectedCategory(mainCategories, currentElement);
		const petsToDisplay = mainCategories[selectedCategory];
		
		this.petShopView.displaySelectedCategory(petsToDisplay);
		this.petShopView.addPetListListeners();
	}

	onMainCategoryLeave(target) {
		this.hidePetsList(target);
	}

	onPetListLeave(target) {
		this.hidePetsList(target);
	}

	onCartButtonClicked() {
		const petsInCart = this.petShopModel.cart.slice();

		this.petShopView.displayCart(petsInCart);
	}

	onPetSelected(event) {
		const pets = this.getPetsFromStore();
		const eventPath = event.path || event.composedPath();
		let path = 0;
		
		while (!eventPath[path].classList.contains('pet')) {
			path++;
		}

		const selectedPetElement = eventPath[path];

		const petToDisplay = pets.find(pet => {

			return pet.id.toString() === selectedPetElement.id;
		});

		this.petShopView.displayPetInfo(petToDisplay);
	}

	onAddToCartClicked(currentElement) {
		const petId = currentElement.id;
		const pets = this.getPetsFromStore();
		let cartStore = this.petShopModel.cart;
		
		const petToCart = pets.find(pet => {
			return ( (pet.id.toString() === petId) && (!cartStore.includes(pet)) );
		});

		if (petToCart) {
			cartStore.push(petToCart);
		}
	}

	getSelectedCategory(mainCategories, element) {
		for (let category in mainCategories) {
			if ( element.classList.contains(category) ) {
				
				return category;
			}
		}
	}

	getPetsFromStore() {
		const categories = this.petShopModel.categories.mainCategories;
		let pets = [];

		for (let category in categories) {
			const petsInCategory = categories[category].slice();
			pets.push(...petsInCategory);
		}
		
		return pets;
	}

	hidePetsList(goalElement) {
		// const goalElement = event.relatedTarget;
		const isGoalElementOuter = !( goalElement.classList.contains('pets-container') ||
			goalElement.classList.contains('pets-list') );

		if ( isGoalElementOuter ) {
			const petsContainer = this.petShopView.getElement('.pets-container');

			this.petShopView.hideElement(petsContainer);
		}
	}

}