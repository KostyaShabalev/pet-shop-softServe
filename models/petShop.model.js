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

	getAnimals() {
		let promise = new Promise((resolve) => {

			this.fetchAnimals()
			.then(response => {
				return response.json();
			})
			.then(data => {
				// this.fillTopCategories();
				resolve(data);
			});
		});

		return promise;
	}

	fetchAnimals() {
		const url = this.requestURL;

		return fetch(url);
	}

	sortRecievedAnimals(animals) {
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

}