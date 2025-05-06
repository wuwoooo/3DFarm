<template>
  <view class="page flex-col">
    <view class="wrap1 flex-col">
      <view class="Body flex-col">
        <view class="group1 flex-col">
          <view class="main1 flex-col">
            <view class="ImageText1 flex-col">
              <view class="bd2 flex-col justify-between">
                <image class="img1" src="@/pages-my/static/star1.png" />
                <view class="TextGroup1 flex-col">
                  <text class="txt1">一星果农</text>
                </view>
              </view>
            </view>
            <image class="img2" src="@/pages-my/static/myfrends1.png" />
            <view class="layer1 flex-row">
              <text class="word1" @click="gotoThePage('/pages-about/aboutStar/aboutStar')">星级规则</text>
              <uni-icons type="forward" size="18" color="#763c1a" style="margin-top: -10rpx;" @click="gotoThePage('/pages-about/aboutStar/aboutStar')"></uni-icons>
              <text class="word2" @click="gotoThePage('/pages-about/aboutGrade/aboutGrade')">等级规则</text>
              <uni-icons type="forward" size="18" color="#763c1a" style="margin-top: -10rpx;" @click="gotoThePage('/pages-about/aboutGrade/aboutGrade')"></uni-icons>
            </view>
            <view class="layer2 flex-row justify-between">
              <view class="Tag1 flex-col">
                <view class="bd3 flex-col justify-between">
                  <text class="word3">分享人数</text>
                  <text class="txt2">16</text>
                </view>
              </view>
              <view class="Tag1 flex-col">
                <view class="block1 flex-col justify-between">
                  <text class="info2">好友人数</text>
                  <text class="txt3">16</text>
                </view>
              </view>
            </view>
            <view class="layer3 flex-row justify-between">
              <view class="box1 flex-col">
                <view class="outer2 flex-col justify-between">
                  <text class="info3">活跃度好友</text>
                  <text class="info4">16</text>
                </view>
              </view>
              <view class="Tag2 flex-col">
                <view class="wrap3 flex-col justify-between">
                  <text class="word4">好友活跃度</text>
                  <text class="word5">16</text>
                </view>
              </view>
            </view>
            <view class="layer4 flex-row justify-between">
              <text class="word6">活跃好友</text>
              <text class="txt4">好友活跃度</text>
              <text class="word7">好友星级</text>
            </view>
            
            <block v-for="item in friends">
                <image class="pic2" src="@/pages-my/static/myfrends1.png" />
                <view class="layer5 flex-row">
                  <view class="SingleAvatar1 flex-col">
                    <view class="mod2 flex-col" :style="{'background':'url('+item.img+') no-repeat','background-size':'cover'}"></view>
                  </view>
                  <view class="mod3 flex-col justify-between">
                    <view class="main2 flex-row">
                      <text class="txt5">{{item.name}}</text>
                      <image class="pic3" :src="'/static/vip'+item.farmGrade+'.png'" />
                    </view>
                    <text class="txt6">注册时间：{{item.regTime}}</text>
                  </view>
                  <image class="label4" src="@/pages-my/static/myfrends2.png" />
                  <image class="label4" src="@/pages-my/static/myfrends2.png" />
                  <image class="label4" src="@/pages-my/static/myfrends2.png" />
                </view>
                <view class="layer6 flex-row justify-between">
                  <text class="word8">分享人数：{{item.shareNum}}</text>
                  <text class="txt7">活跃好友：{{item.activeFriends}}</text>
                </view>
                <view class="layer7 flex-row justify-between">
                  <text class="word9">好友活跃度：{{item.friendsActive}}</text>
                  <text class="word10">果农等级：{{item.farmGrade}}</text>
                </view>
                <text class="info5">最近种植时间：2020-12-18&nbsp;19:09:23</text>                
            </block>

        </view>
      </view>
    </view>
   </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
        shareNum:16,
        friendsNum:16,
        activeFriends:16,
        friendsActive:15,
      friends:[
         {
             name:'种菜小能手',
             img:'/static/myfrends3.png',
             vip:1,
             star:3,
             regTime:'2020-12-18 00:00:00',
             shareNum:10,
             activeFriends:5,
             friendsActive:5,
             farmGrade:5
         },
         {
             name:'种菜小能手2号',
             img:'/static/myfrends3.png',
             vip:1,
             star:3,
             regTime:'2020-12-18 00:00:00',
             shareNum:10,
             activeFriends:5,
             friendsActive:5,
             farmGrade:5
         },
         {
             name:'种菜小能手3号',
             img:'/static/myfrends3.png',
             vip:1,
             star:3,
             regTime:'2020-12-18 00:00:00',
             shareNum:10,
             activeFriends:5,
             friendsActive:5,
             farmGrade:5
         }
      ],
    };
  },
  methods: {
      gotoThePage(url){
          this.global.gotoThePage(url)
      },
  },
};
</script>
<style>
@import '@/common/common.css';
@import './index.css';

uni-page-body{
    height: 100%;
}

</style>
