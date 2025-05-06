<template>
  <view class="page flex-col">
    <view class="wrap1 flex-col">
      <view class="Body flex-col">
        <view class="layer1 flex-col">
          <view class="layer2 flex-col">
            <view class="box1 flex-col">
              <view class="group2 flex-row">
                <view class="mod1 flex-col justify-between">
                  <view class="wrap2 flex-row justify-between">
                    <image class="pic2" src="@/pages-my/static/pointHis1.png" />
                    <text class="word1">总计</text>
                  </view>
                  <text class="txt1">{{total}}</text>
                </view>
                <image class="pic3" src="@/pages-my/static/pointHis1.png" />
                <view class="mod2 flex-col justify-between">
                  <view class="main1 flex-row justify-between">
                    <image class="pic4" src="@/pages-my/static/my2.png" />
                    <text class="word2">可用</text>
                  </view>
                  <text class="word3">{{point}}</text>
                </view>
              </view>
            </view>
            <view class="box2 flex-row justify-between">
              <view class="flex-col" :class="chooseType==1?'block1':'block2'" @click="changeType(1)">
                <text :class="chooseType==1?'word4':'word5'">全部</text>
              </view>
              <view class="flex-col" :class="chooseType==2?'block1':'block2'" @click="changeType(2)">
                <text :class="chooseType==2?'word4':'word5'">收入</text>
              </view>
              <view class="flex-col" :class="chooseType==3?'block1':'block2'" @click="changeType(3)">
                <text :class="chooseType==3?'word4':'word5'">支出</text>
              </view>
            </view>
            
            <view v-if="!showData || showData.length==0" style="text-align: center;width: 100%;padding: 30rpx;">
                <image src="@/static/no_data.svg"></image>
            </view>
            <block v-for="(item,index) in showData" :key="index">
                <view class="box3 flex-row">
                  <image class="img1" :src="item.flag==1?'/static/pointHis3.png':'/static/pointHis5.png'" />
                  <view class="bd1 flex-col justify-between">
                    <text class="word6">{{item.createTime}}&nbsp;积分{{item.flag==1?'收入':'支出'}}</text>
                    <text class="txt2">
                      {{item.note}}&nbsp;&nbsp;余额：{{utils.retain(item.afterAmount,2)}}
                    </text>
                  </view>
                  <text class="word10" v-if="item.flag==1">+{{utils.retain(item.changeAmount,2)}}</text>
                  <text class="word7" v-else>-{{utils.retain(item.changeAmount,2)}}</text>
                </view>
                <image class="pic5" src="@/pages-my/static/pointHis4.png" />
            </block>
            
            
          </view>
        </view>
      </view>
    </view>
    
    <view>
    	<!-- 提示信息弹窗 -->
    	<uni-popup ref="message" type="message" style="text-align: center;">
    		<uni-popup-message :type="msgType" :message="msgContent" :duration="2000">
            </uni-popup-message>
    	</uni-popup>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
        msgType: 'success',
        msgTitle: '',
        msgContent: '',
       chooseType: 1,  // 1 全部 2 收入 3 支出
       total: 'loading...',
       point: 'loading...',
       allData:[],
       showData:[]
    };
  },
  methods: {
      messageToggle(type,title) {
      	this.msgType = type
      	this.msgContent = title
      	this.$refs.message.open()
      },
      changeType(type){
          if(this.chooseType==type) return
          
          this.chooseType = type
          this.getShowData()
      },
      getShowData(){
          this.showData = []
          
          for(let item of this.allData){
              if(this.chooseType==1) this.showData.push(item)
              else if(this.chooseType==2){
                  if(item.flag==1) this.showData.push(item)
              }else if(this.chooseType==3){
                  if(item.flag==2) this.showData.push(item)
              }
          }
      }
  },
  onLoad() {
      //this.showData = this.allData
      this.global.getUserMPoint(false).then((res)=>{
          this.total = this.utils.retain(Number(res.amount),2)
          this.point = this.utils.retain(Number(res.cashAmount),2)
      }).catch((err)=>{
          this.messageToggle('error','获取积分出错：'+err)
      })
      
      let api = '/mining/profile/account/water/dmd/query'
      let requestdata = {lastId:-1,size:100,uuid:this.lib.User.uuid(),token:this.lib.User.token(),uid:this.lib.User.uid(),diamondCurrency:173}
      let method = 'GET'
      uni.showLoading({
          title: '加载中'
      })
      this.global.D3MetaVerseRequest(api,requestdata,method,true).then(res=>{
          this.allData = res.attachment
          this.getShowData()
          uni.hideLoading()
      }).catch(err=>{
          this.messageToggle('error','获取流水失败：'+err)
          uni.hideLoading()
      })
  },
  onNavigationBarButtonTap(e) {
      this.global.gotoWebView('https://img.tokenai.net/introduction_zy/mcoin_des.html')
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
