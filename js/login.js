import { baseUrl } from "./settings/api.js";
import { saveToken, saveUser } from "./utilities/storage.js";
import renderMenu from "./components/renderMenu.js";
import message from "./components/message.js";

renderMenu();

const messageContainer = document.querySelector(".message-container");
const form = document.querySelector("form");
const username = document.querySelector("#username");
const password = document.querySelector("#password");

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  messageContainer.innerHTML = "";

  const usernameValue = username.value.trim();
  const passwordValue = password.value.trim();

  loginUser(usernameValue, passwordValue);
}

async function loginUser(username, password) {
  const url = baseUrl + "auth/local";

  const data = JSON.stringify({
    identifier: username,
    password: password,
  });

  const options = {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    console.log(json);

    if (json.user) {
      message("success", "Successfully logged in", ".message-container");

      setTimeout(function () {
        location.href = "/";
      }, 1500);
    }

    saveToken(json.jwt);
    saveUser(json.user);

    if (json.error) {
      message(
        "warning",
        "Please provide valid login details",
        ".message-container"
      );
    }
  } catch (error) {
    console.log(error);
    message("danger", error, ".message-container");
  }
}
