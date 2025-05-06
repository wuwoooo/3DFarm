<template>
    <view>
            <view class="flex-col" style="width: 694rpx;height: 737rpx;background: url(https://t-www.aisky.io/bkzy/static/seedShop6.png) no-repeat; background-size: cover;align-items: center;justify-items: center;">
                <view style="height: 50rpx;"></view>
                <view style="align-items: center;justify-items: center;justify-content: center;" class="flex-row">
                    <text style=" -webkit-text-stroke: 1rpx rgba(91, 40, 10, 1);color: rgba(255, 255, 255, 1);font-size: 40rpx;font-weight: bold;">请进行登陆</text>
                </view>
                <view style="height: 160rpx;"></view>
                <input placeholder="请输入账号" v-model="mobile"  style="background: url(https://t-www.aisky.io/bkzy/static/login_input.png) no-repeat;background-size: cover;
                width: 416rpx;height: 108rpx;color: rgba(186, 137, 89, 1);font-size: 30rpx;margin-left: -10rpx;padding-left: 20rpx;"/>
                <input type="password" placeholder="请输入密码" v-model="pwd" style="background: url(https://t-www.aisky.io/bkzy/static/login_input.png) no-repeat;background-size: cover;
                width: 416rpx;height: 108rpx;color: rgba(186, 137, 89, 1);font-size: 30rpx;margin-left: -10rpx;padding-left: 20rpx;margin-top: 20rpx;"/>
                <view style="height: 90rpx;"></view>
                <view class="flex-row justify-between">
                    <image src="@/static/mall8.png" style="width:196rpx;height: 75rpx;" @click="login()"></image>
                </view>
            </view>
    </view>
</template>

<script>
    import md5 from '@/common/md5.min.js'
    
    export default {
        name:"login",
        data() {
            return {
                mobile:'',
                pwd:'',
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
            login(){
                if(!this.mobile){
                    
                    this.messageToggle('error',`请填写好手机号！`);
                    return;
                }
                if(!this.pwd){
                    this.messageToggle('error',`请填写好密码！`);
                    return;
                }
                
                /*if(!this.utils.IsMobilePhone(this.mobile))
                {
                  this.messageToggle('error',`手机号码不正确，请重新填写！`);
                  return;
                }*/
                
                //进行登录
                uni.showLoading({
                	title: '正在登录……'
                });
                let salt = 'dig?F*ckDang5PaSsWOrd&%(polarisex0160630).'
                let api = '/user/signin'
                let requestdata = {phone: this.mobile, password: md5(this.pwd+salt), source: 1}
                let method = 'POST'
                this.global.D3MetaVerseRequest(api,requestdata,method).then(data=>{
                    console.log('登录返回',data)
                    uni.hideLoading();
                    this.hasRegTo = true;
                    let phone = data.attachment.phone;
                    let uid =  data.attachment.uid;
                    let uuid =  data.attachment.uuid;
                    let token =  data.attachment.token;
                    let uname =  data.attachment.uname;
                    let point =  data.attachment.point;
                    let isShow =  data.attachment.isShow;
                    
                    //存储用户资料
                    uni.setStorageSync('phone', this.mobile);
                    uni.setStorageSync('uid', uid);
                    uni.setStorageSync('uuid', uuid);
                    uni.setStorageSync('token', token);
                    uni.setStorageSync('uname', uname);
                    uni.setStorageSync('point', point);
                    uni.setStorageSync('isShow', isShow);
                    uni.setStorageSync('loginMobile', this.mobile);
                    uni.setStorageSync('code', '');
                    
                    this.messageToggle('success',`登陆成功！`);
                    this.$emit('loginOk',true)
                    
                    //重新加载数据
                    //uni.$emit('index_refresh', {})
                }).catch(err=>{
                    this.$emit('loginOk',false)
                    uni.hideLoading();                
                    this.messageToggle('error','登陆失败：'+err);  
                })
            },
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
</style>