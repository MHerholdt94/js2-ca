export const storageKey = "articles";

export function storageSetItem(obj) {
  localStorage.setItem(obj.key, JSON.stringify(obj.value));
}

export function storageGetItem(key) {
  const favs = localStorage.getItem(key);

  if (!favs) {
    return [];
  } else {
    return JSON.parse(favs);
  }
}

const tokenKey = "token";
const userKey = "user";

export function saveToken(token) {
  localStorage.setItem(tokenKey, JSON.stringify(token));
}

export function saveUser(user) {
  localStorage.setItem(userKey, JSON.stringify(user));
}

export function getUsername() {
  const user = storageGetItem(userKey);

  if (user) {
    return user.username;
  }

  return null;
}
