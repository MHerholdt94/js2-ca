import { storageKey, storageGetItem } from "./utilities/storage.js";
import { renderFavourites } from "./components/renderArticles.js";

const favArticles = storageGetItem(storageKey);
const container = ".favs-container";

renderFavourites(favArticles, container);
