import { Pet } from "./pet.model.js";

export class Dog extends Pet {
	constructor(color, price, name, breed, isFluffy) {
		super(color, price);

		this.animal = 'dog';
		this.name = name;
		this.breed = breed;
		this.isFluffy = isFluffy;
	}
}