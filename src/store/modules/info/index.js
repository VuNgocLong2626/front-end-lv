import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
    namespaced: true,
    state() {
        return {
            cmnd: null,
            fullName: null,
            gamil: null,
            number: null,
            path: null,
            permission: null
        };
    },
    mutations,
    actions,
    getters
};