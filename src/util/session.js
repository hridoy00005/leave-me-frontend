export const USER_COOKIE = "test-project";

export function getAuthData() {
  const AuthData = localStorage.getItem(USER_COOKIE);

  if (typeof AuthData === "string") return JSON.parse(AuthData);
  else return {};
}

export function setAuthData(auth) {
  const strState = JSON.stringify(auth);
  localStorage.setItem(USER_COOKIE, strState);
}
