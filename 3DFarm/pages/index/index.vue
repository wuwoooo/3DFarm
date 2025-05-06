<template>
  <view class="page flex-col">
      <div class="sky">
      	<div class="clouds_one"></div>
      	<div class="clouds_two"></div>
      	<div class="clouds_three"></div>
      </div>
      
      <div id="sky">
        <div class="bird">
          <div class="bird_body">
            <div class="bird_head"></div>
            <div class="bird_wing_left">
              <div class="bird_wing_left_top"></div>
            </div
            <div class="bird_wing_right">
              <div class="bird_wing_right_top"></div>
            </div>
            <div class="bird_tail_left"></div>
            <div class="bird_tail_right"></div>
          </div>
        </div>
      </div>
            
    <view class="mod1 flex-col">
        <view class="flex-col justify-between" style="position: absolute;right: 40rpx;top: 200rpx;z-index: 99;">
          <image class="pic1" src="@/static/item1.png" @click="disableItem()" @click2="gotoThePage('/pages/mall/mall')"/>
          <image class="pic1" src="@/static/item2.png" @click="disableItem()" @click2="openPopup()"/>
          <image class="pic1" src="@/static/item3.png" @click="disableItem()" @click2="openPopup2()"/>
        </view>
      <view class="box1 flex-col justify-between">
        
        <!-- #ifdef H5 -->
        <view class="outer8 flex-row justify-between">
          <view class="wrap1 flex-col">
            <view class="mod2 flex-row justify-between">
              <view class="SingleAvatar1 flex-col" @click="gotoThePage('/pages-my/my/my')">
                <view class="main2 flex-col" :style="faceurl ? { backgroundImage: `url(${faceurl})` } : {}"></view>
              </view>
              <view class="outer1 flex-col justify-between">
                <text class="txt1" @click="gotoThePage('/pages-my/my/my')">{{name}}</text>
                <view class="outer2 flex-row justify-between">
                  <text class="txt2" @click="gotoThePage('/pages-about/aboutFarmGrade/aboutFarmGrade?p='+farmGrade)">{{farmGrade}}级果农</text>
                  <image class="img1" :src="'/static/vip'+VIPGrde+'.png'"  @click="gotoThePage('/pages-about/aboutGrade/aboutGrade?p='+VIPGrde)" v-if="VIPGrde>0"/>
                </view>
              </view>
            </view>
          </view>
          <view class="mod3 flex-col" @click="gotoThePage('/pages-my/pointHis/pointHis')"><text class="word1">{{mPoint}}</text></view>
        </view>
        <!-- #endif -->
        
        <!-- #ifndef H5 -->
        <view class="outer8 flex-row justify-between" style="margin-top: 60rpx;">
          <view class="wrap1 flex-col">
            <view class="mod2 flex-row justify-between">
              <view class="SingleAvatar1 flex-col" @click="gotoThePage('/pages-my/my/my')">
                <view class="main2 flex-col"></view>
              </view>
              <view class="outer1 flex-col justify-between">
                <text class="txt1" @click="gotoThePage('/pages-my/my/my')">{{name}}</text>
                <view class="outer2 flex-row justify-between">
                  <text class="txt2" @click="gotoThePage('/pages-about/aboutFarmGrade/aboutFarmGrade?p='+farmGrade)">{{farmGrade}}级果农</text>
                  <image class="img1" :src="'/static/vip'+VIPGrde+'.png'"  @click="gotoThePage('/pages-about/aboutGrade/aboutGrade?p='+VIPGrde)" v-if="VIPGrde>0"/>
                </view>
              </view>
            </view>
          </view>
          <view class="mod3 flex-col" @click="gotoThePage('/pages-my/pointHis/pointHis')"><text class="word1">{{mPoint}}</text></view>
        </view>
        <!-- #endif -->
                
        <block>
            <!-- 施肥 -->
            <view class="action1 action1-fadeIn" v-if="actionType==1 && actionDo"></view>            
            <!-- 浇水 -->
            <view class="action2 action2-fadeIn" v-if="actionType==2 && actionDo"></view>
            <!-- 除虫 -->
            <view class="action3 action3-fadeIn" v-if="actionType==3 && actionDo"></view>
            <!-- 收获 -->
            <view class="action4 action4-fadeIn" v-if="actionType==4 && actionDo"></view>
            
             <!-- 雨水 -->
            <view style="position: absolute;bottom: 700rpx;left: 150rpx;width: 400rpx;height: 200rpx;" v-if="(actionType==1 || actionType==2 || actionType==3) && actionDo2">
                  <div class='yua'></div>
                  <div class='yub'></div>
                  <div class='yuc'></div>
                  <div class='yud'></div>
                  <div class='yue'></div>
                  <div class='yuf'></div>
            </view>
        </block>
        
        <block v-if="treeGrade==4">
            <view class="fruit" style="bottom:650rpx;right: 120rpx;" :class="startFruitAni?'fruit-ani':''"></view>
            <view class="fruit" style="bottom:800rpx;right: 200rpx;" :class="startFruitAni?'fruit-ani':''"></view>
            <view class="fruit" style="bottom:710rpx;right: 250rpx;" :class="startFruitAni?'fruit-ani':''"></view>
            <view class="fruit" style="bottom:770rpx;right: 300rpx;" :class="startFruitAni?'fruit-ani':''"></view>
            <view class="fruit" style="bottom:740rpx;right: 450rpx;" :class="startFruitAni?'fruit-ani':''"></view>
            <view class="fruit" style="bottom:680rpx;right: 350rpx;" :class="startFruitAni?'fruit-ani':''"></view>
        </block>
        
        <view class="main3 flex-row justify-center">
          <image src="@/static/upgrade.png" style="width: 160rpx;height: 150rpx;margin-top: 445rpx;z-index: 99;" @click="disableItem()"></image>
          <view class="outer3 flex-col justify-between" v-if="treeGrade==4" @click="clickTree()" :class="swingTree?'a-swing':''">
            <view class="outer4 flex-col">
            </view>
          </view>
          <view class="outer3 flex-col justify-between" v-else>
              <image :src="'/static/tree'+treeGrade+'.png'" mode="aspectFit"  @click="clickTree()" :class="swingTree?'a-swing':''"
              style="width: 250rpx;margin-left: 150rpx;margin-top: 100rpx;" v-if="treeGrade>=0"></image>
          </view>
        </view>
        
        <view class="flex-col justify-between" style="justify-content: center;align-items: center;position: absolute;left: 0;bottom: 270rpx;width: 100%;" 
         v-if="treeGrade!=0 && actionTimeLeft>-1">
           <block v-if="actionTimeLeft>0"> 
            <text class="info1">剩余时间：{{showTimeLeft}}</text>
            <view class="main4 flex-row justify-between">
              <view class="box2 flex-col">
                <progress :percent="Number(((30*60-actionTimeLeft)/(30*60))*100)" stroke-width="20" activeColor="#f3bb2d" backgroundColor="#944b10" border-radius="20"
                 class="progress" style="border-radius:30rpx;border: 4rpx solid #fff;box-shadow: 0 0 0 2rpx #944b10;"/>
              </view>
              <image class="Button1" src="@/static/index8.png" @click="goSpeed()" v-if="SpeedUpTaskID"/>
            </view>
           </block>
           <block v-if="treeGrade==4 && actionTimeLeft==0 && Number(product)>0">
               <text class="info1">恭喜您收获{{product}}豆！</text>
               <image style="width:210rpx;height: 70rpx;margin: 30rpx 30rpx 0 0;" src="@/static/confirm.png" @click="actionOver()"/>
           </block>
        </view>
        
        <view class="main5 flex-row justify-between">
          <image class="img6" :class="activeAction==1?'ballon':''" :src="button['button1']" @click="startAction(1)"/>
          <image class="img7" :class="activeAction==2?'ballon':''" :src="button['button2']" @click="startAction(2)"/>
          <image class="img8" :class="activeAction==3?'ballon':''" :src="button['button3']" @click="startAction(3)"/>
          <image class="pic3" :class="activeAction==4?'ballon':''" :src="button['button4']" @click="startAction(4)"/>
          <image class="img9" :class="activeAction==0?'ballon':''" src="@/static/button5.png" @click="gotoThePage('/pages-seed/seedShop/seedShop')"/>

        </view>
      </view>
    </view>
    
    <uni-popup ref="popup" :mask-click="false">
        <view style="width: 648rpx;height: 697rpx;background: url(https://t-www.aisky.io/bkzy/static/task2.png) no-repeat; background-size: 100% 100%;text-align: center;">
            <view style="position: absolute;top:-40rpx;width: 100%;text-align: center;">
                <image src="@/static/task1.png" style="width: 322rpx;" mode="widthFix"></image>
            </view>
            <view style="position: absolute;top:-40rpx;right: 0rpx;">
                <image src="@/static/close.png" style="width: 100rpx;height: 100rpx;" @click="closePopup()"></image>                
            </view>
            <view style="height: 30rpx;"></view>
            <view style="width: 100%;height: 520rpx;overflow: scroll;margin-top: 30rpx;">
                <view class="task1 flex-col" v-for="item in taskList" :key="item.index">
                      <view class="task2 flex-row justify-between">
                        <view class="task3 flex-col">
                          <view class="task4 flex-col justify-between">
                            <text class="task5">{{item.name}}</text>
                            <text class="task6">{{item.content}}</text>
                          </view>
                        </view>
                        <image src="@/static/task4.png" style="width: 113rpx;height: 64rpx;margin-top: 12rpx;" v-if="item.completeStatus"></image>
                        <image src="@/static/task3.png" style="width: 113rpx;height: 64rpx;margin-top: 12rpx;" v-else @click="completeTask(item.id)"></image>
                      </view>
                </view>
            </view>
        </view>
    </uni-popup>
    
    <uni-popup ref="popup2" :mask-click="false">
      <view style="position: absolute;top:-25rpx;left:40rpx;width: 90%;color: #fff;font-weight: bold;z-index: 8;">剩余次数：{{prizeLeftTimes}}</view>
      <view style="position: absolute;top:-170rpx;width: 100%;text-align: center;">
          <image src="@/static/prize/top.png" style="width: 522rpx;" mode="widthFix"></image>
      </view>
      <view style="position: absolute;top:0rpx;right: -70rpx;">
          <image src="@/static/close.png" style="width: 100rpx;height: 100rpx;z-index: 999;" @click="closePopup2()"></image>
      </view>  
      <almost-lottery
        :lottery-size="lotteryConfig.lotterySize"
        :action-size="lotteryConfig.actionSize"
        :lotteryBg="lotteryBg"
        :actionBg="actionBg"
        :ring-count="2"
        :duration="1"
        :imgWidth="75"
        :imgHeight="75"
        :strFontSize = "32"
        :strMarginOutside="30"
        :imgMarginStr="20"
        :canvasMarginOutside="90"
        :canvasCached="false"
        imgCircled
        :prize-list="prizeList"
        :prize-index="prizeIndex"
        @reset-index="prizeIndex = -1"
        @draw-start="handleDrawStart"
        @draw-end="handleDrawEnd"
        @finish="handleDrawFinish"
        v-if="prizeList.length"
        :colors="['#fecf02','#ffe066']"
        :strFontColors="['#fff']"
      />
    </uni-popup>    
    
    <uni-popup ref="popup4" :mask-click="false">
        <view style="position: absolute;top:-120rpx;width: 100%;text-align: center;">
            <image src="@/static/prize/confirmbox1.png" style="width: 522rpx;" mode="widthFix"></image>
        </view>
        <view class="flex-col" style="width: 694rpx;height: 400rpx;background: url(https://t-www.aisky.io/bkzy/static/prize/confirmbox2.png) no-repeat; background-size: cover;align-items: center;justify-items: center;">
            <view style="margin-top: 140rpx;color: rgba(137, 68, 0, 1);font-size: 35rpx;font-family: PingFang-SC-Heavy;font-weight: bold;">{{prizeBoxContent}}</view>
            <view>
                <image src="@/static/prize/confirmbox3.png" style="width: 300rpx;margin-top: 80rpx;" mode="widthFix" @click="prizeBoxConfirm()"></image>
            </view>
        </view>
    </uni-popup>
    
    <uni-popup ref="popup3" :mask-click="false">
        <login @loginOk='checkLogin'></login>
    </uni-popup>
    
    <view>
        <!-- #ifdef H5 -->
    	<uni-popup ref="message" type="message" style="text-align: center;z-index: 999;">
    		<uni-popup-message :type="msgType" :message="msgContent" :duration="2000">
            </uni-popup-message>
    	</uni-popup>
        <!-- #endif -->
        
        <!-- #ifndef H5 -->
        <uni-popup ref="message" type="message" style="text-align: center;z-index: 999;">
            <view style="margin-top: 50rpx;">
                <uni-popup-message :type="msgType" :message="msgContent" :duration="2000">
                </uni-popup-message>                
            </view>
        </uni-popup>
        <!-- #endif -->
    </view>
  </view>
