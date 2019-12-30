<template>
  <div class="md-profile">
    <!-- <view class="md-profile__header">
      <text class="md-profile__title">{{ title }}</text>
    </view>-->
    <button open-type="getUserInfo" @getuserinfo="getUserInfo">登陆</button>
    <view class="md-profile__user">
      <image class="md-profile__user-avatar" :src="userInfo.avatarUrl" mode="aspectFit"></image>
      <text class="md-profile__user-nickname">{{ userInfo.nickName }}</text>
      <text :hidden="!userInfo.city">{{ userInfo.city }}, {{ userInfo.province }}</text>
      <text :hidden="!userInfo.city">Thanks~</text>
    </view>
  </div>
</template>

<script>
  import {login} from '@/utils/wechat'
  export default {
    data () {
      return {
        title: '关于',
        userInfo: {
          wechat: 'SG',
          nickName: '',
          avatarUrl: ''
        }
      }
    },

    methods: {
      getUserInfo (e) {
        this.userInfo = e.mp.detail.userInfo
      }
    },

    mounted () {
      login().then(res => {
        console.log(res)
      })
    }
  }
</script>

<style lang="scss">
  @include c("profile") {
    @include e("header") {
      display: flex;
      justify-content: center;
      border-bottom: 1 rpx solid #ccc;
    }

    @include e("title") {
      padding: 40 rpx;
      color: #999;
      font-size: 148 rpx;
      text-align: center;
    }

    @include e("user") {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    @include e("user-avatar") {
      width: 100%;
      height: 620 rpx;
      margin: 40 rpx;
    }

    @include e("user-nickname") {
      color: #aaa;
      font-size: 30 rpx;
      margin-bottom: 30 rpx;
    }
  }
</style>
