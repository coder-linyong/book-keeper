export function getData<T> (key: string) {
  return <T>JSON.parse(localStorage.getItem(key))
}

export function cacheData<T> (key: string, data: T) {
  localStorage.setItem(key, JSON.stringify(data))
}