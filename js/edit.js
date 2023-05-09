import renderMenu from "./components/renderMenu.js";
import message from "./components/message.js";
import { baseUrl } from "./settings/api.js";
import { getToken, getUsername } from "./utilities/storage.js";

renderMenu();

const usernameExists = getUsername();

if (!usernameExists) {
  location.href = "/login.html";
}

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

if (!id) {
  location.href = "/";
}

const articleUrl = `${baseUrl}articles/${id}`;

const form = document.querySelector("form");
const title = document.querySelector("#editTitle");
const author = document.querySelector("#editAuthor");
const summary = document.querySelector("#editSummary");
const idInput = document.querySelector("#editId");
const messageContainer = document.querySelector(".message-container");

(async function () {
  try {
    const response = await fetch(articleUrl);
    const json = await response.json();
    const details = json.data;

    console.log(details);
  } catch (error) {
    console.log(error);
    message("danger", error, ".message-container");
  } finally {
    form.style.display = "block";
  }
})();

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  messageContainer.innerHTML = "";

  const titleValue = title.value.trim();
  const authorValue = author.value.trim();
  const summaryValue = summary.value.trim();
  const idValue = idInput.value;

  if (
    titleValue.length === 0 ||
    authorValue.length === 0 ||
    summaryValue.length === 0
  ) {
    return message(
      "warning",
      "Please add all neccessary values",
      ".message-container"
    );
  }

  editArticle(titleValue, authorValue, summaryValue, idValue);
}

async function editArticle(title, author, summary, id) {
  const url = `${baseUrl}articles/${id}`;

  const data = JSON.stringify({
    data: {
      title: title,
      author: author,
      summary: summary,
    },
  });

  const token = getToken();

  const options = {
    method: "PUT",
    body: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if (json.updated_at) {
      message("success", "Article successfully updated", ".message-container");
    }

    if (json.error) {
      message("danger", json.error, ".message-container");
    }
  } catch (error) {
    console.log(error);
    message("danger", error, ".message-container");
  }
}
