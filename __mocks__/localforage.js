/**
 * As localforage won't be available on while the test are running
 * we will mock it to use the default by redux-persist "localStorage"
 * @see https://github.com/rt2zz/redux-persist#storage-engines
 */
export default self.localStorage;

/**
 * Added to prevent a warning where localStorage needs to be defined
 * @see https://stackoverflow.com/questions/32911630/how-do-i-deal-with-localstorage-in-jest-tests
 */
class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value;
  }

  removeItem(key) {
    delete this.store[key];
  }
}

global.localStorage = new LocalStorageMock();

const flushAllPromises = () => new Promise(resolve => setImmediate(resolve));
