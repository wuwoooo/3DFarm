<template>
  <view class="index">
      <!-- #ifdef H5 -->
      <canvas style="width: 100%;height: 100%;">
          <img :src="imgUrl" style="width: 650rpx; height: 1120rpx;-webkit-touch-callout: default;" />
      </canvas>
      <!-- #endif -->
      
      <!-- #ifndef H5 -->
          <image :src="imgUrl" style="width: 650rpx; height: 1120rpx;" @longpress="saveImg(imgUrl)"/>
      <!-- #endif -->
    <view style="position: fixed; top: 999999999999999999999rpx">
      <canvas id="myCanvas" type="2d" canvas-id="myCanvas" style="width: 650px; height: 1120px" />
    </view>
  </view>
</template>
<script>
  import { useDrawPoster } from '@/common/u-draw-poster'

  export default {
    data: () => ({
      imgUrl: '',
      code:'',
      codeImg:''
    }),
    async onReady() {
      // 创建绘制工具
      const dp = await useDrawPoster({
        selector: 'myCanvas',
        loading: true,
        debug: true,
        width: 650,
        height: 1120
      })
      const w = dp.canvas.width
      const h = dp.canvas.height
      // 绘制基本背景
      dp.draw((ctx) => {
        ctx.fillStyle = '#ffffff'
        ctx.fillRoundRect(0, 0, w, h, 12)
        ctx.clip()
        ctx.fillStyle = 'rgba(245, 229, 173, 1)'
        ctx.fillRect(0, 0, w, h)
        ctx.fillStyle = '#894400'
        ctx.textAlign = 'center'
        ctx.font = 'bold 32px PingFang SC'
        ctx.fillText(' 波氪庄园 ', w / 2, 50)
      })
      // 绘制图片内容
      dp.draw(async (ctx) => {
        //#ifdef H5
        await Promise.all([
            ctx.drawImage('/pages-share/static/share_logo.png', 20, 10, 180, 65),
            ctx.drawImage('/pages-share/static/share_bg.png', 19, 86, 612, 1020),
            ctx.drawImage('/pages-share/static/share_box.png', 30, 870, 590, 220),
            ctx.drawImage('/pages-share/static/share_title.png', 50, 890, 350, 50),
            ctx.drawImage('/pages-share/static/share_gift.png', 465, 770, 150, 140)
        ])
        //#endif
        
        //#ifndef H5
        await ctx.drawRoundImage('https://t-www.aisky.io/bkzy/static/share_logo.png', 20, 10, 180, 65),
        await ctx.drawRoundImage('https://t-www.aisky.io/bkzy/static/share_bg.png', 19, 86, 612, 1020),
        await ctx.drawRoundImage('https://t-www.aisky.io/bkzy/static/share_box.png', 30, 870, 590, 220),
        await ctx.drawRoundImage('https://t-www.aisky.io/bkzy/static/share_title.png', 50, 890, 350, 50),
        await ctx.drawRoundImage('https://t-www.aisky.io/bkzy/static/share_gift.png', 465, 770, 150, 140)
        //#endif
        
        // 用户二维码
        await ctx.drawRoundImage(this.codeImg, 445, 910, 150, 150)
        // 用户头像
        //await ctx.drawRoundImage(headImgUrl, 39, 790, 90, 90, 100)
      })
      // 绘制中间文字内容
      dp.draw((ctx) => {
        ctx.fillStyle = '#894400'
        ctx.font = '30px PingFang-SC-Heavy'
        ctx.fillText('邀请码：'+this.code, 48, 1000)
        ctx.fillText('扫描注册即可领取数字藏品', 48, 1052)
        /*ctx.font = '28px PingFang SC'
        ctx.fillWarpText({
          content:
            '当你觉得晚了的时候，恰恰是开始的时候，未来可期、前程似锦、一路向前吧。dddddddddddddd',
          maxWidth: 527,
          x: 81,
          y: 700,
          layer: 2
        })*/
      })
      // 绘制底部文字内容
      /*dp.draw((ctx) => {
        ctx.fillStyle = '#333333'
        ctx.font = '28px PingFang SC'
        ctx.fillText('叽叽喳喳', 145, 820)
        ctx.font = '24px PingFang SC'
        ctx.fillText('邀请您一起聆听声音', 145, 866)
        ctx.font = '21px PingFang SC'
        ctx.fillText('扫码注册', 521, 895)
      })*/
      this.imgUrl = await dp.create()
    },
    methods:{
        saveImg(url) {
            uni.saveImageToPhotosAlbum({
                    filePath: url,
                    success: function () {
                        //console.log('save success');
                        uni.showToast({
                            title:'图片保存完毕！',
                            icon:'success'
                        })
                    }
            });
		},
    },
    onLoad(option) {
        this.code = option.code
        this.codeImg = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data='+encodeURIComponent(this.global.metaverseSitePath+'pages/reg/reg?code='+this.code)
        //this.codeImg = 'https://api.pwmqr.com/qrcode/create/?down=1&url='+encodeURIComponent(this.global.metaverseSitePath+'pages/reg/reg?code='+this.code)
    }
  }
</script>

<style lang="scss">
  page,
  .index {
    height: 100%;
  }
  .index {
    position: relative;
    text-align: center;
    background: rgba($color: grey, $alpha: 0.2);
  }
  image {
    margin-top: 30rpx;
  }
  img {
    margin-top: 30rpx;
  }
</style>
