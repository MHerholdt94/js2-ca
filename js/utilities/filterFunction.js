import { renderArticles } from "../components/renderArticles.js";

export function filterArticles(articles, target) {
  const inputAuthor = document.querySelector("#author");
  const inputTitle = document.querySelector("#title");

  function filterArticlesByProperty(property, inputValue) {
    return articles.filter((article) => {
      if (article[property].toLowerCase().includes(inputValue)) {
        return true;
      }
    });
  }

  function onKeyUp(event, otherInput) {
    otherInput.value = "";
    const inputValue = event.target.value.trim().toLowerCase();
    const filteredArticles = filterArticlesByProperty(
      event.target.id,
      inputValue
    );
    renderArticles(filteredArticles, target);
  }

  inputAuthor.onkeyup = function (event) {
    onKeyUp(event, inputTitle);
  };

  inputTitle.onkeyup = function (event) {
    onKeyUp(event, inputAuthor);
  };
}
