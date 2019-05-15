export class PetShopView {

  constructor(mainElement) {
    this.mainElement = mainElement;
		this.mainElement.innerHTML = this.getMainElementTemplate();
	}

	getMainElementTemplate() {

		return `
			<div class="categories-container top-categories" style="display: flex"></div>
			<div class="pets-container-main" style="display: flex">
				<div class="categories-container main-categories"></div>
				<div class="pets-container disabled"></div>
				<div class="pet-details disabled"></div>
				<div class="cart disabled"></div>
			</div>
			<div class="cart-button">
				<p>Go to Cart</p>
			</div>`;
	}

	getPetInfoTemplate(pet) {
		const petInfoTemplate = `
		<h4 class="pet-detailed-title">Pet Info</h4>
		<p>Name: ${pet.name || `hamster with id ${pet.id}`}</p>
		<p>Price: ${pet.price} $</p>
		<button class="button add-to-cart">Add to Cart</button>`;

		return petInfoTemplate;
	}

	renderTopCategories(categories) {
		let categoriesContainer = this.getElement('.top-categories');

		for (let category in categories) {
			const petList = this.createPetsList(categories[category], category, false);
			let categoryContainer = this.createCategoryContainer(category, false);

			categoryContainer.appendChild(petList);
			categoriesContainer.appendChild(categoryContainer);
		}
	}

	renderMainCategories(categories) {
		let categoriesContainer = this.getElement('.main-categories');

		for (let category in categories) {
			let categoryContainer = this.createCategoryContainer(category, true);

			categoriesContainer.appendChild(categoryContainer);
		}
	}

	renderCart(pets) {
		const cartTitleTemplate = `<h3>Cart</h3>`;
		let cart = this.getElement('.cart');
		let cartList = document.createElement('ul');

		cart.innerHTML = cartTitleTemplate;
		
		cartList.classList.add('pets-in-cart');

		pets.forEach(pet => {
			cartList.innerHTML += `<li>${pet.name || `hamster with id ${pet.id}`}</li>`;
		});

		cart.appendChild(cartList);
	}

	createCategoryContainer(category, isMainCategory) {
		const categoryClass = (isMainCategory) ? 'main-category' : 'top-category';
		let categoryContainer = document.createElement('div');
		categoryContainer.classList.add('category');
		categoryContainer.classList.add(categoryClass);
		categoryContainer.classList.add(category);

		const categoryName = (category === 'whiteOrFluffy') ? 'White or Fluffy' : category;

		categoryContainer.innerHTML = `<h2 class="category-title">${categoryName}</h2>`;

		return categoryContainer;
	}

	createPetsList(pets, category, isMainCategory) {
		let list = document.createElement('ul');
		list.classList.add('pets-list');

		if (!isMainCategory) {
			list.classList.add('top-' + category);
		}
		
		pets.forEach(item => {
			let listItem = document.createElement('li');

			listItem.classList.add('pet');
			listItem.id = item.id;
			listItem.innerHTML = `<h4 class="pet-title">${item.name || `hamster with id ${item.id}`} (${item.price}$)</h4>`;

			list.appendChild(listItem);
		});

		return list;
	}

	createPetDetails(pet) {
		const petInfoTemplate = this.getPetInfoTemplate(pet);
		const petClassName = `${pet.name || `hamster-${pet.id}`}`;
		let petDetailsContainer = document.createElement('div');

		petDetailsContainer.classList.add('pet-detailed');
		petDetailsContainer.classList.add(petClassName);

		petDetailsContainer.innerHTML = petInfoTemplate;

		let addToCartButton = petDetailsContainer.querySelector('.add-to-cart');

		addToCartButton.id = pet.id;

		addToCartButton.addEventListener('click', event => {
			this.controller.onAddToCartClicked(event.target);
		});

		return petDetailsContainer;
	}

	addMainCategoriesListeners() {
		let mainCategoriesContainer = this.getElement('.main-categories');
		let mainCategories = Array.from(mainCategoriesContainer.children);

		mainCategories.forEach(categoryElement => {
			categoryElement.addEventListener('mouseenter', event => {
				this.controller.onMainCategoryEnter(event.target);
			});

			categoryElement.addEventListener('mouseleave', event => {
				this.controller.onMainCategoryLeave(event.relatedTarget);
			});
		});
	}

	addPetListListeners() {
		let mainPetsList = this.getElement('.pets-container');
		let petList = Array.from(mainPetsList.children[0].children);

		mainPetsList.addEventListener('mouseleave', event => {
			this.controller.onPetListLeave(event.relatedTarget);
		});

		Array.from(petList).forEach(pet => {
			pet.addEventListener('click', event => {
				this.controller.onPetSelected(event);
			});
		});
	}

	addTopCategoriesListeners() {
		let topCategoriesContainer = this.getElement('.top-categories');
		let pets = topCategoriesContainer.querySelectorAll('.pet');

		Array.from(pets).forEach(pet => {
			pet.addEventListener('click', event => {
				this.controller.onPetSelected(event);
			});
		});
	}

	addCartButtonListeners() {
		let cartButton = this.getElement('.cart-button');

		cartButton.addEventListener('click', event => {
			this.controller.onCartButtonClicked();
		});
	}

	displaySelectedCategory(petsToDisplay) {
		const petsList = this.createPetsList(petsToDisplay);
		let petsContainer = this.getElement('.pets-container');
		const isDisabled = petsContainer.classList.contains('disabled');
		petsContainer.innerHTML = '';
		petsContainer.appendChild(petsList);

		if (isDisabled) {
			petsContainer.classList.toggle('disabled');
		}
	}

	displayCart(pets) {
		let petDetails = this.getElement('.pet-details');
		let cart = this.getElement('.cart');

		this.renderCart(pets);
		
		if ( !petDetails.classList.contains('disable') ) {
			this.hideElement(petDetails);
		}

		cart.classList.remove('disabled');
	}

	displayPetInfo(pet) {
		let petInfo = this.createPetDetails(pet);
		let petInfoContainer = this.getElement('.pet-details');
		let cart = this.getElement('.cart');

		if ( !cart.classList.contains('disable') ) {
			this.hideElement(cart);
		}

		petInfoContainer.classList.remove('disabled');
		petInfoContainer.innerHTML = '';
		
		petInfoContainer.appendChild(petInfo);
	}

	hideElement(element) {
		element.classList.add('disabled');
	}

	getElement(query) {

		return this.mainElement.querySelector(query);
	}

}