import {getBookSeriesData} from '@/utils/api'
import {BOARD_BOOKS_LIST} from '@/store/mutations-type'

const state = {
  series: [
    {key: '2065'},
    {key: '868'},
    {key: '38'},
    {key: '120'}
  ],
  books: []
}

const mutations = {
  [BOARD_BOOKS_LIST] (state, {series}) {
    let data
    state.series = state.series.map((item, i) => {
      data = series[i]
      item.title = data.books[0].series.title
      item.books = data.books
      return item
    })
    console.log(state.series)
    state.books = state.series[0].books
  }
}

const actions = {
  async getSeries ({state, commit}) {
    const tasks = state.series.map(item => {
      return getBookSeriesData(item.key, 8)
    })
    let series = await Promise.all(tasks)
    commit(BOARD_BOOKS_LIST, {series})
  }
}

export default {
  state,
  mutations,
  actions
}
