<template>
  <view class="page flex-col">
    <view class="mod1 flex-col">
      <view class="Body flex-col">
        <view class="mod2 flex-col">
          <view class="flex-row justify-between">
              <view class="naviBtn" style="width: 170rpx;" :class="selectedType==1?'naviBtn-select':''" @click="changeType(1)">为你推荐</view>
              <view class="naviBtn" style="width: 160rpx;" :class="selectedType==2?'naviBtn-select':''" @click="changeType(2)">1-2000</view>
              <view class="naviBtn" style="width: 200rpx;" :class="selectedType==3?'naviBtn-select':''" @click="changeType(3)">2001-5000</view>
              <view class="naviBtn" style="width: 150rpx;" :class="selectedType==4?'naviBtn-select':''" @click="changeType(4)">5000+</view>
          </view>
          <view class="box2 flex-col">
            <view class="group1 flex-row" @click="gotoThePage('/pages/cashHis/cashHis')">
              <image class="img2" src="@/static/my2.png" />
              <text class="word1">积分数量</text>
              <text class="word2">{{mCash}}</text>
              <uni-icons type="forward" size="24" color="#763c1a" style="margin-top: 10rpx;"></uni-icons>
            </view>
          </view>
          
          <view class="box3 flex-col">
            <view class="group2 flex-col" v-for="item in showGoods" :key="item.index">
              <view class="outer1 flex-row">
                <image class="pic3" :src="item.img" />
                <view class="TextGroup1 flex-col">
                  <view class="TextGroup1 flex-col justify-between">
                    <text class="word3">{{item.name}}</text>
                    <text class="word4">{{item.price}}积分</text>
                  </view>
                </view>
                <image class="pic4" src="@/static/mall2.png" @click="startExchange(item)"/>
              </view>
            </view> 
          </view>
        </view>
      </view>
    </view>
    
    <uni-popup ref="popup" :mask-click="false">
        <dealPwd @submit='submitExchange' @close='closeDealPwd'></dealPwd>
    </uni-popup>
    
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
import dealPwd from '@/components/dealPwd/dealPwd.vue'
        
export default {
  components: {
    dealPwd
  },
  data() {
    return {
      msgType: 'success',
      msgTitle: '',
      msgContent: '',
      mCash:30000,
      pwd:'',
      selectedType: 1,   //1 推荐 2 1-2000范围 3 2001-5000范围 4 5000+范围
      selectedItem:{},
      goodsList:[
          {
              name:'50元～300元话费',
              price:500,
              img:'/static/mall1.png',
          },
          {
              name:'30M～300M流量',
              price:1000,
              img:'/static/mall3.png',
          },
          {
              name:'50元～300元话费',
              price:2500,
              img:'/static/mall1.png',
          },
          {
              name:'30M～300M流量',
              price:5000,
              img:'/static/mall3.png',
          },
          {
              name:'50元～300元话费',
              price:6000,
              img:'/static/mall1.png',
          },
          {
              name:'30M～300M流量',
              price:2000,
              img:'/static/mall3.png',
          }
      ],
      showGoods:[],
    };
  },
  methods: {
      messageToggle(type,title) {
      	this.msgType = type
      	this.msgContent = title
      	this.$refs.message.open()
      },
      getShowGoods(){
          this.showGoods = []
          for(let item of this.goodsList){
              if(this.selectedType==1) this.showGoods.push(item)
              else if(this.selectedType==2){
                  if(item.price>=1 && item.price<=2000) this.showGoods.push(item)
              }else if(this.selectedType==3){
                  if(item.price>=2001 && item.price<=5000) this.showGoods.push(item)
              }else if(this.selectedType==4){
                  if(item.price>5000) this.showGoods.push(item)
              }
          }
      },
      changeType(type){
          if(type==this.selectedType) return
          
          this.selectedType = type
          this.getShowGoods()
      },
      startExchange(item){
          this.selectedItem = item
          this.$refs.popup.open()
      },
      closePopup(){
          this.$refs.popup.close()
      },
      gotoThePage(url){
          this.global.gotoThePage(url)
      },
      submitExchange(pwd){
          console.log(pwd)
          
          if(this.mCash>=this.selectedItem.price){
              this.messageToggle('success','兑换【'+this.selectedItem.name+'】成功！')
              this.mCash -= this.selectedItem.price
              this.$refs.popup.close()
          }else{
              this.messageToggle('error','积分不足，无法兑换！')
          }
      },
      closeDealPwd(res){
          if(res){
              this.closePopup()
          }
      }
  },
  onLoad() {
      this.getShowGoods()
  }
};
</script>
<style>
@import '@/common/common.css';
@import './index.css';
</style>
