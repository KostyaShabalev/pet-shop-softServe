import { Pet } from "./pet.model.js";

export class Cat extends Pet {
	constructor(color, price, name, isFluffy) {
		super(color, price);

		this.name = name;
		this.isFluffy = isFluffy;
	}
}