// Google Analytics
// Currently Unused (Different method)

const GA_SCOPE = import.meta.env.VITE_GA_SCOPE;
const GA_API_URL = import.meta.env.VITE_GA_API_URL;

gapi.load("client:auth2", function () {
  gapi.auth2.init({ client_id: import.meta.env.VITE_GA_CLIENT_ID }).then(() => document.dispatchEvent(new Event('gapi-loaded')));
});

export function signIn(scope = GA_SCOPE) {
  return gapi.auth2.getAuthInstance().signIn({ scope }).then(() => {
    setCookie('guser-loggedin', 'true', 1);
    location.reload();
  }, (e) => console.error(e));
}

export function signOut() {
  return gapi.auth2.getAuthInstance().signOut().then(() => {
    setCookie('guser-loggedin', 'true', -1);
    location.reload();
  }, (e) => console.error(e));
}

export function loadClient(apiPath = GA_API_URL) {
  return gapi.client.load(apiPath);
}

export function runReport(propertyId, query, cb = function (res) { console.log(res); }, err = function (err) { console.error(err); }) {

  return loadClient().then(() => gapi.client.analyticsdata.properties
    .runReport({
      property: "properties/" + propertyId,
      resource: query
    })
    .then(cb, err));
}

export function isSignedIn() {
  return getCookie('guser-loggedin') === 'true';
}

export function setCookie(cname = 'guser-loggedin', cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
