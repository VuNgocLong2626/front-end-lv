import { createStore } from 'vuex';

import accountModules from './modules/account/index.js';
import infoModules from './modules/info/index.js';
import feedbackModules from './modules/feedback/index.js';


const store = createStore({
  modules: {
    account: accountModules,
    info: infoModules,
    feedback: feedbackModules
  },
  
});

export default store;