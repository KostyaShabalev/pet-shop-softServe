import { Cat } from "./cat.model.js";
import { Dog } from "./dog.model.js";
import { Hamster } from "./hamster.model.js";

export class PetShopModel {
	get requestURL() {

		return './assets/pets.json';
	}

	constructor() {
		this.petStore = [];
		this.categories = {
			'mainCategories': {
				'cats': [],
				'dogs': [],
				'hamsters': []
			},
			'topCategories': {
				'cats': [],
				'expensive': [],
				'white': []
			}
		};
	}

	storePets() {
		let promise = new Promise((resolve) => {

			this.getAllPets()
			.then(response => {
				return response.json();
			})
			.then(data => {
				this.sortRecievedPets(data);
				this.fillTopCategories();
				resolve(this.categories);
			});
		});

		return promise;
	}

	getAllPets() {
		const url = this.requestURL;

		return fetch(url);
	}

	sortRecievedPets(animals) {
		let store = this.petStore;
		let mainCategories = this.categories.mainCategories;

		for (let category in animals.categories) {
			const animalsOfCurrentCategory = animals.categories[category];

			const pets = animalsOfCurrentCategory.map( animal => {
				const newPet = this.createPet(animal, category);

				return newPet;
			});

			store.push(...pets);
			mainCategories[category] = pets;
		}
	}

	createPet(animal, category) {
		let pet;
		switch (category) {
			case 'cats':
				pet  = new Cat(
					animal.color,
					animal.price,
					animal.name,
					animal.breed,
					animal.isFluffy);
				break;
			case 'dogs':
				pet  = new Dog(
					animal.color,
					animal.price,
					animal.name,
					animal.breed,
					animal.isFluffy);
				break;
			case 'hamsters':
				pet  = new Hamster(
					animal.color,
					animal.price,
					animal.name,
					animal.breed,
					animal.isFluffy);
		}

		return pet;
	}

	fillTopCategories() {
		const topCategories = this.categories.topCategories;

		for (let category in topCategories) {
			topCategories[category] = this.fillTopCategory(category);
		}
	}

	fillTopCategory(category) {
		switch (category) {
			case 'cats':

				return this.categories.mainCategories[category];
			case 'expensive':

				return this.getExpensivePets();
		}
	}

	getExpensivePets() {
		const averagePrice = this.getAveragePrice();
		const higherThanAverage = this.petStore.filter(pet => {
			
			return pet.price > averagePrice;
		});

		return higherThanAverage;
	}

	getAveragePrice() {
		const totalPrice = this.getTotalPrice();
		
		return totalPrice / this.petStore.length;
	}
	
	getTotalPrice() {
		let totalPrice = 0;

		this.petStore.forEach( item => {
			totalPrice += item.price;
		});

		return totalPrice;
	}

	// createCategory(category, isAnimalCategory) {
	// 	if (isAnimalCategory) {
	// 		this.store.animalCategories[category] = [];
	// 	} else {
	// 		this.store.categoriesToShow[category] = [];
	// 	}
	// }

	// addPetToCategory(pet, category, isAnimalCategory) {
	// 	if (isAnimalCategory) {
	// 		this.store.animalCategories[category].push(pet);
	// 	} else {
	// 		this.store.categoriesToShow[category].push(pet);
	// 	}
	// }

}