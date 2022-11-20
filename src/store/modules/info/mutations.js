export default {
    setInfo(state, payload) {
        state.cmnd = payload.cmnd,
        state.fullName = payload.fullName,
        state.gamil = payload.gamil,
        state.number = payload.number,
        state.path = payload.path,
        state.permission = payload.permission    
    },
    resetInfo(state) {
        state.cmnd = null,
        state.fullName = null,
        state.gamil = null,
        state.number = null,
        state.path = null,
        state.permission = null    
    },
    setInfoBaise(state, payload) {
        state.cmnd = payload.cmnd,
        state.fullName = payload.fullName,
        state.number = payload.number
    }
};