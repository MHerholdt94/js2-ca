import { getUsername } from "../utilities/storage.js";
import { logoutButton } from "../utilities/clickEvents.js";

export default function renderMenu() {
  const { pathname } = document.location;

  const nav = document.querySelector("nav");

  const username = getUsername();

  let authLink = `<a href="login.html" class="${
    pathname === "/login.html" ? "active" : ""
  }">Login</a>`;

  if (username) {
    authLink = `<a href="add.html" class="${
      pathname === "/add.html" ? "active" : ""
    }">Add</a>
    <div class="profile">
        <p><i class="fa-regular fa-user"></i> ${username}</p>
        <button class="btn btn-red" id="logout">Logout <i class="fa-solid fa-arrow-right-from-bracket"></i></button>
    </div>`;
  }

  nav.innerHTML = `<a href="index.html" class="${
    pathname === "/index.html" || pathname === "/" ? "active" : ""
  }">Home</a> |
                <a href="favs.html" class="${
                  pathname === "/favs.html" ? "active" : ""
                }">Favourites</a> |
                ${authLink}`;

  logoutButton();
}