</template>
<script>
import md5 from '@/common/md5.min.js'
import AlmostLottery from '@/uni_modules/almost-lottery/components/almost-lottery/almost-lottery.vue'
import login from '@/components/login/login.vue'

let countdown
let chkSpeedUpTask
let chkSpeedUpTaskTimes = 0
export default {
  components: {
    AlmostLottery,
    login
  },
  data() {
    return {
        // 以下是转盘配置相关数据
        lotteryConfig: {
          // 抽奖转盘的整体尺寸，单位rpx
          lotterySize: 550,
          // 抽奖按钮的尺寸，单位rpx
          actionSize: 90
        },
        // 以下是转盘 UI 配置
        // 转盘外环图，如有需要，请参考替换为自己的设计稿
        lotteryBg: require('@/static/prize/lottery-bg.png'),
        // 抽奖按钮图
        actionBg: require('@/static/prize/action-bg.png'),
        
        // 以下是奖品配置数据
        // 奖品数据
        // prizeStock 奖品库存
        // prizeWeight 中奖概率，数值越大中奖概率越高，权重一样时随机中奖
        prizeList: [],
        // 中奖下标
        prizeIndex: -1,        
        // 是否正在抽奖中，避免重复触发
        prizeing: false,
        prizeLeftTimes:0,
        prizeBoxContent:'恭喜您中将！',
              
      msgType: 'success',
      msgTitle: '',
      msgContent: '',
      mobile: '',
      pwd:'',
      name: '',
      uid: '',
      farmGrade:0,
      VIPGrde:0,
      mPoint:0,
      treeGrade: -1, // -1 不显示 0 没有树苗 1 1级小树苗 2 2级小树苗 3 3级小树苗 4 树
      actionType:-1, // 1 施肥 2 浇水 3 除虫 4 收获
      activeAction: 0, //下一个激活动作
      actionDo: false, //是否正在执行动画动作
      actionDo2: false, //是否正在执行动画动作（第二个动画）
      actionTimeLeft:0,
      swingTree:false, //是否摇晃树
      showTimeLeft:'',
      startFruitAni: false, //开始果实采集动画
      taskList:[],
      SpeedUpTaskID:0,
      hasSpeedUpTask:false,
      todayHasFinished:false,
      product:0,
      hasActiveNotStartSeed:false, //是否有已激活但未启用的种子
      button:{
          button1:'/static/button1.png',
          button2:'/static/button2.png',
          button3:'/static/button3.png',
          button4:'/static/button4.png'
      },
      faceurl: '' // Added faceurl to the data object
    };
  },
  methods: {
      checkLogin(res){
          //console.log(res)
          if(res){
              this.$refs.popup3.close()
              this.refreshData()
          }
      },
       // 本次抽奖开始
      handleDrawStart () {
        if(this.prizeLeftTimes==0){
            this.messageToggle('error','本日抽奖次数不足！')
            return
        }
        this.GetPrizeIndex()
      },
      // 本次抽奖结束
      handleDrawEnd () {
        this.$refs.popup4.open()
        if(this.prizeList[this.prizeIndex].prizeName.indexOf('抽奖次数')==-1) this.prizeLeftTimes--
        this.prizeBoxContent =  '本次中奖：'+this.prizeList[this.prizeIndex].prizeName
      },
      // 抽奖转盘绘制完成
      handleDrawFinish (res) {
        console.log('抽奖转盘绘制完成', res)
        
        if (res.ok) {
          // 计算结束绘制的时间
          console.timeEnd('绘制转盘用时')
        }
        
        uni.hideLoading()
      },
      async getPrizeList () {
         this.prizeList = []
        //if(this.prizeList && this.prizeList.length>0) return
        
        let api = '/mining/lottery/list'
        let requestdata = {uuid:this.lib.User.uuid(),token:this.lib.User.token(),uid:this.lib.User.uid(),diamondCurrency:174}
        let method = 'GET'
        uni.showLoading({
        	title: '奖品准备中'
        });
        this.global.D3MetaVerseRequest(api,requestdata,method,true).then(data=>{
            console.log('getPrizeList',data)
            this.prizeLeftTimes = data.attachment.baseMinerLottery.times
            uni.hideLoading();
            for(let item of data.attachment.activeLottery){
                let img = require('@/static/prize/prize3.png')
                if(item.name.indexOf('豆')!=-1) img = require('@/static/prize/prize1.png')
                else if(item.name.indexOf('积分')!=-1) img = require('@/static/prize/prize2.png')
                this.prizeList.push({
                    prizeId: item.id, prizeName: item.name, prizeStock:100,prizeWeight:1,prizeImage: img
                })
            }
            console.log('已获取到奖品列表数据，开始绘制抽奖转盘',this.prizeList)
            // 计算开始绘制的时间
            console.time('绘制转盘用时')
            uni.showLoading({
            	title: '奖品准备中'
            })
        }).catch(err=>{
            uni.hideLoading()
            this.messageToggle('error','获取奖品失败：'+err)
        })
      },
      // 本地获取中奖下标
      GetPrizeIndex () {
        let api = '/mining/lottery/start'
        let requestdata = {uuid:this.lib.User.uuid(),token:this.lib.User.token(),uid:this.lib.User.uid(),diamondCurrency:174,type:1}
        let method = 'POST'
        uni.showLoading({
        	title: '获取中'
        });
        this.global.D3MetaVerseRequest(api,requestdata,method,true).then(data=>{
            uni.hideLoading()
            console.log('抽奖返回',data)
            for(let index in this.prizeList){
                if(this.prizeList[index].prizeId==data.attachment.id){
                    this.prizeIndex = Number(index)
                    break
                }
            }
            console.log('本次抽中奖品 =>', this.prizeList[this.prizeIndex].prizeName)                    
        }).catch(err=>{
            uni.hideLoading()
            this.messageToggle('error','获取抽奖结果失败：'+err);  
        })        
      },
      prizeBoxConfirm(){
          this.$refs.popup4.close()
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
          this.$refs.popup.open()
          
          this.loadTask()
      },
      loadTask(isCheckSpeedUp){
          this.taskList=[]
          this.SpeedUpTaskID=0
          return
          
          let api = '/mining/ad/tasks'
          let requestdata = {uuid:this.lib.User.uuid(),token:this.lib.User.token(),uid:this.lib.User.uid(),diamondCurrency:174}
          let method = 'GET'
          uni.showLoading({
          	title: '获取中'
          });
          this.global.D3MetaVerseRequest(api,requestdata,method,true).then(data=>{
              console.log('获取任务返回',data)
              uni.hideLoading();
              for(let item of data.attachment){
                  let action=''
                  if(item.action==1) action='增加挖钻百分比'
                  else if(item.action==2){                      
                      action='缩短种植时间'
                      if(item.remain>0) this.SpeedUpTaskID=item.id
                  } 
                  else if(item.action==3) action='赠送贡献值'
                  else if(item.action==4) action='赠送MNW'
                  else if(item.action==5) action='赠送荣誉值'
                  else if(item.action==6) action='赠送MNT'
                  else if(item.action==7) action='赠送NFT盲盒'
                  else if(item.action==8) action='赠送抽奖次数'
                  else if(item.action==9) action='赠送积分'
                  else action = '增加'
                  let content = action+item.value+'，已完成'+(item.times-item.remain)+'/'+item.times+''
                  this.taskList.push({
                      id:item.id,
                      name:item.name,
                      //completeStatus:item.completeStatus && item.nextTime,
                      completeStatus:item.remain==0,
                      times:item.times,
                      remain:item.remain,
                      content:content
                  })
              }
              //检测到了就马上清除
              if(this.SpeedUpTaskID) clearInterval(chkSpeedUpTask)              
              //如果是检测有没有加速任务并且没有检测到，则重复检测几次
              if(isCheckSpeedUp && !this.SpeedUpTaskID && chkSpeedUpTaskTimes==0){
                  clearInterval(chkSpeedUpTask)
                  chkSpeedUpTask = setInterval(()=>{
                      if(chkSpeedUpTaskTimes<4){
                          chkSpeedUpTaskTimes++
                          this.loadTask()
                      }else{
                          clearInterval(chkSpeedUpTask)
                      }
                  },1000)
              }
          }).catch(err=>{
              uni.hideLoading();
              this.messageToggle('error','获取任务失败：'+err);  
          })
      },
      closePopup2(){
          console.log('closePopup2')
          this.$refs.popup2.close()
      },
      openPopup2(){
          this.$refs.popup2.open()
          this.prizeList=[]
          this.getPrizeList()
      },
      async completeTask(itemID,isSpeedUPTask){
          //任务开始
          let api = '/mining/ad/task/start'
          let requestdata = {uid: this.lib.User.uid(), uuid: this.lib.User.uuid(), token: this.lib.User.token(),taskId:itemID}
          let method = 'POST'
          uni.showLoading({
          	title: '任务开始'
          });
          try{
              uni.hideLoading()
              await this.global.D3MetaVerseRequest(api,requestdata,method,true)
          }catch(err){
              uni.hideLoading()
              this.messageToggle('error','任务开始失败：'+err);
              return
          }
          
          let that = this
          uni.showModal({
              title: '任务提示',
                content: '任务完成后点击确定',
                success: async function (res) {
                    if (res.confirm) {
                        api = '/mining/ad/task/complete'
                        requestdata = {uid: that.lib.User.uid(), uuid: that.lib.User.uuid(), token: that.lib.User.token(),taskId:itemID}
                        method = 'POST'
                        uni.showLoading({
                            title: '任务完成'
                        });
                        try{
                            await that.global.D3MetaVerseRequest(api,requestdata,method,true)
                        }catch(err){
                            uni.hideLoading()
                            that.messageToggle('error','任务完成失败：'+err);
                            if(isSpeedUPTask){
                                uni.showModal({
                                    title:'加速失败',
                                    content:'加速任务完成失败：'+err,
                                    success: function(res){
                                        that.refreshData()
                                    }
                                })                                
                            }
                            return
                        }
                        
                        uni.hideLoading()
                        if(isSpeedUPTask){
                            //that.hasSpeedUpTask = true
                            that.refreshData()
                        }
                        return
                    } else if (res.cancel) {
                        //console.log('用户点击取消');
                    }
                }
          })
      },
      landUpgrade(){
          this.messageToggle('error','能量不足！')
      },
      disableItem(){
          this.messageToggle('error','此功能尚未开放！')
      },
      startAction(action){
          if(this.swingTree) return
          if(action<=this.actionType) return
          if(this.actionDo || this.actionDo2) return
          
          if(this.todayHasFinished){
              this.messageToggle('error','今日劳动已全部完成，请明天继续加油！')
              return
          }
          if(this.treeGrade==0){
              //判断是否有已激活但未到时间的种子
              if(this.hasActiveNotStartSeed){
                  this.messageToggle('error','今日激活种子需明日可种植，请等待')                  
              }else{
                  this.messageToggle('error','请先去农场商店激活种子！')                  
              }              
              return
          }
          
          if(this.actionTimeLeft>0 && this.actionTimeLeft!=-1){
              this.messageToggle('error','当前动作尚未执行完毕')
              return
          }
          
          if(!this.actionDo && !this.actionDo2){
              if(this.activeAction==action){
                  this.actionDo = true
                  this.actionType = action
                  console.info(new Date().toLocaleString())
                  console.log('start', this.actionType);
                                
                  let timeout = 1800    //第一个动画的执行时间
                  if(action==4) timeout = 1300  //第四阶段动画总时间为2800ms，因为后面有第二动画播放时间1500ms，故此处为1300ms
                  
                  //第一个动画播放完毕后的执行动作
                  setTimeout(()=>{
                      //播放第二个动画
                      this.actionDo = false
                      this.actionDo2 = true
                      
                      //第二动画播放完毕后的执行动作（第四阶段无第二动画）
                          setTimeout(()=>{
                              this.actionDo2 = false
                              
                              if(this.actionType==1){    //第一阶段：施肥
                                  let time = (new Date()).getTime()
                                  let sign = md5(this.lib.User.uid()+this.lib.User.token()+time+this.global.clientSalt)
                                  let api = '/mining/start/all'
                                  let requestdata = {uuid:this.lib.User.uuid(),token:this.lib.User.token(),uid:this.lib.User.uid(),diamondCurrency:174,time:time,sign:sign}
                                  let method = 'POST'
                                  uni.showLoading({
                                  	title: '执行中'
                                  });
                                  this.global.D3MetaVerseRequest(api,requestdata,method,true).then(data=>{
                                      console.log('动作执行返回',data)
                                      uni.hideLoading()
                                      this.refreshData()
                                  }).catch(err=>{
                                      uni.hideLoading();                
                                      this.messageToggle('error','动作执行失败：'+err);  
                                  })
                              }else if(this.actionType==4){         //最后阶段：收获                              
                                  let time = (new Date()).getTime()
                                  let sign = md5(this.lib.User.uid()+this.lib.User.token()+time+this.global.clientSalt)
                                  let api = '/mining/stop/all'
                                  let requestdata = {validate:'ooo',captchaId:'7df316f7d7a14db9bf5146ff93a6a967',uuid:this.lib.User.uuid(),token:this.lib.User.token(),uid:this.lib.User.uid(),diamondCurrency:174,time:time,sign:sign}
                                  let method = 'POST'
                                  uni.showLoading({
                                  	title: '执行中'
                                  });
                                  this.global.D3MetaVerseRequest(api,requestdata,method,true).then(data=>{
                                      console.log('动作执行返回',data)
                                      uni.hideLoading();
                                      //this.refreshData()
                                      this.actionTimeLeft = 0
                                      this.product = data.attachment.product
                                      this.getActiveAction()
                                      //this.timeGoesby()
                                  }).catch(err=>{
                                      uni.hideLoading();                
                                      this.messageToggle('error','动作执行失败：'+err);  
                                  })
                              }else{        //开始下一阶段
                                  let api = '/mining/step'
                                  let requestdata = {uuid:this.lib.User.uuid(),token:this.lib.User.token(),uid:this.lib.User.uid(),diamondCurrency:174}
                                  let method = 'PUT'
                                  uni.showLoading({
                                  	title: '执行中'
                                  });
                                  this.global.D3MetaVerseRequest(api,requestdata,method,true).then(data=>{
                                      console.log('动作执行返回',data)
                                      uni.hideLoading()
                                      this.refreshData()
                                  }).catch(err=>{
                                      uni.hideLoading();                
                                      this.messageToggle('error','动作执行失败：'+err);  
                                  })
                              }
                          },1500)
                      
                  },timeout)
                  
              }else{
                  this.messageToggle('error','请按"施肥->浇水->除虫->收获"的步骤执行')
              }
          }
      },
      getActiveAction(){
          if(this.treeGrade<=0) this.activeAction = 0
          else{
              if(this.actionTimeLeft<=0){
                  if(this.actionType==-1) this.activeAction = 1
                     else if(this.actionType==1) this.activeAction = 2
                     else if(this.actionType==2) this.activeAction = 3
                     else if(this.actionType==3) this.activeAction = 4
                     else if(this.actionType==4) this.activeAction = -1                  
              }else{
                  this.activeAction = this.actionType
              }
           }
      },
      timeGoesby(){
          if(isNaN(this.actionTimeLeft) || this.actionTimeLeft==-1) return
          
          clearInterval(countdown)
          countdown = setInterval(()=>{
              if(this.actionTimeLeft>0){
                  this.actionTimeLeft--
                  let minute = Math.floor(this.actionTimeLeft/60)
                  let second = this.actionTimeLeft - minute*60
                  if(minute<10) minute = '0'+minute
                  if(second<10) second = '0'+second
                  this.showTimeLeft = minute+':'+second
              }else{
                  //动作执行完毕
                  clearInterval(countdown)
                  this.refreshData()
              }
          },1000)
      },
      actionOver(){
          //动作执行完毕
          this.actionTimeLeft = -1
          
          if(this.treeGrade==4 && this.actionType==4){    //开始收获采集
              this.startFruitAni = true
              setTimeout(()=>{
                  this.startFruitAni = false
                  
                  this.refreshData()
              },1800)
          }
      },
      gotoThePage(url){
          this.global.gotoThePage(url)
      },
      clickTree(){
          if(this.treeGrade==0){
              this.gotoThePage('/pages-seed/seedShop/seedShop')
          }else{
              if(!this.swingTree){
                  this.swingTree = true
                  setTimeout(()=>{
                      this.swingTree = false
                  },1000)
              }
          }
      },
      async goSpeed(){
          //this.actionTimeLeft = 0
          if(this.SpeedUpTaskID){
              this.completeTask(this.SpeedUpTaskID,true)
          }
      },
      async refreshData(){
          this.mobile = this.lib.User.phone();
          this.name = this.lib.User.uname();
          this.uid =  this.lib.User.uid();
          this.farmGrade = 0
          this.VIPGrde = 0
          //this.treeGrade = 0
          this.actionType = -1
          this.actionTimeLeft = -1
          this.button = {button1:'/static/button1.png',button2:'/static/button2.png',button3:'/static/button3.png',button4:'/static/button4.png'}
                   
         //如无信息传递则进行登陆（先等popup3初始化完成）
         if(!this.uid){
             let chkLoginPop = setInterval(()=>{
                 //console.log(this.$refs.popup3)
                 if(this.$refs.popup3){
                     this.$refs.popup3.open()
                     clearInterval(chkLoginPop)
                     return
                 }
             },100)
             return
         }
         
         this.checkWhiteList()         
         
         uni.showLoading({
         	title: '获取中'
         });
         this.global.getFarmerInfo(true).then((res)=>{
             uni.hideLoading()
             console.log(res)
             this.farmGrade = res.profile.level
             this.VIPGrde = res.profile.vipLevel
             
             let todayStatus = res.virtualMiner.todayStatus
             if(todayStatus!=null){
                 if(todayStatus===0){       //未开始
                     this.treeGrade = 1
                     this.actionType = -1
                 }else if(todayStatus===1){      //进行中
                     this.treeGrade = (res.virtualMiner.step || 0)+2
                     this.actionType = (res.virtualMiner.step || 0)+1
                     
                     //在todayStatus=1的情况下，如果actionType出现>=4，说明需要重置回收获阶段
                     if(this.actionType>=4) this.actionType = 3
                     
                     for(let i=1;i<=this.actionType;i++){
                         this.button['button'+i] = '/static/button'+i+'_2.png'
                     }
                     
                     if(this.treeGrade>4) this.treeGrade = 4
                     let stepEndTime = new Date(res.virtualMiner.stepEndTime.replace(/\-/g,"/"))
                     let now = new Date()
                     if(stepEndTime && stepEndTime>now){    //说明正在执行动作
                         this.actionTimeLeft = parseInt((stepEndTime - now)/1000)
                     }
                 }else if(todayStatus===2 || todayStatus===3){     //今日已完成
                     this.todayHasFinished = true
                     //判断背包里是否有激活种子并启用的种子
                     if(res.todayMiners.length>0){
                         this.treeGrade = 1
                         this.activeAction = 1
                     }else this.treeGrade = 0
                     
                 }
             }else{
                 this.treeGrade = 0
             }
             
             if(this.treeGrade==0){     //检测是否有已激活但未到时间的种子
                 for(let item of res.featureMiners){
                     //console.log('检测是否有已激活但未到时间的种子',item)
                     let now = new Date()
                     let startTime = new Date(item.startTime.replace(/\-/g,"/"))
                     //console.log(startTime)
                     if(startTime>now){
                         this.hasActiveNotStartSeed = true
                         break
                     }
                 }
             }
             
             this.getActiveAction()
             if(this.actionTimeLeft>0){   //检查任务列表里是否有加速任务
                setTimeout(()=>{
                    this.loadTask(true)
                },100)
                 this.timeGoesby()
             } 
         }).catch((err)=>{
             uni.hideLoading()
             this.messageToggle('error','获取果农信息出错：'+err)
         })
         
         this.global.getUserMPoint(true).then((res)=>{
             this.mPoint = this.utils.retain(Number(res.amount),2)
			 this.faceurl = res.icoUrl
         }).catch((err)=>{
             this.messageToggle('error','获取豆出错：'+err)
         })
            
      },
      checkWhiteList(){
          return true
          
          if(this.global.IsTest) return
          
          //白名单判断
          let whiteList = ['18612863217','18559880956','18601900318','17611706257','15811544572','13911210537','13720820306','15718872586',
          '18066302303','13320938786','18650057980']
          //console.log('checkWhiteList...mobile:',this.mobile)
          //console.log('checkWhiteList...whiteList:',whiteList)
          let that = this
          if(this.mobile && !whiteList.includes(this.mobile)){
              uni.showModal({
                  title:'未获得内测资质',
                  content:'当前庄园处于内测阶段，如您需要参与内测，请联系客服将您的账号添加到内测名单^_^',
                  showCancel:false,
                  success: function (res) {
                  		if (res.confirm) {
                            //that.checkWhiteList()
                            //#ifdef H5
                            that.global.gotoWebView('https://shop107877763.youzan.com/v3/im/index?c=wsc&kdt_id=107685595&reft=1656777180264&spm=f.102023852#/index')
                            //#endif
                            
                            //#ifdef MP-WEIXIN
                            that.checkWhiteList()
                            //#endif
                  		} else if (res.cancel) {
                  			//console.log('用户点击取消');
                  		}
                   }
              })
          }
      }
  },
  onLaunch() {
      //uni.hideTabBar()
  },
  onShow() {
      //console.log('on show')
      this.checkWhiteList()
      uni.hideTabBar({})
  },
  async onLoad(option) {
      //console.log('on load')
      uni.hideTabBar({})
      
      //#ifdef H5
      //判断背景图是否加载完毕
      var myimg = new Image();
      myimg.src = "/static/bg.png";
      var myinterval = null;      
      uni.showLoading({
          title: '资源加载中...'
      })
      myfun01()
      myinterval = setInterval(myfun01, 1)
      function myfun01()
      {
        if(myimg.complete)
      	{
      	    clearInterval(myinterval);
            console.log('bg加载完毕')
            uni.hideLoading()
      	}
      } 
      //#endif
      
      if(option.uid && option.uuid && option.token){
          console.log(option)
          uni.setStorageSync('phone', option.mobile);
          uni.setStorageSync('uid', option.uid);
          uni.setStorageSync('uuid', option.uuid);
          uni.setStorageSync('token', option.token);
          uni.setStorageSync('uname', option.uname);
      }
      
      await this.refreshData()
      
       // 注册监听事件
       uni.$on('index_refresh',(data)=>{
           console.log('index_refresh')
           
           this.refreshData()
       })
   },
  onUnload() {
      // 移除监听事件
      uni.$off('index_refresh')
  },
  onHide() {
  },
  watch:{
     hasSpeedUpTask(item1,item2){   // item1为新值，item2为旧值
         console.log('hasSpeedUpTask值变化',item1,item2)
         if(item1 && !item2){
             this.refreshData()
         }
     }
  }
};
</script>
<style lang="scss">
@import '@/common/common.css';
@import './index.css';
@import './ani.css';

uni-page-body{
    height: 100%;
}

.almost-lottery
{
    margin-left: 0rpx;
}

.progress{
     width:100%;
        ::v-deep .uni-progress-bar{  // 这主要是加上deep才能改变它原来的样式 
        border-radius:30rpx !important;
        border: 4rpx solid #fff;
        box-shadow: 0 0 0 2rpx #944b10;
        .uni-progress-inner-bar{
            border-radius:30rpx 30rpx 30rpx 30rpx !important;
        }
    }
}
</style>
