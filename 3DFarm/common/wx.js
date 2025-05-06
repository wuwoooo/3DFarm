var jweixin = require('./jweixin-module/index.js');
//var jweixin = require('./jweixin.js')

export default {
    //判断是否在微信中  
    isWechat: function () {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/micromessenger/i) == 'micromessenger') {
            console.log('是微信客户端')
            return true;
        } else {
            console.log('不是微信客户端')
            return false;
        }
    },
    //初始化sdk配置  
    initJssdkShare: function (callback, url) {

        uni.request({
            url: 'https://cmall.yuliang.top/mobile/index.php?m=app3d&c=authorized&a=WxJsApi',
            method: 'GET',
            data: {
                url: url
            }, //这里不是统一的，看你们后端
            success: (res) => {
                console.log(res)

                if (res.statusCode == 200) {
                    let result = res.data
                    console.log(result)
                    jweixin.config({
                        debug: true,
                        appId: 'wxf22d7fc024770c09',
                        timestamp: result.timestamp,
                        nonceStr: result.nonceStr,
                        signature: result.signature,
                        jsApiList: [
                            'checkJsApi',
                            'updateTimelineShareData',
                            'updateAppMessageShareData',
                            'onMenuShareAppMessage',
                            'onMenuShareTimeline'
                        ]
                    });
                    
                    jweixin.error(function (res) {
                        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                        //alert(JSON.stringify(res));
                    });
                    
                    console.log(callback)
                    //配置完成后，再执行分享等功能  
                    if (callback) {
                        callback(result);
                    }
                }
            }
        });

    },
    //在需要自定义分享的页面中调用  
    share: function (data, url) {
        url = url ? url : window.location.href;
        //url = url.split('#')[0]
        console.log("url:" + url)
        //url = encodeURIComponent(url.split('#')[0])
        alert("url:" + url)
        if (!this.isWechat()) {
            //return;
        }
        //每次都需要重新初始化配置，才可以进行分享  
        this.initJssdkShare(function (signData) {
            console.log('start jwx..ready...')
            jweixin.ready(function () {
                var shareData = {
                    title: data.title,
                    desc: data.desc,
                    link: url,
                    imgUrl: data.img,
                    success: function (res) {
                        //alert(JSON.stringify(res))
                    },
                    cancel: function (res) {
                        //alert(JSON.stringify(res))
                    },
                    fail:function(res){
                        //alert(JSON.stringify(res))
                    }
                };
                //分享给朋友接口  
                jweixin.updateAppMessageShareData(shareData)
                //分享到朋友圈接口  
                jweixin.updateTimelineShareData(shareData)
                
                jweixin.onMenuShareAppMessage(shareData)
                jweixin.onMenuShareTimeline(shareData)
            });
        }, encodeURIComponent(url));
        
        
    },
}