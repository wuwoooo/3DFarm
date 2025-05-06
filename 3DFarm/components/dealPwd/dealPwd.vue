<template>
    <view>
        <view class="flex-col" style="width: 694rpx;height: 737rpx;background: url(/static/seedShop6.png) no-repeat; background-size: cover;align-items: center;justify-items: center;">
            <view style="height: 50rpx;"></view>
            <view style="align-items: center;justify-items: center;justify-content: center;" class="flex-row">
                <text style=" -webkit-text-stroke: 1rpx rgba(91, 40, 10, 1);color: rgba(255, 255, 255, 1);font-size: 35rpx;font-weight: bold;
                        ">{{!isResetPwd?'交易密码':'重置密码'}}</text>
            </view>
            <view style="height: 180rpx;"></view>            
            <block v-if="!isResetPwd">
                <input type="password" placeholder="请输入密码" v-model="pwd" style="background: url(https://t-www.aisky.io/bkzy/static/login_input.png) no-repeat;background-size: cover;
                width: 416rpx;height: 108rpx;color: rgba(186, 137, 89, 1);font-size: 30rpx;font-family: PingFang-SC-Heavy;margin-left: -10rpx;padding-left: 20rpx;"/>
                <text style="margin-left: -220rpx;font-weight: bold;margin-top: 50rpx;color: #763c1a;font-size: 30rpx;" @click="changeSta()">忘记密码？</text>            
                <view style="height: 120rpx;"></view>
                <view class="flex-row justify-between">
                    <image src="@/static/mall7.png" style="width:196rpx;height: 75rpx;margin-right: 20rpx;" @click="closePopup()"></image>
                    <image src="@/static/mall8.png" style="width:196rpx;height: 75rpx;" @click="submit()"></image>
                </view>
            </block>
            <block v-else>
                <view class="flex-row">
                    <input type="number" placeholder="请输入验证码" v-model="code" style="background: url(https://t-www.aisky.io/bkzy/static/login_input.png) no-repeat;background-size: 100% 100%;
                    width: 240rpx;height: 70rpx;color: rgba(186, 137, 89, 1);font-size: 30rpx;font-family: PingFang-SC-Heavy;margin-left: 0rpx;padding-left: 20rpx;"/>
                    <button class="codebtn" @click="getVlidCode()" hover-class="none" :disabled="disable">{{getCodeBtnText}}</button>
                </view>
                <view style="height: 20rpx;"></view>
                <input type="password" placeholder="请输入新密码" v-model="newPwd" style="background: url(https://t-www.aisky.io/bkzy/static/login_input.png) no-repeat;background-size: 100% 100%;
                width: 410rpx;height: 70rpx;color: rgba(186, 137, 89, 1);font-size: 30rpx;font-family: PingFang-SC-Heavy;margin-left: 0rpx;padding-left: 20rpx;"/>
                <view style="height: 20rpx;"></view>
                <input type="password" placeholder="请再次输入新密码" v-model="newPwd2" style="background: url(https://t-www.aisky.io/bkzy/static/login_input.png) no-repeat;background-size: 100% 100%;
                width: 410rpx;height: 70rpx;color: rgba(186, 137, 89, 1);font-size: 30rpx;font-family: PingFang-SC-Heavy;margin-left: 0rpx;padding-left: 20rpx;"/>
                <view style="height: 74rpx;"></view>
                <view class="flex-row justify-between">
                    <image src="@/static/mall7.png" style="width:196rpx;height: 75rpx;margin-right: 20rpx;" @click="changeSta()"></image>
                    <image src="@/static/mall8.png" style="width:196rpx;height: 75rpx;" @click="resetPwd()"></image>
                </view>
            </block>
        </view>
    </view>
</template>

<script>
    import md5 from '@/common/md5.min.js'
    
    export default {
        name:"dealPwd",
        data() {
            return {
                pwd:'',
                newPwd:'',
                newPwd2:'',
                code:'',
                isResetPwd:false,
                getCodeBtnText: '获取验证码',
                count:60,
                disable:false,
            };
        },
        methods:{
            messageToggle(icon,msg){
                let stoTimer = setTimeout(() => {
                  clearTimeout(stoTimer)
                  stoTimer = null
                  
                  uni.showToast({
                    title: msg,
                  	mask: true,
                  	icon: icon
                  })
                }, 100)
            },
            changeSta(){
                this.isResetPwd = !this.isResetPwd
            },
            getVlidCode(){
                uni.showLoading({
                	title: '获取中'
                });
                let api = '/user/vcode'
                let requestdata = {email: this.lib.User.phone(),type: 1}
                let method = 'GET'
                this.global.D3MetaVerseRequest(api,requestdata,method).then(data=>{
                      uni.hideLoading();
                	  var countDown = setInterval(()=>{
                		if(this.count < 1){
                		  this.disable = false;
                		  this.getCodeBtnText = '获取验证码';
                		  this.count = 60;
                		  clearInterval(countDown);
                		}else{
                		  this.disable = true;
                		  this.getCodeBtnText = this.count-- + 's后重发';
                		}
                	  },1000);
                	  
                	  this.messageToggle('success',`验证码已发放，请查收！`);
                }).catch(err=>{
                    uni.hideLoading();
                    this.messageToggle('error','获取验证码失败：'+err);  
                })
            },
            resetPwd(){
                if(!this.code){
                    this.messageToggle('error','请输入验证码！')
                    return
                }
                if(!this.newPwd || !this.newPwd2){
                    this.messageToggle('error','请输入新密码！')
                    return
                }
                if(this.newPwd != this.newPwd2){
                    this.messageToggle('error','两次密码不一致！')
                    return
                }
                
                uni.showLoading({
                	title: '重置中'
                });
                let api = '/user/trade/password'
                let requestdata = {newFdPassWord:this.newPwd,uid: this.lib.User.uid(), uuid: this.lib.User.uuid(), token: this.lib.User.token(),
                validate:'ooo',captchaId:'2652309a070249d2942831e936e0d87d',vercodePhone:this.code}
                let method = 'POST'
                this.global.D3MetaVerseRequest(api,requestdata,method).then(data=>{
                      uni.hideLoading()
                      this.messageToggle('success',`密码重置成功！`)
                      setTimeout(()=>{
                          this.changeSta()
                      },300)
                	  
                }).catch(err=>{
                    uni.hideLoading();
                    this.messageToggle('error','密码重置失败：'+err);  
                })
            },
            submit(){
                if(!this.pwd){
                    this.messageToggle('error','请输入密码！')
                    return
                }
                
                this.$emit('submit',this.pwd)
            },
            closePopup(){
                this.$emit('close',true)
            }
        },
        //此处定义传入的数据
        props: {
            test: {
                type: Object,
                value: null
            }
        }
    }
</script>

<style>
@import '@/common/common.css';

.codebtn {
  width: 160rpx;
  height: 60rpx;
  overflow-wrap: break-word;
  border-radius: 5px;
  border: 1px solid rgba(255, 237, 190, 1);
  color: #763c1a;
  font-size: 28rpx;
  font-family: PingFangSC-Medium;
  text-align: center;
  font-weight: bold;
  white-space: nowrap;
  line-height: 58rpx;
  display: block;
  margin-left: 10rpx;
}
</style>