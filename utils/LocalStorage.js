
let storage = window.localStorage

class LocalStorage {

  constructor () {
  }

  setObj (key, obj) {
    let str = stringify(obj)
    storage.setItem(key, str)
  }

  getObj (key) {
    let str = storage.getItem(key)
    let obj = parse(str)
  }

}

function stringify (obj) {
  return JSON.stringify(obj)
}

function parse (str) {
  return JSON.parse(str)
}

export default LocalStorage

