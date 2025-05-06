var  RequestUrl = 'https://api.tokenai.net/polarisex/'            //正式服务器
var SitePath = 'https://bkzy.tokenai.net/'
var metaverseSitePath = 'https://ntoken.tokenai.net/#/'

const IsTest = true

if(IsTest){
    RequestUrl = 'https://t-api.aisky.io/polarisex/'    //测试服务器
    SitePath = 'https://farm.mlxy.net/'
    metaverseSitePath = 'http://3d.mlxy.net/#/'
}

const clientSalt = '5Fv0nw3Kbm8WJg0L'
import lib from './lib.js'

export default {
   IsTest,
   RequestUrl,
   SitePath,
   metaverseSitePath,
   clientSalt,
   //获取用户信息
   getUserInfo: async function(getpoint){
       let api = '/mining/team/details'
       let requestdata = {uuid:lib.User.uuid(),token:lib.User.token(),uid:lib.User.uid(),local:'zh_CN',diamondCurrency:174}
       let method = 'GET'
       let data
       try{
           data = await this.D3MetaVerseRequest(api,requestdata,method)
       }catch(err){
           throw err
       }
       
       //console.log(data.attachment)
       return data.attachment
   },
   //获取果农信息
   async getFarmerInfo(allinfo){
       let api = '/mining/info'
       let requestdata = {uuid:lib.User.uuid(),token:lib.User.token(),uid:lib.User.uid(),local:'zh_CN',diamondCurrency:174}
       let method = 'GET'
       let data
       try{
           data = await this.D3MetaVerseRequest(api,requestdata,method)
           //console.log('getFarmerInfo',data)
       }catch(err){
           throw err
       }
       
       if(allinfo) return data.attachment   //返回
       else return data.attachment.profile      //返回用户信息
   },
   //获取用户豆、积分
   getUserMPoint: async function(getpoint){
       let mpoint
       
       let api = '/wallet/asset'
       let currencyId = 173
       if(getpoint) currencyId = 174
       let requestdata = {currencyId: currencyId, uuid: lib.User.uuid(), uid: lib.User.uid(), token: lib.User.token(), local: 'zh_CN'}
       let method = 'GET'
       let data
       try{
           data = await this.D3MetaVerseRequest(api,requestdata,method)           
       }catch(err){
           throw err
       }
       
       mpoint = data.attachment
       
       return mpoint
   },
   //用户树苗信息
   async getUsersTreeList(status){
       let api = '/mining/user/miner/query'
       let requestdata = {status:status,pageIndex:1,pageSize:100,uuid:lib.User.uuid(),token:lib.User.token(),uid:lib.User.uid(),diamondCurrency:174}
       let method = 'GET'       
       let data
       try{
           data = await this.D3MetaVerseRequest(api,requestdata,method,true)
       }catch(err){
           throw err
       }
       
       return data.attachment
   },
   //根据type查询用户nft
   getUserNFTbyType: async function(type){
       let api = '/nft/queryUserAllNftsByType'
       let requestdata = {type: type, uid: lib.User.uid(), uuid: lib.User.uuid(), token: lib.User.token()}
       let method = 'GET'
       
       //如果没有传递type，则使用用户ntf数据查询接口
       if(!type){
           api = '/nft/querynfts'
           requestdata = {uid: lib.User.uid(), uuid: lib.User.uuid(), token: lib.User.token()}           
       }
       
       let data
       try{
           data = await this.D3MetaVerseRequest(api,requestdata,method)
       }catch(err){
           throw err
       }
              
       let nft = data.attachment;
       return nft;
   },
   //根据type查询信息
   getTypeInfo: async function(type){
       let typeinfo = null;
       
       //判断是否存在于缓存中
       let typeinfolist = uni.getStorageSync("TypeInfoList");
       if(!typeinfolist) typeinfolist = [];
       
       for(let info of typeinfolist){
           if(info && info.type==type){
               return info;
           }
       }
       //console.log(typeinfolist)
       
       let api = '/nft/querytypebyType'
       let requestdata = {type: type, uid: lib.User.uid(), uuid: lib.User.uuid(), token: lib.User.token()}
       let method = 'GET'
       let data
       try{
           data = await this.D3MetaVerseRequest(api,requestdata,method)
           //console.log(data)
       }catch(err){
           throw err
       }
       
        typeinfo = data.attachment
        typeinfolist.push(typeinfo);
        uni.setStorageSync("TypeInfoList",typeinfolist);
        
        return typeinfo;
   },
   //跳转到浏览页
   gotoWebView(url){
       url = encodeURIComponent(url)
       uni.navigateTo({
           url:'/pages/webview/webview?url='+url
       })
   },
   //跳转到登录页
   gotoLogin(url){
       url = encodeURIComponent(url)
       uni.navigateTo({
           url:'/pages/login/login?url='+url
       })
   },
   //特定请求
   D3MetaVerseRequest: async function(api,requestdata,method,isMiningAPI,url){
       let nft = [];
       let header = {
          'content-type': 'application/x-www-form-urlencoded',
          'commapp': '1100' ,
          'commappversion':'2.3.6',
          'commlocale':'zh_CN',
          'commuid':lib.User.uid(),
          'commuuid':lib.User.uuid(),
          'commdiamond':'174',
          'commdid':'deviceUuidCommon',
          'commmodel':'web-model',
          'commos':'web-os,android,ios',
       }
       if(isMiningAPI){
           let res = await lib.computeSign(requestdata)
           header['authorization'] = res.Authorization
           header['timestamp'] = res.Timestamp 
           header['nonce'] = res.Nonce 
       }
       
       var [err, res] = await uni.request({
           url: RequestUrl+api, 
           data: requestdata,
           header: header,
           method: method
       });
	   
	   console.log('api',api)
	   console.log('[err, res]',[err, res])
       
       if(err) throw err
       
       let data = res.data;
       if(data.status!=200){
           if(data.message.indexOf('token')!=-1 || data.message.indexOf('参数为空')!=-1){
               //清空数据
               uni.removeStorageSync('phone');
               uni.removeStorageSync('uname');
               uni.removeStorageSync('uid');
               uni.removeStorageSync('uuid');
               uni.removeStorageSync('token');
               
               
           }
            throw data.message;
       }

       return data
   },
   gotoThePage(url){
       uni.navigateTo({
           url: url
       })
   }
}