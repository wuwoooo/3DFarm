<template>
  <view class="page flex-col">
    <view class="outer1 flex-col">
          <view class="section5 flex-row justify-between">
            <view :class="chooseType==1?'group2':'group22'" @click="changeType(1)">
              <text class="txt14">已激活树苗</text>
            </view>
            <view :class="chooseType==2?'group2':'group22'" @click="changeType(2)">
                <text class="txt14">树苗商店</text>
            </view>
            <view :class="chooseType==3?'group2':'group22'" @click="changeType(3)">
                <text class="txt14">失效树苗</text>
            </view>
          </view>
          
          <view  style="margin-bottom: 50rpx;">
              <view v-if="!seedList || seedList.length==0" style="text-align: center;width: 100%;padding: 30rpx;">
                  <image src="@/static/no_data.svg"></image>
              </view>
          <view class="section6 flex-col" v-for="(item,index) in seedList" :key="index" @click="chooseSeed(item)">
            <view class="box10 flex-row">
              <text class="txt4">{{item.name}}</text>
              <image class="pic2" :src="'/static/vip'+item.vipGrade+'.png'" v-if="item.vipGrade && item.vipGrade>0"/>
            </view>
            <view class="box11 flex-row justify-between">
              <view class="ImageText7 flex-col">
                <view class="layer11 flex-col justify-between">
                  <view class="img5 flex-col" :style="{'background': 'url('+item.img+') no-repeat', 'background-size': '100% 100%'}">
                    <image v-show="item.vipGradeFit && chooseType==2" class="pic7" src="@/pages-seed/static/seedShop1.png" 
                    v-if="(item.buyNum<item.buyMax && (!(item.isNewbieMiner && claimNewbieMiner)))"/>
                    <image v-show="chooseType==3" class="pic7" src="@/pages-seed/static/seedShop13.png" />
                  </view>
                  <view class="TextGroup19 flex-col">
                    <text class="txt5" v-show="chooseType==2">兑换:{{item.price}}豆</text>
                  </view>
                </view>
              </view>
              <view class="outer6 flex-col justify-between">
                  <block v-if="chooseType==2">
                      <text class="txt2">奖励活跃度：{{item.activeness}}</text>
                      <text class="txt2">奖励荣誉值：{{item.reputation}}</text>
                      <text class="txt2">产量：{{item.product}}豆</text>
                      <text class="txt2">培育时间：{{parseInt(item.duration/3600)}}小时</text>
                      <text class="txt2">培育天数：{{item.cycle}}天</text>
                      <text class="txt2" v-if="item.isNewbieMiner">是否已领取：{{claimNewbieMiner?'是':'否'}}</text>
                      <text class="txt2" v-else>已激活数量：{{item.buyNum}}/{{item.buyMax}}</text>
                  </block>
                  <block v-else>
                      <text class="txt2">&nbsp;</text>
                      <text class="txt2">总产量：{{item.product}}豆</text>
                      <text class="txt2">开始时间：{{item.startTime}}</text>
                      <text class="txt2">结束时间：{{item.endTime}}</text>
                      <text class="txt2">剩余天数：{{item.remainNum}}天</text>
                      <text class="txt2">UUID：{{item.uuid}}</text>
                  </block>
                </view>
            </view>
            <image src="@/pages-seed/static/seddShop2.png" style="width: 172rpx;height: 100rpx;margin: -300rpx 0 0 520rpx;" v-if="!item.vipGradeFit && chooseType==2"></image>
          </view>
          </view>          
          
          </view>
    
    <uni-popup ref="popup" :mask-click="false">
        <view style="width: 648rpx;height: 817rpx;background: url(https://t-www.aisky.io/bkzy/static/seedShop3.png) no-repeat; background-size: cover;text-align: center;">
            <view style="position: absolute;top:-70rpx;width: 100%;text-align: center;">
                <image src="@/pages-seed/static/seedShop4.png" style="width: 600rpx;margin: -110rpx 0 0 20rpx;" mode="widthFix"></image>
            </view>
            <view style="position: absolute;top:-70rpx;right: -20rpx;">
                <image src="@/static/close.png" style="width: 100rpx;height: 100rpx;" @click="closeSeedPopup()"></image>
            </view>
            <view style="height: 30rpx;"></view>
            <view style="width: 100%;height: 620rpx;overflow: scroll;">
                <view v-if="!NFTList || NFTList.length==0" style="text-align: center;width: 100%;padding: 30rpx;">
                    <view class="txt4">没有对应数字藏品！</view>
                    <image src="@/static/no_data.svg"></image>
                </view>
                <view v-if="selectedSeed && selectedSeed.nftlevel &&  selectedSeed.nftlevel.length>0" style="color: red;margin-top: 15rpx;">此树苗对藏品等级限制在：{{selectedSeed.nftlevel[0]}}~{{selectedSeed.nftlevel[1]}}</view>
                <view class="seed1 flex-col" v-for="(item,index) in NFTList" :key="index" @click="selectNFT(item)">
                      <view class="seed2 flex-row justify-between" :class="item.status=='已绑定'?'picGray':''">
                        <view class="seed3 flex-col">
                          <view class="seed4 flex-col" v-show="item.selected"></view>
                        </view>
                        <view class="seed5 flex-col">
                          <view class="seed6" v-if="selectedSeed.nftType">
                                <view class="seed7">序号：{{item.seqno}}（<text>{{item.status}}</text>）</view>
                                <text class="seed8">DDCID：{{item.info?item.info:'铸造中'}}</text>
                          </view>
                          <view v-else style="width: 500rpx;white-space: nowrap;text-align: left;margin-left: 150rpx;">
                                <view class="seed7">名称：{{utils.subTextLen(item.name,8)}}</view>
                                <text class="seed8">藏品等级：{{item.level}} / DDCID：{{item.info?item.info:'铸造中'}}</text>
                          </view>
                        </view>
                      </view>
                </view>
            </view>
            <view style="width: 100%;color: red;height: 60rpx;line-height: 60rpx;margin-left: -8rpx;font-size: 26rpx;">
                温馨提示：激活成功后您的数字藏品将被锁定30天
            </view>
            <view style="">
                <image src="@/pages-seed/static/seedShop5.png" style="width: 300rpx;height: 70rpx;" @click="activeSeed()"></image>
            </view>
        </view>
    </uni-popup>
    
    <uni-popup ref="popup2" :mask-click="false">
        <view class="flex-col" style="width: 694rpx;height: 737rpx;background: url(https://t-www.aisky.io/bkzy/static/seedShop6.png) no-repeat; background-size: cover;align-items: center;justify-items: center;">
            <view style="height: 30rpx;"></view>
            <view style="align-items: center;justify-items: center;" class="flex-row">
                <image src="@/pages-seed/static/seedShop7.png" style="width:70rpx;height: 70rpx;margin-right: 20rpx;"></image>
                <text style=" -webkit-text-stroke: 1rpx rgba(91, 40, 10, 1);color: rgba(255, 255, 255, 1);font-size: 35rpx;font-weight: bold;
                        ">激活树苗成功</text>                    
            </view>
            <view style="height: 120rpx;"></view>
            <view>
                <text style="color: rgba(137, 68, 0, 1);font-size: 34rpx;font-family: PingFang-SC-Heavy;font-weight: bold;">您已成功激活树苗种子</text>
            </view>
            <view style="height: 20rpx;"></view>
            <view class="flex-col" style="width: 240rpx;height: 240rpx;background: url(https://t-www.aisky.io/bkzy/static/seedShop8.png) no-repeat; background-size: cover;align-items: center;justify-items: center;justify-content: center;">
                <view class="flex-col" style="width: 180rpx;height: 180rpx;background: url(https://t-www.aisky.io/bkzy/static/seedShop9.png) no-repeat; background-size: cover;align-items: center;justify-items: center;justify-content: center;">
                    <view style="height: 140rpx;"></view>
                    <image :src="selectedSeed.img" style="width:70rpx;height: 70rpx;margin-right: -90rpx;"></image>
                    <view style="height: 20rpx;"></view>
                    <text style=" -webkit-text-stroke: 2rpx rgba(91, 40, 10, 1);color: rgba(255, 255, 255, 1);font-size: 35rpx;font-weight: bold;
                            ">{{selectedSeed.name}}</text>                            
                </view>
            </view>
            <view style="height: 80rpx;"></view>
            <image src="@/pages-seed/static/seedShop10.png" style="width:300rpx;height: 70rpx;" @click="gotoFarmIndex()"></image>
        </view>
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
export default {
  data() {
    return {
        msgType: 'success',
        msgTitle: '',
        msgContent: '',
        claimNewbieMiner:false,  //是否已领取试载种子
        farmGrade:2,
        VIPGrade:1,
        mPoint:1111,
        chooseType:2,  //1 已激活种子 2 种子商店 3 失效种子
        selectedSeed:{},
        selectedNFT:'',
        seedList:[],
        activedSeedList:[],
        failureSeedList:[],
        seedShopList:[],
        seedNameImgList:[
            {
                name:'试',
                img:'https://t-www.aisky.io/bkzy/static/seed0.png',
            },
            {
                name:'1级',
                img:'https://t-www.aisky.io/bkzy/static/seed1.png',
            },
            {
                name:'2级',
                img:'https://t-www.aisky.io/bkzy/static/seed2.png',
            },
            {
                name:'3级',
                img:'https://t-www.aisky.io/bkzy/static/seed3.png',
            },
            {
                name:'4级',
                img:'https://t-www.aisky.io/bkzy/static/seed4.png',
            },
            {
                name:'5级',
                img:'https://t-www.aisky.io/bkzy/static/seed5.png',
            }
        ],
        NFTList:[],
    };
  },
  methods: {
      messageToggle(type,title) {
      	this.msgType = type
      	this.msgContent = title
      	this.$refs.message.open()
      },
      changeType(type){
          this.chooseType = type
          this.seedList = []
          setTimeout(()=>{
              this.getSeedList()
          },10)
          
      },
      selectNFT(item){
          if(item.status=='已绑定') return
          
          this.selectedNFT = item
          for(let nft of this.NFTList){
              if(nft==item) nft.selected = true
              else nft.selected = false
          }
      },
      async chooseSeed(item){
          //console.log(item)
          if(this.chooseType!=2) return
          if(item.isNewbieMiner && this.claimNewbieMiner){
              this.messageToggle('error','您已领取过试载豆树！')
              return
          }
          if(item.buyNum==item.buyMax){
              this.messageToggle('error','已达到最大可激活数量！')
              return
          }
          
          if(!item.vipGradeFit){
              this.messageToggle('error','等级不符，无法激活！')
              return
          }
          this.selectedSeed = item
          
          this.NFTList=[]
          uni.showLoading({
            title: '加载中'
          });
          let result = await this.global.getUserNFTbyType(item.nftType)
          //console.log('getUserNFTbyType',result)
          uni.hideLoading()
          
           for(let nft of result){
               let theNFT = {
                   seqno:nft.seqno,
                   info:nft.info?nft.info:'铸造中',
                   selected:false,
                   status:nft.status!=4?'正常':'已绑定',
                   type:nft.type,                       
               }
               
               //判断nftlevel
               if(this.selectedSeed.nftlevel && this.selectedSeed.nftlevel.length>0){
                     let nftinfo = await this.global.getTypeInfo(nft.type)
                     theNFT.level = nftinfo.level
                     theNFT.name = nftinfo.name
                     //console.log('nftinfo',nftinfo)
               }
               
               this.NFTList.push(theNFT)                   
           }                   
          
          this.$refs.popup.open()
      },
      activeSeed(){
          if(!this.selectedNFT){
              this.messageToggle('error','请选择数字藏品进行激活！')
              return
          }
          if(this.selectedNFT.status=='已质押'){
              this.messageToggle('error','请选择非质押数字藏品！')
              return
          }
                    
          //进行激活
          let api = '/mining/user/miner'
          console.log('this.selectedSeed',this.selectedSeed)
          console.log('this.selectedNFT',this.selectedNFT)
          let requestdata = {minerId:this.selectedSeed.id,captchaId:'2652309a070249d2942831e936e0d87d',
                uuid:this.lib.User.uuid(),token:this.lib.User.token(),uid:this.lib.User.uid(),diamondCurrency:174,ddcId:this.selectedNFT.info}
          let method = 'POST'
          uni.showLoading({
          	title: '激活中'
          });
          this.global.D3MetaVerseRequest(api,requestdata,method,true).then(res=>{
              uni.hideLoading()
              uni.$emit('index_refresh', {})
              
              this.$refs.popup.close()
              this.$refs.popup2.open()
          }).catch(err=>{
              uni.hideLoading()
              this.messageToggle('error','激活失败：'+err)
          })
          
      },
      closeSeedPopup(){
          this.$refs.popup.close()
      },
      gotoFarmIndex(){
          uni.switchTab({
            url: "/pages/index/index"
          })
      },
      getUsersSeeds(status){
          uni.showLoading({
          	title: '加载中'
          });
          this.global.getUsersTreeList(status).then(res=>{
              //console.log('用户树苗信息',res)
              uni.hideLoading()
              for(let item of res){
                  let img
                  for(let seed of this.seedNameImgList){
                      if(item.name.indexOf(seed.name)!=-1){
                          img = seed.img
                          break
                      }
                  }
                  let uuid= item.uuid
                  if(uuid && uuid.length>10) uuid = uuid.substr(0,3)+'****'+uuid.substr(7,3)
                  let seed = {
                      id:item.id,
                      name:item.name,
                      img:img,
                      price:item.price,
                      product:item.product,
                      productivity:item.productivity,
                      duration:item.duration,
                      activeness:item.activeness,
                      reputation:item.reputation,
                      startTime:this.utils.formatDate(item.startTime.replace(/\-/g,"/"),'YY-MM-DD'),
                      endTime:this.utils.formatDate(item.endTime.replace(/\-/g,"/"),'YY-MM-DD'),
                      remainNum:item.remainNum,
                      uuid:uuid,
                  }
                  if(status==1) this.activedSeedList.push(seed)
                  else this.failureSeedList.push(seed)
              }
              if(status==1) this.seedList = this.activedSeedList
              else this.seedList = this.failureSeedList
          }).catch(err=>{
              uni.hideLoading()
              this.messageToggle('error','获取用户树苗信息失败：'+err)
          })
      },
      getSeedList(){
          if(this.chooseType==1){
              if(!this.activedSeedList || this.activedSeedList.length==0){                  
                  this.getUsersSeeds(1)
              }else this.seedList = this.activedSeedList
          }else if(this.chooseType==3){
              if(!this.failureSeedList || this.failureSeedList.length==0){
                  this.getUsersSeeds(-1)
              }else this.seedList = this.failureSeedList
          }else if(this.chooseType==2){
              if(!this.seedShopList || this.seedShopList.length==0){
                  let api = '/mining/miner/query/publish'
                  let requestdata = {pageIndex:1,pageSize:100,uuid:this.lib.User.uuid(),token:this.lib.User.token(),uid:this.lib.User.uid(),diamondCurrency:174}
                  let method = 'GET'
                  uni.showLoading({
                  	title: '加载中'
                  });
                  this.global.D3MetaVerseRequest(api,requestdata,method,true).then(res=>{
                      //console.log('商店树苗信息',res)
                      uni.hideLoading()
                      for(let item of res.attachment.list){
                          let img
                          for(let seed of this.seedNameImgList){
                              if(item.name.indexOf(seed.name)!=-1){
                                  img = seed.img
                                  break
                              }
                          }
                          let rules = JSON.parse(item.rules)
                          //VIP的rules要求
                          let vipGradeFit = false
                          if(rules && rules.VIP){
                              if(this.VIPGrade>=rules.VIP[0] && this.VIPGrade<=rules.VIP[1]) vipGradeFit = true
                          }else vipGradeFit = true
                          //NFTLevel要求
                          let nftlevel = []
                          if(rules && rules.NFTLEVEL) nftlevel = rules.NFTLEVEL
                          
                          let isNewbieMiner = false  //是否试载种子
                          if(item.name.indexOf('试')!=-1) isNewbieMiner = true
                          
                          this.seedShopList.push({
                              id:item.id,
                              name:item.name,
                              img:img,
                              price:item.price,
                              product:item.product,
                              productivity:item.productivity,
                              duration:item.duration,
                              cycle:item.cycle,
                              activeness:item.activeness,
                              reputation:item.reputation,
                              buyNum:item.buyNum,
                              buyMax:item.buyMax,
                              vipGrade:(rules&&rules.VIP)?rules.VIP[0]:0,
                              vipGradeFit:vipGradeFit,
                              nftType:(rules && rules.TYPE)?rules.TYPE:'',
                              nftlevel:nftlevel,
                              secondaryCurrencyId:item.secondaryCurrencyId,
                              isNewbieMiner:isNewbieMiner
                          })
                      }
                      this.seedList = this.seedShopList
                      
                      //console.log('this.seedList',this.seedList)
                  }).catch(err=>{
                      uni.hideLoading()
                      this.messageToggle('error','获取商店树苗信息失败：'+err)
                  })
              }else{
                 this.seedList = this.seedShopList
              }
          }
          
      }
  },
  onLoad() {
      this.global.getFarmerInfo(true).then((res)=>{
          this.farmGrade = res.profile.level
          this.VIPGrade = res.profile.vipLevel
          this.claimNewbieMiner = res.claimNewbieMiner
          //console.log(res)
      }).catch((err)=>{
          this.messageToggle('error','获取果农信息失败：'+err)
      })
      
      this.getSeedList()  
}
};
</script>
<style>
@import '@/common/common.css';
@import './index.css';
</style>