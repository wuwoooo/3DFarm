<template>
  <view class="page flex-col">
    <view class="box1 flex-col">
      <view class="bd3 flex-col">
        <view class="section1 flex-col">
          <view class="block1 flex-row justify-between">
            <text class="word2">LV{{VIPGrde}}</text>
            <text class="word2">权益分：{{rightPoint}}</text>
          </view>
        </view>
        
        <view class="section2 flex-col">
          <view class="box2 flex-row justify-between">
            <view class="group3 flex-col">
              <view class="group1 flex-row">
                <view class="ImageText1 flex-col">
                  <view class="wrap1 flex-col justify-between">
                    <image class="pic5" src="@/static/vip1.png" />
                    <view class="TextGroup1 flex-col">
                      <text class="info1">LV1</text>
                    </view>
                  </view>
                </view>
              </view>
            </view>
            <view class="group4 flex-col">
              <view class="group2 flex-col justify-between">
                <text class="txt2">权益分：1</text>
                <text class="txt2">享受权益：优先购平台数字藏品</text>
                <view>
                    <text class="txt2">兑换</text><text class="txt3">1级豆树</text><text class="txt2">树苗资格</text>
                </view>
              </view>
            </view>
          </view>
          
          <view class="box3 flex-row justify-between">
            <view class="group3 flex-col">
              <view class="wrap2 flex-row">
                <view class="ImageText2 flex-col">
                  <view class="layer1 flex-col justify-between">
                    <image class="pic5" src="@/static/vip2.png" />
                    <view class="TextGroup3 flex-col">
                      <text class="word4">LV2</text>
                    </view>
                  </view>
                </view>
              </view>
            </view>
            <view class="group4 flex-col">
                <view class="group2 flex-col justify-between">
                  <text class="txt2">权益分：5</text>
                  <text class="txt2">享受权益：优先购平台数字藏品</text>
                  <view>
                      <text class="txt2">兑换</text><text class="txt3">1级、2级豆树</text><text class="txt2">树苗资格</text>
                  </view>                    
                </view>
              </view>
            </view>
            
          <view class="box4 flex-row justify-between">
            <view class="block2 flex-col">
              <view class="outer3 flex-row">
                <view class="ImageText3 flex-col">
                  <view class="wrap3 flex-col justify-between">
                    <image class="pic5" src="@/static/vip3.png" />
                    <view class="TextGroup5 flex-col">
                      <text class="txt7">LV3</text>
                    </view>
                  </view>
                </view>
              </view>
            </view>
            <view class="group4 flex-col">
                <view class="group2 flex-col justify-between">
                  <text class="txt2">权益分：20</text>
                  <text class="txt2">享受权益：优先购平台数字藏品</text>
                  <view>
                      <text class="txt2">兑换</text><text class="txt3">1级、2级、3级豆树</text><text class="txt2">树苗资格</text>
                  </view>                    
                </view>
              </view>
            </view>
          
          <view class="box5 flex-row justify-between">
            <view class="bd1 flex-col">
              <view class="box6 flex-row">
                <view class="ImageText4 flex-col">
                  <view class="main1 flex-col justify-between">
                    <image class="pic5" src="@/static/vip4.png" />
                    <view class="TextGroup7 flex-col">
                      <text class="word6">LV4</text>
                    </view>
                  </view>
                </view>
              </view>
            </view>
            <view class="group4 flex-col" style="height: 170rpx;">
                <view class="group2 flex-col justify-between">
                  <text class="txt2">权益分：50</text>
                  <text class="txt2">享受权益：优先购平台数字藏品</text>
                  <view>
                      <text class="txt2">兑换</text><text class="txt3">1级、2级、3级、4级豆树</text><text class="txt2">树苗资格</text>
                  </view>                    
                </view>
              </view>
            </view>
            
           <view class="box7 flex-row justify-between">
            <view class="wrap6 flex-col">
              <view class="mod3 flex-row">
                <view class="ImageText5 flex-col">
                  <view class="main2 flex-col justify-between">
                    <image class="pic5" src="@/static/vip5.png" />
                    <view class="TextGroup9 flex-col">
                      <text class="info2">LV5</text>
                    </view>
                  </view>
                </view>
              </view>
            </view>
            <view class="group4 flex-col" style="height: 170rpx;">
                <view class="group2 flex-col justify-between" style="margin-top: 10rpx;">
                  <text class="txt2">权益分：100</text>
                  <text class="txt2">享受权益：优先购平台数字藏品</text>
                  <view>
                      <text class="txt2">兑换</text><text class="txt3">1级、2级、3级、4级、5级豆树</text><text class="txt2">树苗资格</text>
                  </view>                    
                </view>
              </view>
            </view>
            
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
        VIPGrde:1,
        rightPoint:0,
    };
  },
  methods: {},
  onLoad(option) {
      //if(option.p) this.grade = option.p
      this.global.getFarmerInfo().then((res)=>{
          //console.log(res)
          this.VIPGrde = res.vipLevel
          this.rightPoint = res.equityPoints
      }).catch((err)=>{
          //this.messageToggle('error','获取果农信息出错：'+err)
      })
  }
};
</script>
<style>
@import '@/common/common.css';
@import './index.css';

uni-page-body{
    height: 100%;
}
</style>
