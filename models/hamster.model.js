import { Pet } from "./pet.model.js";

export class Hamster extends Pet {
	constructor(color, price, name, breed, isFluffy) {
		super(color, price);

		this.animal = 'hamster';
		this.name = name;
		this.breed = breed;
		this.isFluffy = isFluffy;
	}
}