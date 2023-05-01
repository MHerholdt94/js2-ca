import { baseUrl } from "./settings/api.js";
import {
  storageKey,
  storageSetItem,
  storageGetItem,
} from "./utilities/storage.js";

const articlesUrl = `${baseUrl}articles`;

(async function () {
  const container = document.querySelector(".articles-container");

  try {
    const response = await fetch(articlesUrl);
    const json = await response.json();

    container.innerHTML = "";

    json.forEach(function (article) {
      let cssIcon = "fa-regular";

      container.innerHTML += `<div class="article">
                                    <div>
                                        <h3>${article.title}</h3>
                                        <p>by ${article.author}</p>
                                        <p>${article.summary}</p>
                                    </div>
                                        <i class="${cssIcon} fa-heart" data-id="${article.id}" data-title="${article.title}" data-author="${article.author}" data-summary="${article.summary}"></i>
                                </div>`;
    });

    const favButtons = document.querySelectorAll(".article i");

    favButtons.forEach(function (button) {
      button.addEventListener("click", handleClick);
    });
  } catch (error) {
    console.log(error);
  }
})();

function handleClick(event) {
  const items = storageGetItem(storageKey);
  const id = event.target.dataset.id;
  const title = event.target.dataset.title;
  const author = event.target.dataset.author;
  const summary = event.target.dataset.summary;
}
