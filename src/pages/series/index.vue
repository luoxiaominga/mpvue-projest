<template>
  <div class="md-board">
    <view class="md-board__slide">
      <swiper
        class="md-board__swiper"
        :indicator-dots="true"
        :autoplay="true"
        :interval="3000"
        :duration="1000"
      >
        <swiper-item v-for="(book, index) in books" :key="index">
          <image class="md-board__slide-image" :src="book.images.large" mode="aspectFill"></image>
        </swiper-item>
      </swiper>
    </view>
    <view class="md-board__list" :scroll-y="true">
      <block v-for="(item, index) in series" :key="item.key">
        <view class="md-board__item">
          <navigator
            :url="'../list/main?type=' + item.key + '&title=' + item.title"
            hover-class="none"
          >
            <view class="md-board__title">
              <text class="md-board__title-text">{{ item.title }}</text>
              <image
                class="md-board__title-image"
                src="../../../static/images/arrowright.png"
                mode="aspectFill"
              ></image>
            </view>
          </navigator>
          <scroll-view class="md-board__content" :scroll-x="true">
            <view class="md-board__inner" v-if="item.key !== 'us_box'">
              <navigator
                v-for="(book, i) in item.books"
                :key="book.id + index + i"
                :url="'../item/main?id=' + book.id"
              >
                <view class="md-board__movie">
                  <image class="md-board__movie-image" :src="book.images.large" mode="aspectFill"></image>
                  <text class="md-board__movie-text">{{ book.title }}</text>
                </view>
              </navigator>
            </view>
            <view class="md-board__inner" v-else>
              <navigator
                v-for="(book, i) in item.books"
                :key="book.rank + index + i"
                :url="'../item/main?id=' + book.subject.id"
              >
                <view class="md-borad__movie">
                  <image
                    class="md-board__movie-image"
                    :src="book.subject.images.large"
                    mode="aspectFill"
                  ></image>
                  <text class="md-board__movie-text">{{ book.subject.title }}</text>
                </view>
              </navigator>
            </view>
          </scroll-view>
        </view>
      </block>
    </view>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'

  export default {
    computed: {
      ...mapState('series', {
        series: state => state.series,
        books: state => state.books
      })
    },

    methods: {
      ...mapActions('series', [
        'getSeries'
      ]),
      async getSeriesData () {
        await this.getSeries()
      }
    },

    mounted () {
      this.getSeriesData()
    }
  }
</script>

<style lang="scss">
  @include c("board") {
    @include e("swiper") {
      height: 480rpx;
    }

    @include e("slide-image") {
      height: 100%;
      width: 100%;
    }

    @include e("list") {
      box-sizing: border-box;
      background-color: #f8f9fb;
    }

    @include e("item") {
      display: flex;
      flex-direction: column;
      cursor: pointer;
      font-size: 20rpx;
      margin: 40rpx 0;
      padding: 20rpx;
      background-color: #fff;
    }

    @include e("title") {
      display: flex;
      margin-bottom: 10rpx;
      width: 100%;
    }

    @include e("title-text") {
      flex: 1;
    }

    @include e("title-image") {
      height: 20rpx;
      width: 20rpx;
    }

    @include e("content") {
      height: 300rpx;
    }

    @include e("inner") {
      display: flex;
      flex-direction: row;
      height: 300rpx;
      width: 900rpx;
    }

    @include e("movie") {
      display: flex;
      flex-direction: column;
      width: 180rpx;
      margin: 10rpx;
    }

    @include e("movie-image") {
      width: 180rpx;
      height: 250rpx;
    }

    @include e("movie-text") {
      text-align: center;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
</style>
