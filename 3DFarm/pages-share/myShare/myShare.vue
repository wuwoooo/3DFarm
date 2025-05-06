<template>
  <view class="page flex-col">
    <view class="layer1 flex-col">
      <view class="wrap1 flex-col">
        <view class="group1 flex-col">
          <view class="outer1 flex-col">
              <view style="position: absolute;right: 60rpx;top: 820rpx;">
                  <image src="@/pages-share/static/share_gift.png" style="width: 144rpx;height: 121rpx;margin-left: 490rpx;"/>
              </view>
            <view class="block1 flex-row justify-between">
              <view class="section1 flex-col">
                <image class="pic1" src="@/pages-share/static/share_title.png" />
                <view class="bd1">
                  <text class="txt1">邀请码：</text>
                  <text class="info1">{{code}}</text>
                </view>
                <text class="word1">扫描注册即可领取数字藏品</text>
              </view>
              <image class="pic2" :src="'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data='+encodeURIComponent(inviteUrl)" />
            </view>
          </view>
        </view>
        <view class="group2 flex-col">
          <view class="section2 flex-row justify-between">
              <image src="@/pages-share/static/share_btn1.png" style="width: 284rpx;height: 75rpx;" @click="share()"></image>
              <image src="@/pages-share/static/share_btn2.png" style="width: 284rpx;height: 75rpx;" @click="global.gotoThePage('/pages-share/myShare_down/myShare_down?code='+code)"></image>
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
        code:'123123123',
        inviteUrl:'',
        mobile:'',
    };
  },
  methods: {
      messageToggle(type,title) {
      	this.msgType = type
      	this.msgContent = title
      	this.$refs.message.open()
      },
      share(){
          //#ifdef H5
          this.utils.copyTxt(this.inviteUrl)
          this.messageToggle("success","已成功复制邀请链接！可通过短信或者微信分发给好友")
          return
          //#endif
          
          //#ifdef APP
          uni.share({
          	provider: "weixin",
          	scene: "WXSceneSession",
          	type: 0,
          	href: this.inviteUrl,
          	title: "3D元宇宙",
          	summary: "一起开启数字庄园吧！",
          	imageUrl: "https://t-www.aisky.io/bkzy/static/ad/bg.png",
          	success: function (res) {
          		console.log("success:" + JSON.stringify(res));
          	},
          	fail: function (err) {
          		console.log("fail:" + JSON.stringify(err));
          	}
          });
          //#endif
          
          /*if(this.wx.isWechat()){
            this.wx.share({
                title:'一起开启数字庄园！',
                desc: "选择波氪庄园，\r\n选择一种新的潮流选择你的数字未来。",
                img: "https://t-www.aisky.io/bkzy/static/ad/bg.png" 
            },'https://bkzy.tokenai.net/?code='+this.code);
            this.messageToggle("success","请点击右上角“发送给朋友”")
          }else{
              this.messageToggle("success","已成功复制邀请链接！可通过短信或者微信分发给好友")
          }*/
          
      },
  },
  onLoad() {
      this.code = this.lib.User.code()
      this.mobile = this.lib.User.phone()
            
      if(!this.code){
          uni.showLoading({
          	title: '获取中'
          });
          this.global.getUserInfo().then(data=>{
               uni.hideLoading()
               this.code = data.code
               uni.setStorageSync('code', this.code)
               
               this.inviteUrl = this.global.metaverseSitePath+'pages/reg/reg?code='+this.code
           }).catch(err=>{
               uni.hideLoading();
               this.messageToggle('error','获取邀请码失败：'+err);
           })
      }else{
          this.inviteUrl = this.global.metaverseSitePath+'pages/reg/reg?code='+this.code
      }
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
