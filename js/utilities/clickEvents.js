import { storageKey, storageGetItem, storageSetItem } from "./storage.js";
import message from "../components/message.js";
import { getToken } from "./storage.js";
import { baseUrl } from "../settings/api.js";

export function addToFav() {
  this.children[0].classList.toggle("fa-solid");
  this.children[0].classList.toggle("fa-regular");

  const id = this.dataset.id;
  const title = this.dataset.title;
  const author = this.dataset.author;
  const summary = this.dataset.summary;

  const currentStorage = storageGetItem(storageKey);

  const articleIsAdded = currentStorage.find(function (fav) {
    return fav.id === id;
  });

  if (articleIsAdded === undefined) {
    const article = { id: id, title: title, author: author, summary: summary };
    currentStorage.push(article);
    storageSetItem({ key: storageKey, value: currentStorage });
  } else {
    const newStorage = currentStorage.filter((article) => article.id !== id);
    storageSetItem({ key: storageKey, value: newStorage });
  }
}

export function deleteArticle(id) {
  const button = document.querySelector(".delete-btn");

  button.addEventListener("click", handleDelete);

  async function handleDelete() {
    const deleteConfirmation = confirm(
      "Are you sure you want to delete this article?"
    );

    if (deleteConfirmation) {
      const url = `${baseUrl}articles/${id}`;
      const token = getToken();
      const options = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await fetch(url, options);
        const json = await response.json();
        location.href = "/";
        console.log(json);
      } catch (error) {
        console.log(error);
        message("danger", error, ".message-container");
      }
    }
  }
}

export function removeFromFav() {
  this.parentElement.style.display = "none";

  const id = this.dataset.id;
  const currentStorage = storageGetItem(storageKey);
  const articleExists = currentStorage.find((article) => {
    return article.id === id;
  });

  if (articleExists === undefined) {
    const article = { id: id };
    currentStorage.pop(article);
    storageSetItem({ key: storageKey, value: currentStorage });
  } else {
    const newStorage = currentStorage.filter((article) => article.id !== id);
    storageSetItem({ key: storageKey, value: newStorage });
  }

  checkStorageLength();
}

export function removeAllFromFav() {
  const removeAllConfirmation = confirm(
    "Are you sure you want to remove all articles from favourites?"
  );
  if (removeAllConfirmation) {
    const articles = document.querySelectorAll(".article");
    articles.forEach((article) => {
      article.style.display = "none";
    });

    localStorage.removeItem("articles");

    checkStorageLength();
  }
}

function checkStorageLength() {
  if (storageGetItem(storageKey).length === 0) {
    const container = ".favs-container";
    const button = document.querySelector(".btn-clear");
    message(
      "warning",
      "You have not added any articles to favourites yet",
      container
    );
    button.style.display = "none";
  }
}

export function logoutButton() {
  const logoutButton = document.querySelector("#logout");

  if (logoutButton) {
    logoutButton.onclick = function () {
      const logoutConfirmation = confirm("Logout?");

      if (logoutConfirmation) {
        ["token", "user"].forEach(function (key) {
          localStorage.removeItem(key);
        });
        location.href = "/";
      }
    };
  }
}
