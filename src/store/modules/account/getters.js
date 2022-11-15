export default {
  gmail(state) {
    return state.gmail;
  },
  AccessToken(state) {
    return state.AccessToken;
  },
  isAuthenticated(state) {
    return !!state.AccessToken;
  },
  isExpiration(state) {
    return !!state.tokenExpiration;
  },
};
