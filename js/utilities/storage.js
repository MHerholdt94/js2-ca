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
  storageSetItem({ key: tokenKey, value: token });
}

export function saveUser(user) {
  storageSetItem({ key: userKey, value: user });
}

export function getToken() {
  return storageGetItem(tokenKey);
}

export function getUsername() {
  const user = storageGetItem(userKey);

  if (user) {
    return user.username;
  }

  return null;
}
