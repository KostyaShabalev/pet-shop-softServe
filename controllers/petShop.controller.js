import { PetShopModel } from "../models/petShop.model.js";
import { PetShopView } from "../views/petShop.view.js";

export class PetShopController {

  get pets() {

    return this.petShopModel.petStore;
  }

	constructor(petShopElement) {
		this.petShopModel = new PetShopModel();
		this.petShopView = new PetShopView(petShopElement);

		this.petShopView.controller = this;
	}

	initiatePetShop() {
		let petsStoringPromise = this.petShopModel.getAnimals();

		petsStoringPromise
			.then(animals => {
				this.fillTopCategories();
        this.renderCategories(this.petShopModel.categories);
			});
	}
  
  fillTopCategories() {
    const topCategories = this.petShopModel.categories.topCategories;

    for (let category in topCategories) {
			topCategories[category] = this.fillTopCategory(category);
		}
  }

  fillTopCategory(category) {
    switch (category) {
			case 'cats':

				return this.petShopModel.categories.mainCategories[category];
			case 'expensive':

				return this.getExpensivePets();
			case 'white':

				return this.getExpensivePets();
		}
  }

  getExpensivePets() {
    const pets = this.pets;
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

		pets.forEach( item => {
			totalPrice += item.price;
		});

		return totalPrice;
	}

	renderCategories(categories) {
		this.petShopView.renderCategories(categories);
	}

	displayPetsList(event) {
		const currentElement = event.target;
		const mainCategories = this.petShopModel.categories.mainCategories;
		const selectedCategory = this.getSelectedCategory(mainCategories, currentElement);
		const petsToDisplay = mainCategories[selectedCategory];

		this.petShopView.displaySelectedCategory(petsToDisplay);
	}

	getSelectedCategory(mainCategories, element) {
		for (let category in mainCategories) {
			if ( element.classList.contains(category) ) {
				
				return category;
			}
		}
	}

	onTopPetSelected(event) {
		const petStore = this.petShopModel.petStore;
		const eventPath = event.path || event.composedPath();
		let path = 0;

		while (!eventPath[path].classList.contains('pet')) {
			path++;
		}

		const selectedPetElement = eventPath[path];

		const petToDisplay = petStore.find(pet => {

			return pet.id.toString() === selectedPetElement.id;
		});

		this.petShopView.displayPetInfo(petToDisplay);
	}

	hidePetsList(event) {
		const goalElement = event.relatedTarget;
		const isGoalElementOuter = !( goalElement.classList.contains('pets-container') ||
			goalElement.classList.contains('pets-list') );

		if ( isGoalElementOuter ) {
			const petsContainer = this.petShopView.elements.petsContainerElement;

			this.petShopView.hideElement(petsContainer);
		}
	}

}