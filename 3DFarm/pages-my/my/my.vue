<template>
  <view class="page flex-col">
    <view class="outer1 flex-col">
      <view class="Body flex-col">
          
          
          <view class="main1 flex-col">
              <view class="flex-row" style="align-items: center;justify-content: center;margin-top: 30rpx;">
                <view class="face1 flex-col">
                  <view class="face2 flex-row justify-between">
                    <view class="face3 flex-col" @click="quit()">
                      <view class="face4 flex-col"></view>
                    </view>
                    <view class="face5 flex-col justify-between">
                      <text class="face6">{{name}}</text>
                      <view class="face7 flex-row justify-between">
                        <text class="face8" @click="gotoThePage('/pages-about/aboutFarmGrade/aboutFarmGrade?p='+farmGrade)">{{farmGrade}}级果农</text>
                        <image class="face9" :src="'/static/vip'+VIPGrde+'.png'"  @click="gotoThePage('/pages-about/aboutGrade/aboutGrade?p='+VIPGrde)" v-if="VIPGrde>0"/>
                      </view>
                    </view>
                  </view>
                </view>
                    
                <view class="box1 flex-row justify-between">
                    <view class="mod4 flex-col" @click="disableItem()">
                      <text class="word1">充值/兑换</text>
                      <image class="img1" src="@/pages-my/static/my1.png" />
                    </view>
                </view>                  
              </view>
            
            <view style="align-items: center;justify-content: center;display: flex;margin-top: 40rpx;">
                <view class="wrap2 flex-col">
                  <view class="mod5 flex-row justify-between">
                    <image class="pic2" src="@/pages-my/static/my2.png" />
                    <view class="bd1 flex-col justify-between" @click="gotoThePage('/pages-my/cashHis/cashHis')">
                      <text class="word2">积分</text>
                      <text class="info1">{{mCash}}</text>
                    </view>
                  </view>
                </view>
                <view class="wrap2 flex-col">
                  <view class="mod5 flex-row justify-between">
                    <image class="img2" src="@/static/dou.png" />
                    <view class="layer2 flex-col justify-between" @click="gotoThePage('/pages-my/pointHis/pointHis')">
                      <text class="txt2">豆</text>
                      <text class="word3">{{mPoint}}</text>
                    </view>
                  </view>
                </view>
            </view>
            <view style="align-items: center;justify-content: center;display: flex;margin-top: 20rpx;">
                <view class="wrap2 flex-col">
                  <view class="mod5 flex-row justify-between" style="margin-top: 25rpx;">
                    <image class="pic3" src="@/pages-my/static/my3.png" />
                    <view class="TextGroup1 flex-col">
                      <view class="group1 flex-col justify-between" @click="gotoThePage('/pages-my/treeActiveHis/treeActiveHis')">
                        <text class="word4">树苗活跃</text>
                        <text class="info2">{{treeActive}}</text>
                      </view>
                    </view>
                  </view>
                </view>
                <view class="wrap2 flex-col">
                  <view class="mod5 flex-row justify-between">
                    <image class="img3" src="@/pages-my/static/my4.png" />
                    <view class="TextGroup2 flex-col">
                      <view class="section2 flex-col justify-between" @click="gotoThePage('/pages-my/treeActiveHis/treeActiveHis')">
                        <text class="txt3">分享活跃</text>
                        <text class="info3">{{shareActive}}</text>
                      </view>
                    </view>
                  </view>
                </view>
            </view>
            <view style="align-items: center;justify-content: center;display: flex;margin-top: 20rpx;">
                <view class="wrap2 flex-col">
                  <view class="mod5 flex-row justify-between">
                    <image class="img6" src="@/pages-my/static/my15.png" />
                    <view class="TextGroup3 flex-col">
                      <view class="box7 flex-col justify-between" @click="gotoThePage('/pages-my/contributionHis/contributionHis')">
                        <text class="info4">贡献值</text>
                        <text class="word5">{{contribution}}</text>
                      </view>
                    </view>
                  </view>
                </view>
                <view class="wrap2 flex-col">
                  <view class="mod5 flex-row justify-between" style="margin-top: 20rpx;">
                    <image class="img4" src="@/pages-my/static/my6.png" />
                    <view class="TextGroup4 flex-col">
                      <view class="section3 flex-col justify-between" @click="gotoThePage('/pages-my/honorHis/honorHis')">
                        <text class="word6">荣誉值</text>
                        <text class="word7">{{honorPoint}}</text>
                      </view>
                    </view>
                  </view>
                </view>
            </view>

            <view class="box14 flex-col">
                <view class="bd3 flex-row"><text class="word8">我的分享</text></view>
                <view class="box10 flex-row">
                  <image class="img5" src="@/pages-my/static/my7.png" @click="disableItem()"/>
                  <image class="pic5" src="@/pages-my/static/my8.png" @click="gotoSharePage()"/>
                </view>
            </view>

            <view class="box14 flex-col">
              <view class="bd3 flex-row"><text class="word8">更多</text></view>
              <view class="box10 flex-row">
                <image class="img5" src="@/pages-my/static/my9.png" @click="disableItem()"/>
                <image class="pic8" src="@/pages-my/static/my10.png" @click="disableItem()"/>
              </view>
            </view>
          </view>
      </view>
    </view>
    
    <uni-popup ref="popup" :mask-click="false">
        <view style="width: 690rpx;height: 954rpx;background: url(https://t-www.aisky.io/bkzy/static/task2.png) no-repeat; background-size: 100% 100%;text-align: center;">
            <view style="position: absolute;top:-30rpx;width: 100%;text-align: center;">
                <image src="@/pages-my/static/charge1.png" style="width: 322rpx;" mode="widthFix"></image>
            </view>
            <view style="position: absolute;top:-30rpx;right: 0rpx;">
                <image src="@/static/close.png" style="width: 100rpx;height: 100rpx;" @click="closePopup()"></image>                
            </view>
            <view style="height: 80rpx;"></view>
            <view class="flex-row" style="align-items: center;justify-content: center;">
                <view class="chargetxt2" :class="isChargeMode?'charge3':'charge4'" style="margin-right: 20rpx;" @click="changeIsChargeMode(1)">充值</view>
                <view class="chargetxt2" :class="isChargeMode?'charge4':'charge3'" @click="changeIsChargeMode(0)">兑换</view>
            </view>
            <view style="height: 20rpx;"></view>
            <view class="flex-col" style="background-color: rgba(250, 241, 221, 1);border-radius: 10px;height: 620rpx;margin-left: 42rpx;width: 580rpx;" v-show="isChargeMode">
              <view class="flex-col" style="width: 538rpx;height: 601rpx;margin: 19rpx 0 0 24rpx;align-items: flex-start;">
                 <view style="margin-left: 20rpx;margin-top: 20rpx;text-align: left;">
                    <text class="chargetxt1">充值金额</text>
                    <view style="height: 20rpx;"></view>
                    <view class="flex-row justify-between" style="width: 452rpx;height: 90rpx;margin-top: 12rpx;">
                     <input type="number" placeholder="请输入金额" v-model="chargeMoney" style="background: url(https://t-www.aisky.io/bkzy/static/charge_input.png) no-repeat;background-size: 100% 100%;
                        width: 405rpx;height: 79rpx;color: rgba(186, 137, 89, 1);font-size: 30rpx;font-family: PingFang-SC-Heavy;margin-left: -10rpx;padding-left: 20rpx;"/>
                      <text class="chargetxt1" style="margin-top: 20rpx;">元</text>
                    </view>
                </view>
                <view class="charge2 flex-row justify-between" v-for="item in chargeChannel" :key="item.channelid" @click="changeChargeChannel(item.channelid)">
                    <view class="flex-col" style="width: 220rpx;margin-left: 30rpx;margin-top: 15rpx;">
                      <view class="flex-row justify-between">
                        <image :src="item.img" style="width: 51rpx;height: 48rpx;"/>
                        <text class="chargetxt1">{{item.name}}</text>
                      </view>
                    </view>
                    <image src="@/pages-my/static/charge5.png" style="width: 58rpx;height: 60rpx;margin-right: 30rpx;margin-top: 7rpx;" v-show="item.channelid===chooseChargeChannel"/>
                </view>
                
                <view style="width: 100%;display: flex;align-items: center;justify-content: center;margin-top: 80rpx;">
                    <image src="@/pages-my/static/charge8.png" style="width:284rpx;height: 75rpx;" @click="submitCharge()"></image>
                </view>
              </view>
            </view>
            
            <view class="flex-col" style="background-color: rgba(250, 241, 221, 1);border-radius: 10px;height: 650rpx;margin-left: 42rpx;width: 580rpx;" v-show="!isChargeMode">
                <view class="flex-col" style="width: 538rpx;height: 601rpx;margin: 19rpx 0 0 24rpx;align-items: flex-start;">
                    <view class="flex-row justify-between" style="width: 100%;">
                        <text class="chargetxt1">资产选择</text>
                        <text class="chargetxt1">可用数量：{{mCash2mPoint?mCash:mPoint}}</text>
                    </view>
                    <view class="flex-row justify-between">
                        <input type="number" placeholder="请输入数量" v-model="exchangeNum" style="background: url(https://t-www.aisky.io/bkzy/static/charge_input.png) no-repeat;background-size: cover;
                     width: 300rpx;height: 79rpx;color: rgba(186, 137, 89, 1);font-size: 30rpx;font-family: PingFang-SC-Heavy;margin-left: -10rpx;text-align: left;padding-left: 20rpx;"/>
                        <view style="height: 55rpx;border: 1px rgba(189, 70, 0, 0.75);background: url(https://t-www.aisky.io/bkzy/static/charge9.png) -3rpx -3rpx no-repeat;z-index: 999;
                        background-size: cover;width: 107rpx;margin: 15rpx 30rpx 0 -120rpx;" @click="getAllExchangeNum()">
                            <text class="chargetxt2" style="line-height: 50rpx;">全部</text>
                        </view>
                        <view class="flex-row" style="background-color: rgba(255, 245, 214, 1);border-radius: 10px;height: 79rpx;border: 2px solid rgba(230, 215, 194, 1);width: 218rpx;padding-left: 20rpx;">
                                <image class="pic2" :src="mCash2mPoint?'../static/my2.png':'/static/dou.png'" /> 
                                <view style="margin: 10rpx 0 0 15rpx;">
                                    <text class="chargetxt2">{{mCash2mPoint?'积分':'豆'}}</text>                                
                                </view>
                            <uni-icons type="bottom" size="22" color="#763c1a" style="margin: 10rpx 0 0 15rpx;" @click="changeExchangeMode()"></uni-icons>                            
                        </view>
                    </view>                    
                    <view class="flex-row justify-between" style="width: 95%;margin-top: 30rpx;">
                        <text class="chargetxt1">当前数量</text>
                        <view style="width: 70rpx;"></view>                        
                        <text class="chargetxt1">转换资产</text>
                        <image src="@/pages-my/static/charge10.png" style="width: 46rpx;height: 48rpx;"></image>
                    </view>
                    <view class="flex-row justify-between">
                        <input type="number" :value="!mCash2mPoint?mCash:mPoint" disabled="false" style="background: url(https://t-www.aisky.io/bkzy/static/charge_input.png) no-repeat;background-size: cover;
                     width: 300rpx;height: 79rpx;color: rgba(186, 137, 89, 1);font-size: 30rpx;font-family: PingFang-SC-Heavy;margin-left: -10rpx;text-align: left;padding-left: 20rpx;"/>
                        <view class="flex-row" style="background-color: rgba(255, 245, 214, 1);border-radius: 10px;height: 79rpx;border: 2px solid rgba(230, 215, 194, 1);width: 218rpx;padding-left: 20rpx;">
                                <image class="pic2" :src="!mCash2mPoint?'../static/my2.png':'/static/index2.png'" /> 
                                <view style="margin: 10rpx 0 0 15rpx;">
                                    <text class="chargetxt2">{{!mCash2mPoint?'积分':'豆'}}</text>                                
                                </view>
                            <uni-icons type="bottom" size="22" color="#763c1a" style="margin: 10rpx 0 0 15rpx;" @click="changeExchangeMode()"></uni-icons>                            
                        </view>
                    </view>
                    <view style="border-radius: 10px;height: 170rpx;border: 2px solid rgba(230, 215, 194, 1);width: 572rpx;margin: 14rpx 0 0 -20rpx;">
                        <view class="flex-row justify-between" style="width: 100%;padding: 0rpx 50rpx 0rpx 40rpx;">
                            <text class="chargetxt1">兑换类型：</text><text style="color: rgba(255,150,0,1);">{{mCash2mPoint?'积分->豆':'豆->积分'}}</text>
                        </view>
                        <view class="flex-row justify-between" style="width: 100%;padding: 10rpx 50rpx 10rpx 40rpx;">
                            <text class="chargetxt1">兑换数量：</text><text style="color: rgba(255,150,0,1);">{{exchangeNum}}</text>
                        </view>                        
                        <view class="flex-row justify-between" style="width: 100%;padding: 10rpx 50rpx 10rpx 40rpx;" v-show="false">
                            <text class="chargetxt1">手续费率：</text><text style="color: rgba(255,150,0,1);">{{exchangePound*100}}%</text>                            
                        </view>
                        <view class="flex-row justify-between" style="width: 100%;padding: 10rpx 50rpx 10rpx 40rpx;" v-show="false">
                            <text class="chargetxt1">手续费：</text><text style="color: rgba(255,150,0,1);">{{exchangePoundNum}}</text>
                        </view>
                        <view class="flex-row justify-between" style="width: 100%;padding: 10rpx 50rpx 10rpx 40rpx;" v-show="false">
                            <text class="chargetxt1">可得数量：</text><text style="color: rgba(255,150,0,1);">{{exchangeRevNum}}</text>
                        </view>
                        <view class="flex-row justify-between" style="width: 100%;padding: 10rpx 50rpx 10rpx 40rpx;">
                            <text class="chargetxt1">荣誉值变化：</text><text style="color: rgba(255,150,0,1);">{{mCash2mPoint?'+1':'-2'}}</text>
                        </view>
                    </view>
                    <view style="width: 100%;display: flex;align-items: center;justify-content: center;margin-top: 140rpx;">
                        <image src="@/pages-my/static/charge11.png" style="width:284rpx;height: 75rpx;" @click="openDealPwd()"></image>
                    </view>
                </view>
            </view>
            
        </view>
    </uni-popup>
    
    <uni-popup ref="popup2" :mask-click="false">
        <dealPwd @submit='submitExchange' @close='closeDealPwd'></dealPwd>
    </uni-popup>
    
    <uni-popup ref="popup3" :mask-click="false">
        <login @loginOk='checkLogin'></login>
    </uni-popup>
    
    <view>
    	<!-- 提示信息弹窗 -->
    	<uni-popup ref="message" type="message" style="text-align: center;">
    		<uni-popup-message :type="msgType" :message="msgContent" :duration="2000">
            </uni-popup-message>
    	</uni-popup>
    </view>
    
    <view>
        <uni-popup ref="chargeConfirm" type="dialog">
            <uni-popup-dialog :type="msgType" cancelText="未支付" confirmText="成功支付" title="支付确认" content="是否成功支付？" @confirm="dialogConfirm"
                @close="dialogClose"></uni-popup-dialog>
        </uni-popup>
    </view>
  </view>
