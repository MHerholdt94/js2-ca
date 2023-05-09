import {
  storageKey,
  storageGetItem,
  getUsername,
} from "../utilities/storage.js";
import {
  addToFav,
  removeFromFav,
  removeAllFromFav,
} from "../utilities/clickEvents.js";
import message from "./message.js";

export function renderArticles(article, target) {
  const element = document.querySelector(target);
  const storage = storageGetItem(storageKey);
  const usernameExists = getUsername();

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
                            <a href="edit.html?id=${article.id}" class="edit-button">
                              <i class="fa-regular fa-pen-to-square"></i>
                            </a>
                            <div class="fav-button" data-id="${article.id}" data-title="${article.title}" data-author="${article.author}" data-summary="${article.summary}">
                              <i class="${icon} fa-heart"></i>
                            </div>
                          </div>`;
  });

  const editArticleButtons = document.querySelectorAll(".edit-button");

  editArticleButtons.forEach((btn) => {
    if (!usernameExists) {
      btn.style.display = "none";
    }
  });

  const addToFavButtons = document.querySelectorAll(".fav-button");

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
                                <div class="fav-button" data-id="${fav.id}" data-title="${article.title}" data-author="${article.author}" data-summary="${article.summary}">
                                    <i class="fa-solid fa-circle-xmark"></i>
                                </div>
                            </div>`;
  });

  const removeFromFavButtons = document.querySelectorAll(".fav-button");

  removeFromFavButtons.forEach((btn) => {
    btn.addEventListener("click", removeFromFav);
  });

  const removeAllButton = document.querySelector(".btn-clear");

  removeAllButton.addEventListener("click", removeAllFromFav);

  if (favourites.length === 0) {
    message(
      "warning",
      "You have not added any articles to favourites yet",
      target
    );
    removeAllButton.style.display = "none";
  }
}
