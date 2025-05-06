<template>
  <view class="page flex-col">
    <view class="wrap1 flex-col">
      <view class="Body flex-col">
        <view class="layer1 flex-col">
          <view class="layer2 flex-col">
            <view class="box1 flex-col">
              <view class="group2 flex-row">
                <view class="right1 flex-row">
                    <view class="right2 flex-col">
                      <view class="right1 flex-row justify-between">
                        <image class="right3" src="@/pages-my/static/my5.png" mode="aspectFit"/>
                        <view class="right4 flex-col">
                          <view class="right5 flex-col justify-between">
                            <text class="right6">权益分</text>
                            <text class="right7">{{total}}</text>
                          </view>
                        </view>
                      </view>
                    </view>
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
                    <text class="word6">{{item.note}}</text>
                    <text class="txt2">
                      {{item.createTime}} 权益分：{{item.postAmount}}
                    </text>
                  </view>
                  <text class="word10" v-if="item.flag==1">+{{item.changeAmount}}</text>
                  <text class="word7" v-else>-{{item.changeAmount}}</text>
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
       chooseType: 1,  // 1 全部 2 收入 3 支出
       total: 0,
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
      this.global.getFarmerInfo().then((res)=>{
          this.total = res.equityPoints
      }).catch((err)=>{
          this.messageToggle('error','获取果农信息出错：'+err)
      })
      
      let api = '/mining/profile/equitypoints/query'
      let requestdata = {lastId:-1,pageIndex:1,pageSize:100,uuid:this.lib.User.uuid(),token:this.lib.User.token(),uid:this.lib.User.uid(),diamondCurrency:174,local:'zh_CN'}
      let method = 'GET'
      uni.showLoading({
          title: '加载中'
      })
      this.global.D3MetaVerseRequest(api,requestdata,method,true).then(res=>{
          //console.log('贡献度流水',res.attachment)
          this.allData = res.attachment.list
          this.getShowData()
          uni.hideLoading()
      }).catch(err=>{
          this.messageToggle('error','获取流水失败：'+err)
          uni.hideLoading()
      })
  },
  onNavigationBarButtonTap(e) {
      this.global.gotoWebView('https://img.tokenai.net/introduction_zy/vipPoint_des.html')
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
