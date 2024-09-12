import Keycloak from "keycloak-js";

const _kc = new Keycloak("/keycloak.json");

/**
 * Initializes Keycloak instance and calls the provided callback function if successfully authenticated.
 *
 * @param onAuthenticatedCallback
 */
const initKeycloak = (onAuthenticatedCallback: any) => {
  console.log("_KC . initKeycloak");
  _kc
    .init({
      onLoad: "check-sso",
      silentCheckSsoRedirectUri:
        window.location.origin + "/silent-check-sso.html",
      // pkceMethod: 'S256',
    })
    .then((authenticated) => {
      console.log(
        "_KC . initKeycloak . then . authenticated : " + authenticated
      );
      if (!authenticated) {
        console.log("_KC . initKeycloak . then . user is not authenticated..!");
      }
      onAuthenticatedCallback();
    })
    .catch(console.error);
};

const doLogin = _kc.login;

const doLogout = _kc.logout;

const getToken = () => _kc.token;

const getTokenParsed = () => _kc.tokenParsed;

const isLoggedIn = () => !!_kc.token;

const updateToken = (successCallback: any) =>
  _kc.updateToken(5).then(successCallback).catch(doLogin);

const getUsername = (): string => _kc.tokenParsed?.name; //preferred_username;

const getEmail = (): string => _kc.tokenParsed?.email;
const getEmailVerified = (): boolean => _kc.tokenParsed?.email_verified;
const getUserAvatarName = (): string => {
  let un: string = _kc.tokenParsed?.name;
  return `${un.split(" ")[0][0]}${un.split(" ")[1][0]}`;
}; //preferred_username;

const hasRole = (roles: any) =>
  roles.some((role: any) => _kc.hasRealmRole(role));

const roleList = () => {
  let roles: string[] | undefined = _kc.tokenParsed?.realm_access?.roles;
  if (roles) {
    return roles.filter((r) => {
      if (r === r.toUpperCase()) {
        return r;
      }
    });
  }
  return [];
};

const UserService = {
  initKeycloak,
  doLogin,
  doLogout,
  isLoggedIn,
  getToken,
  getTokenParsed,
  updateToken,
  getUsername,
  hasRole,
  getUserAvatarName,
  getEmail,
  getEmailVerified,
  roleList,
};

export default UserService;
