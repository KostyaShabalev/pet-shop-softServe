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
        this.storeAnimals(animals);
				this.fillTopCategories();
        this.renderCategories(this.petShopModel.categories);
			});
	}

	storeAnimals(animals) {
    this.petShopModel.sortRecievedAnimals(animals);
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

	onClick(event) {
		console.log(event.target);
	}

}