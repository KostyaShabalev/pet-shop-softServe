export class PetShopView {

	get mainElementContentTemplate() {

		return `
			<div class="categories-container top-categories" style="display: flex"></div>
			<div class="pets-container-main" style="display: flex">
				<div class="categories-container main-categories"></div>
				<div class="pets-container disabled"></div>
				<div class="pet-details disabled"></div>
				<div class="cart disabled"></div>
			</div>
		`;
	}

  constructor(mainElement) {
    this.mainElement = mainElement;
		this.elements = {};
		
		this.mainElement.innerHTML = this.mainElementContentTemplate;

		this.addBaseElementsToView();
	}

	addBaseElementsToView() {
		this.elements.mainCategoriesElement = this.getElement('.main-categories');
		this.elements.topCategoriesElement = this.getElement('.top-categories');
		this.elements.petsContainerElement = this.getElement('.pets-container');
		this.elements.petDetailsElement = this.getElement('.pet-details');
		this.elements.cartElement = this.getElement('.cart');
	}

  renderCategories(categories) {
		this.addCategoriesInnerElements(categories);
		this.addTopCategoriesItems(categories.topCategories);
		this.addMainCategoriesListeners();
		this.addTopCategoriesListeners();
  }

  addCategoriesInnerElements(categories) {
		this.createCategoriesElement(categories, 'main-categories');
		this.createCategoriesElement(categories, 'top-categories');
  }

  createCategoriesElement(categories, type) {
		const currentCategories = (type === 'main-categories') ?
			categories.mainCategories : categories.topCategories;
		let categoriesContainer = (type === 'main-categories') ?
			this.elements.mainCategoriesElement : this.elements.topCategoriesElement;

    for (let categoryName in currentCategories) {
			const categoryContainer = this.createCategoryContainer(categoryName, type);

      categoriesContainer.appendChild(categoryContainer);
		}
	}
	
	createCategoryContainer(categoryName, type) {
		const categoryTitleTemplate = `<h2 class="category-title">${categoryName}</h2>`;
		let categoryContainer = document.createElement('div');
		let unicClass = (type === 'main-categories') ? 'main-category' : 'top-category';

		categoryContainer.classList.add('category');
		categoryContainer.classList.add(categoryName);
		categoryContainer.classList.add(unicClass);
		categoryContainer.innerHTML = categoryTitleTemplate;

		return categoryContainer;
	}

	addTopCategoriesItems(topCategories) {
		let topCategoriesContainer = this.elements.topCategoriesElement;

		for (let category in topCategories) {
			const petsList = this.createPetsList(topCategories[category]);
			let categoryContainer = topCategoriesContainer.querySelector(`.${category}`);

			categoryContainer.appendChild(petsList);
		}
	}

	createPetsList(pets) {
		let list = document.createElement('ul');
		list.classList.add('pets-list');
		
		pets.forEach(item => {
			let listItem = document.createElement('li');
			listItem.classList.add('pet');
			listItem.id = item.id;
			listItem.innerHTML = `<h4 class="pet-title">${item.name || `hamster with id ${item.id}`}</h4>`;

			list.appendChild(listItem);
		});

		return list;
	}

	addMainCategoriesListeners() {
		let mainCategoriesElement = this.elements.mainCategoriesElement;
		let mainCategories = Array.from(mainCategoriesElement.children);

		mainCategories.forEach(categoryElement => {
			categoryElement.addEventListener('mouseenter', event => {
				this.controller.displayPetsList(event);
			});

			categoryElement.addEventListener('mouseleave', event => {
				this.controller.hidePetsList(event);
			});
		});
	}

	addTopCategoriesListeners() {
		let topCategoriesContainer = this.elements.topCategoriesElement;
		let pets = topCategoriesContainer.querySelectorAll('.pet');

		Array.from(pets).forEach(pet => {
			pet.addEventListener('click', event => {
				this.controller.onTopPetSelected(event);
			});
		});
	}

	displaySelectedCategory(petsToDisplay) {
		const petsList = this.createPetsList(petsToDisplay);
		let petsContainer = this.elements.petsContainerElement;
		const isDisabled = petsContainer.classList.contains('disabled');

		petsContainer.innerHTML = '';
		petsContainer.appendChild(petsList);

		if (isDisabled) {
			petsContainer.classList.toggle('disabled');
		}
	}

	displayPetInfo(pet) {
		let petInfoContainer = this.elements.petDetailsElement;
		console.log(pet);
	}

	hideElement(element) {
		element.classList.add('disabled');
	}

	getElement(query) {

		return this.mainElement.querySelector(query);
	}

}