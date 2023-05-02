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
