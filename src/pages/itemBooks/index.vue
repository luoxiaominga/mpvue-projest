<template>
  <div class="md-item">
    <image
      v-if="movie.images"
      class="md-item__background"
      :src="movie.images.large"
      mode="aspectFill"
    ></image>
    <block v-if="movie.title">
      <view class="md-item__meta">
        <image class="md-item__poster" :src="movie.images.large" mode="aspectFit"></image>
        <text class="md-item__title">{{ movie.title }}({{ movie.pubdate }})</text>
        <text class="md-item__info">评分：{{ movie.rating.average }}</text>
        <text class="md-item__info">
          作者：<text v-for="director in movie.author" :key="director">{{ director }}</text>
        </text>
        <text class="md-item__info">
          出版社：
          <block v-for="cast in movie.publisher" :key="cast">{{ cast }}</block>
        </text>
      </view>
      <view class="md-item__summary">
        <text class="md-item__label">摘要：</text>
        <text class="md-item__content">{{ movie.summary }}</text>
      </view>
    </block>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { ITEM_CLEAR_MOVIE } from '@/store/mutations-type'
import wx from '@/utils/wx'

export default {
  data () {
    return {
      id: null
    }
  },

  computed: {
    ...mapState('itemBooks',  [
      'movie'
    ])
  },

  methods: {
    ...mapActions('itemBooks', [
      'getBook'
    ]),
    ...mapMutations('itemBooks', {
      clearMovie: ITEM_CLEAR_MOVIE
    }),
    async getBookData (id) {
      await this.getBook({ id })
      wx.setNavigationBarTitle({ title: this.movie.title })
      console.log(this.movie)
    }
  },

  mounted () {
    const id = this.$root.$mp.query.id
    if (!id) {
      return wx.navigateBack()
    }
    this.id = id
    this.getBookData(id)
  },

  onUnload () {
    this.clearMovie()
  }
}
</script>

<style lang="scss">
@include c("item") {
  @include e("background") {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    z-index: -1000;
    opacity: 0.1;
  }

  @include e("meta") {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50rpx 40rpx;
  }

  @include e("poster") {
    width: 100%;
    height: 800rpx;
    margin: 20rpx;
  }

  @include e("title") {
    font-style: 42rpx;
    color: #444;
  }

  @include e("info") {
    font-size: 24rpx;
    color: #888;
    margin-top: 20rpx;
    width: 80%;
  }

  @include e("summary") {
    width: 80%;
    margin: 30rpx auto;
  }

  @include e("label") {
    display: block;
    font-size: 30rpx;
    margin-bottom: 30rpx;
  }

  @include e("content") {
    color: #666;
    font-size: 22rpx;
    padding: 2em;
  }
}
</style>
