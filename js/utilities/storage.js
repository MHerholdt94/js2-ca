export const storageKey = "articles";

export function storageSetItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function storageGetItem(key) {
  const articles = localStorage.getItem(key);

  if (!articles) {
    return [];
  } else {
    return JSON.parse(articles);
  }
}
