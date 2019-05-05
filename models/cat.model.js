import { Pet } from "./pet.model.js";

export class Cat extends Pet {
	constructor(color, price, name, breed, isFluffy) {
		super(color, price);

		this.animal = 'cat';
		this.name = name;
		this.breed = breed;
		this.isFluffy = isFluffy;
	}
}