import renderMenu from "./components/renderMenu.js";
import message from "./components/message.js";
import { baseUrl } from "./settings/api.js";
import { getToken, getUsername } from "./utilities/storage.js";

renderMenu();

const usernameExists = getUsername();

if (!usernameExists) {
  location.href = "/login.html";
}

const form = document.querySelector("form");
const messageContainer = document.querySelector(".message-container");

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  messageContainer.innerHTML = "";

  const values = Object.fromEntries(new FormData(form));

  if (
    Object.values(values).some(
      (value) => typeof value === "string" && value.trim() === ""
    )
  ) {
    return message(
      "warning",
      "Please add all neccessary values",
      ".message-container"
    );
  }

  addArticle(values);
}

async function addArticle(values) {
  const { title, author, summary } = values;
  const url = `${baseUrl}articles`;
  const token = getToken();
  const data = {
    title,
    author,
    summary,
  };

  const formData = new FormData();
  formData.append("data", JSON.stringify(data));

  const options = {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    console.log(json);

    if (json && json.created_at) {
      message("success", "Article created", ".message-container");
      setTimeout(function () {
        messageContainer.innerHTML = "";
      }, 3000);
      form.reset();
    } else if (json && json.error) {
      message("danger", json.error, ".message-container");
    }
  } catch (error) {
    console.log(error);
    message("danger", error, ".message-container");
  }
}
