export default {
    setUser(state, payload) {
        state.AccessToken = payload.AccessToken ;
        state.gmail = payload.gmail ;
        state.tokenExpiration = payload.tokenExpiration ;
    },
    timeToken(state, payload) {
        state.tokenExpiration = payload;
    },
    getTokenExpiration (state) {
        const token = localStorage.getItem('tokenExpiration');
        state.tokenExpiration = token
    }
}