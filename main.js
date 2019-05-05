import { PetShopController } from "./controllers/petShop.controller.js";

const petShopContainer = document.querySelector('.petshop-container');
const petShopController = new PetShopController(petShopContainer);

petShopController.initiatePetShop();