import { createStore } from 'vuex';

import accountModules from './modules/account/index.js';
import infoModules from './modules/info/index.js';

const store = createStore({
  modules: {
    account: accountModules,
    info: infoModules
  },
  
});

export default store;