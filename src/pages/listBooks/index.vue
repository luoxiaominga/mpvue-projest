<template>
  <div class="md-list">
    <book-list :movies="movies" :has-more="hasMore" :type="type"></book-list>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import wx from '@/utils/wx'
import BookList from '@/components/book-list'
import { LIST_CLEAR_STATE } from '@/store/mutations-type'

export default {
  components: {
    'book-list': BookList
  },

  data () {
    return {
      type: ''
    }
  },

  computed: {
    ...mapState('listBooks', ['movies', 'hasMore', 'type'])
  },

  methods: {
    ...mapMutations('listBooks', {
      clearState: LIST_CLEAR_STATE
    }),
    ...mapActions('listBooks', [
      'getMovies'
    ]),
    async getMovieList () {
      await this.getMovies({ type: this.type })
    }
  },

  mounted () {
    const { title, type } = this.$root.$mp.query
    wx.setNavigationBarTitle({ title: title })
    this.type = type
    this.getMovieList()
  },

  async onPullDownRefresh () { // 下拉刷新
    this.clearState()
    await this.getMovieList()
    wx.stopPullDownRefresh()
  },

  onReachBottom () { // 上拉加载
    this.getMovieList()
  },

  onUnload () { // 清空状态
    this.clearState()
  }
}
</script>

<style>
</style>
