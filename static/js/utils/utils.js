class Utils {
  getRandomNumber = (max) => Math.floor(Math.random() * max);

  arrayToObject = (array) => {
    return array.reduce((acc, el) => {
      acc[el.id] = el;
      return acc;
    }, {});
  }

  getRandomKey = (obj) => Object.values(obj)[this.getRandomNumber(Object.values(obj).length)] || {};

  countObjects = (arr) => {
    let counter = 0;
    for (let item of arr) {
      if (item === 0 || item === '' || Object.keys(item).length === 0 || item.length === 0 || item === null) {
        continue;
      }
      counter++;
    }
    return counter;
  }

  removeChars = (str) => typeof str === 'string' ? str.split(' ').join('').split('\'').join('').split('.').join('').split(',').join('').split('(').join('').split(')').join('') : str;

  objectsAreEquals = (object1, object2) => {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
    if (keys1.length !== keys2.length) {
      return false;
    }
    for (const key of keys1) {
      const val1 = object1[key];
      const val2 = object2[key];
      const areObjects =
        val1 != null &&
        typeof val1 === "object" &&
        val2 != null &&
        typeof val2 === "object";
      if (
        (areObjects && !this.objectsAreEquals(val1, val2)) ||
        (!areObjects && val1 !== val2)
      ) {
        return false;
      }
    }
    return true;
  }

  replaceLast = (str, pattern, replacement) => {
    const match = typeof pattern === 'string' ? pattern : (str.match(new RegExp(pattern.source, 'g')) || []).slice(-1)[0];
    if (!match) return str;
    const last = str.lastIndexOf(match);
    return last !== -1 ? `${str.slice(0, last)}${replacement}${str.slice(last + match.length)}` : str;
  }

}

const UTILS = new Utils();