import { storageKey, storageGetItem, storageSetItem } from "./storage.js";

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
  confirm("Are you sure you want to remove all favourites?");
  if (confirm) {
    const articles = document.querySelectorAll(".article");
    articles.forEach((article) => {
      article.style.display = "none";
    });

    localStorage.clear();

    checkStorageLength();
  }
}

function checkStorageLength() {
  if (storageGetItem(storageKey).length === 0) {
    const container = document.querySelector(".favs-container");
    const button = document.querySelector(".clear");
    container.innerHTML = "You have not added any articles to favourites yet";
    button.style.display = "none";
  }
}
