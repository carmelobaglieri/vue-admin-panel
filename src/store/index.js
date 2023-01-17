import { createStore } from 'vuex'
import account from './account'
import content from './content'

export const store = createStore({
   modules: {
      account,
      content
   },
});