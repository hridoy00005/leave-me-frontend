import { getAuthData, setAuthData } from "../util/session";

export const saveState = state => {
  try {
    // Parsing auth data from Redux store
    let stateFilter = state;
    setAuthData(stateFilter.auth);
  } catch (err) {
    // Ignore write error
  }
};

/* Use an IIFE to export the persisted state in a variable */
export const persistedState = (() => {
  try {
    const auth = getAuthData();
    // if (Object.keys(auth).length === 0) return undefined;
    return {
      auth
    };
  } catch (err) {
    return undefined;
  }
})();
