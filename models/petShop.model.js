import { Cat } from "./cat.model.js";
import { Dog } from "./dog.model.js";
import { Hamster } from "./hamster.model.js";

export class PetShopModel {

	constructor() {
		this.idCounter = 1;
		this.categories = {
			'mainCategories': {
				'cats': [],
				'dogs': [],
				'hamsters': []
			},
			'topCategories': {
				'cats': [],
				'expensive': [],
				'whiteOrFluffy': []
			}
		};
		this.cart = [];
	}

	createPet(animal, category) {
		let pet;
		switch (category) {
			case 'cats':
				pet  = new Cat(
					animal.color,
					animal.price,
					animal.name,
					animal.isFluffy);
				break;
			case 'dogs':
				pet  = new Dog(
					animal.color,
					animal.price,
					animal.name);
				break;
			case 'hamsters':
				pet  = new Hamster(
					animal.color,
					animal.price,
					animal.isFluffy);
		}

		return pet;
	}
}