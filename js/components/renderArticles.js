import { storageKey, storageGetItem } from "../utilities/storage.js";
import {
  addToFav,
  removeFromFav,
  removeAllFromFav,
} from "../utilities/clickEvents.js";

export function renderArticles(article, target) {
  const element = document.querySelector(target);
  const storage = storageGetItem(storageKey);

  element.innerHTML = "";

  article.forEach((article) => {
    let icon = "fa-regular";

    const articleIsAdded = storage.find(function (favourite) {
      return parseInt(favourite.id) === article.id;
    });

    if (articleIsAdded) {
      icon = "fa-solid";
    }

    element.innerHTML += `<div class="article">
                                <div class="article-content">
                                    <h3>${article.title}</h3>
                                    <p>by ${article.author}</p>
                                    <p>${article.summary}</p>
                                </div>
                                <div class="article-button" data-id="${article.id}" data-title="${article.title}" data-author="${article.author}" data-summary="${article.summary}">
                                    <i class="${icon} fa-heart"></i>
                                </div>
                            </div>`;
  });

  const addToFavButtons = document.querySelectorAll(".article-button");

  addToFavButtons.forEach((btn) => {
    btn.addEventListener("click", addToFav);
  });
}

export function renderFavourites(article, target) {
  const element = document.querySelector(target);
  const favourites = storageGetItem(storageKey);

  element.innerHTML = "";

  favourites.forEach((fav) => {
    element.innerHTML += `<div class="article">
                                <div class="article-content">
                                    <h3>${fav.title}</h3>
                                    <p>by ${fav.author}</p>
                                    <p>${fav.summary}</p>
                                </div>
                                <div class="article-button" data-id="${fav.id}" data-title="${article.title}" data-author="${article.author}" data-summary="${article.summary}">
                                    <i class="fa-solid fa-circle-xmark"></i>
                                </div>    
                            </div>`;
  });

  const removeFromFavButtons = document.querySelectorAll(".article-button");

  removeFromFavButtons.forEach((btn) => {
    btn.addEventListener("click", removeFromFav);
  });

  const removeAllButton = document.querySelector(".clear");

  removeAllButton.addEventListener("click", removeAllFromFav);

  if (favourites.length === 0) {
    element.innerHTML = "You have not added any articles to favourites yet";
    removeAllButton.style.display = "none";
  }
}
