export function logOut() {
  window.localStorage.clear();
  const cookies = document.cookie.split(";");
  cookies.forEach((cookie) => {
    document.cookie = `${cookie}; expires=Sat, 20 Jan 1980 12:00:00 UTC`;
  });
}
