import { baseUrl } from "./settings/api.js";
import { renderArticles } from "./components/renderArticles.js";
import { filterArticles } from "./utilities/filterFunction.js";
import renderMenu from "./components/renderMenu.js";
import message from "./components/message.js";

renderMenu();

const articlesUrl = `${baseUrl}articles`;
const container = ".articles-container";

(async function getArticles() {
  try {
    const response = await fetch(articlesUrl);
    const articles = await response.json();

    renderArticles(articles, container);
    filterArticles(articles, container);
  } catch (error) {
    console.log(error);
    message("danger", error, container);
  }
})();
