/**
 * As localforage won't be available on while the test are running
 * we will mock it to use the default by redux-persist "localStorage"
 * @see https://github.com/rt2zz/redux-persist#storage-engines
 */
export default window.localStorage;