</template>
<script>
import login from '@/components/login/login.vue'
import dealPwd from '@/components/dealPwd/dealPwd.vue'
    
export default {
  components: {
    login,
    dealPwd
  },
  data() {
    return {
      msgType: 'success',
      msgTitle: '',
      msgContent: '',
      mobile: '',
      name: '种植小能手',
      uid: '',
      farmGrade:0,
      VIPGrde:0,
      chargePwd:'',
      mPoint:'loading...',
      mCash:'loading...',
      treeActive:0,
      shareActive:0,
      rightPoint:0,
      honorPoint:0,
      contribution:0,
      isChargeMode:true,
      chargeMoney:'',
      chooseChargeChannel:2,
      chargeChannel:[
          {
              channelid:1,
              name:'微信支付',
              img:'/pages-my/static/charge2.png',
          },
          {
              channelid:2,
              name:'支付宝支付',
              img:'/pages-my/static/charge3.png',
          },
          {
              channelid:3,
              name:'银联支付',
              img:'/pages-my/static/charge4.png',
          }
      ],
      mCash2mPoint:true,
      exchangeNum:'',
      exchangeRate:10,
      exchangePound:0.27,
    };
  },
  methods: {
      checkLogin(res){
          console.log(res)
          if(res){
              this.$refs.popup3.close()
              this.refreshData()
              uni.$emit('index_refresh', {})
          }
      },
      messageToggle(type,title) {
      	this.msgType = type
      	this.msgContent = title
      	this.$refs.message.open()
      },
      closePopup(){
          this.$refs.popup.close()
      },
      openPopup(){
          this.chargeMoney = ''
          this.$refs.popup.open()
      },
      openDealPwd(){
          if(!this.exchangeNum){
              this.messageToggle('error','请输入数量！')
              return;
          }
          
          if(this.mCash2mPoint){
              if(this.exchangeNum>this.mCash){
                  this.messageToggle('error','超过最大可用数量，请重新输入！')
                  return;
              }
          }else{
              if(this.exchangeNum>this.mPoint){
                  this.messageToggle('error','超过最大可用数量，请重新输入！')
                  return;
              }
          }
          
          this.$refs.popup2.open()
      },
      dialogConfirm() {
        this.refreshData()
        //this.messageText = `点击确认了 ${this.msgType} 窗口`
        //this.$refs.message.open()
      },
      dialogClose() {
         //console.log('点击关闭')
      },
      changeChargeChannel(type){
          if(type!=2){
              this.messageToggle('error','当前仅开放支付宝支付！')
              return;
          }
          //this.chooseChargeChannel = type
      },
      changeIsChargeMode(enable){
          if(enable) this.isChargeMode = true
          else this.isChargeMode = false
      },
      changeExchangeMode(){
          this.mCash2mPoint = !this.mCash2mPoint
          if(this.mCash2mPoint) this.exchangeRate = 10
          else this.exchangeRate = 0.1
      },
      getAllExchangeNum(){
          if(this.mCash2mPoint) this.exchangeNum = this.mCash
          else this.exchangeNum = this.mPoint
      },
      gotoThePage(url){
          this.global.gotoThePage(url)
      },
      gotoSharePage(){          
          this.gotoThePage('/pages-share/myShare/myShare')
      },
      submitCharge(){
          if(!this.chargeMoney){
              this.messageToggle('error','请输入充值金额！')
              return;
          }
          
          let api = '/nft/payCrateOrder'
          let requestdata = {currencyId:173, uid: this.lib.User.uid(), uuid: this.lib.User.uuid(), token: this.lib.User.token(),amount:this.chargeMoney,payClient: 2,payType:1}
          let method = 'POST'
          uni.showLoading({
          	title: '拉起充值'
          });
          this.global.D3MetaVerseRequest(api,requestdata,method).then(data=>{
              uni.hideLoading()
              console.log(data)
              this.closePopup()
              
              this.$refs.chargeConfirm.open()
              //alert(data.attachment)
              //window.open(data.attachment)
              window.location.href = data.attachment
          }).catch(err=>{
              uni.hideLoading()
              this.messageToggle('error','拉起充值失败：'+err);
          })
      },
      disableItem(){
          this.messageToggle('error','此功能尚未开放！')
      },
      closeDealPwd(res){
          if(res){
              this.$refs.popup2.close()
          }
      },
      quit(){
          uni.showModal({
              title:'退出',
              content:'确定退出吗？',
              success:(res)=> {
                  if(res.confirm){
                      uni.removeStorageSync('name');
                      uni.removeStorageSync('uname');
                      uni.removeStorageSync('phone');
                      uni.removeStorageSync('uid');
                      this.refreshData()
                  }
              }
          })
      },
      submitExchange(pwd){
          this.$refs.popup2.close()
          
          let api = '/mining/diamond/recharge'
          if(!this.mCash2mPoint) api = '/mining/diamond/withdraw/v3'
          let requestdata = {diamondCurrency:174, uid: this.lib.User.uid(), uuid: this.lib.User.uuid(), token: this.lib.User.token(),amount:this.exchangeNum,
            validate:'ooo',captchaId:'2652309a070249d2942831e936e0d87d',tradePhraseCode:pwd}
          let method = 'POST'
          uni.showLoading({
          	title: '兑换中'
          });
          this.global.D3MetaVerseRequest(api,requestdata,method,true).then(data=>{
              uni.hideLoading()
              this.closePopup()
              this.messageToggle('success','兑换成功！');
          }).catch(err=>{
              uni.hideLoading()
              this.messageToggle('error','兑换失败：'+err);
          })
      },
      refreshData(){
          this.mobile = this.lib.User.phone()
          this.name = this.lib.User.uname()
          this.uid =  this.lib.User.uid()
          
          //如无信息传递则进行登陆（先等popup3初始化完成）
          if(!this.uid){
              let chkLoginPop = setInterval(()=>{
                  console.log(this.$refs.popup3)
                  if(this.$refs.popup3){
                      this.$refs.popup3.open()
                      clearInterval(chkLoginPop)
                      return
                  }
              },100)
              return
          }
          
          this.global.getFarmerInfo().then((res)=>{
              this.farmGrade = res.level
              this.VIPGrde = res.vipLevel
              this.treeActive = this.utils.retain(res.minerActivityness,2)
              this.shareActive = this.utils.retain(res.promotionActivityness,2)
              this.rightPoint = this.utils.retain(res.equityPoints,2)
              this.honorPoint = this.utils.retain(res.reputation,2)
              this.contribution = this.utils.retain(res.contribution,2)
              console.log('果农信息',res)
          }).catch((err)=>{
              this.messageToggle('error','获取果农信息出错：'+err)
          })
          
          this.global.getUserMPoint(true).then((res)=>{
              this.mPoint = this.utils.retain(Number(res.amount),2)
          }).catch((err)=>{
              this.messageToggle('error','获取豆出错：'+err)
          })
          
          this.global.getUserMPoint(false).then((res)=>{
              this.mCash = this.utils.retain(Number(res.amount),2)
          }).catch((err)=>{
              this.messageToggle('error','获取积分出错：'+err)
          })
      },
  },
  onLoad() {
      this.refreshData()
  },
  computed:{
      exchangePoundNum: function(){
          return Math.floor(this.exchangeNum*this.exchangeRate*(1-(1/(1+this.exchangePound))))
      },
      exchangeRevNum: function(){
          return Math.floor(this.exchangeNum*this.exchangeRate - this.exchangePoundNum)
      }
  },
};
</script>
<style>
@import '@/common/common.css';
@import './index.css';

</style>
