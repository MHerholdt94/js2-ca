import { storageKey, storageGetItem } from "./utilities/storage.js";
import { renderFavourites } from "./components/renderArticles.js";
import renderMenu from "./components/renderMenu.js";

renderMenu();

const favArticles = storageGetItem(storageKey);
const container = ".favs-container";

renderFavourites(favArticles, container);
