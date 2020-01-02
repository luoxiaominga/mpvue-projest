import Vue from 'vue'
import Vuex from 'vuex'

import item from './modules/item'
import board from './modules/board'
import list from './modules/list'
import listBooks from './modules/listBooks'
import series from './modules/series'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    item: {
      namespaced: true,
      ...item
    },
    board: {
      namespaced: true,
      ...board
    },
    list: {
      namespaced: true,
      ...list
    },
    series: {
      namespaced: true,
      ...series
    },
    listBooks: {
      namespaced: true,
      ...listBooks
    }
  }
})

export default store
