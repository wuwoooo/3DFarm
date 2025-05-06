import global from './global.js'
import md5 from '@/common/md5.min.js'
import CryptoJS from './crypto-js.min.js'

const User = {
	phone: function()
	{
		return uni.getStorageSync("phone");
	},
    name: function()
    {
    	return uni.getStorageSync("name");
    },
	uname: function()
	{
        if(uni.getStorageSync("uname")) return uni.getStorageSync("uname")
        else{
            let mobile = uni.getStorageSync("phone")
            if(mobile) return mobile.substr(0,3)+'****'+mobile.substr(7,4)
        } 
	},
	uid: function()
	{
		return uni.getStorageSync("uid");
	},
	uuid: function()
	{
		return uni.getStorageSync("uuid");
	},
	token: function()
	{
		return uni.getStorageSync("token");
	},
	point: function()
	{
		return uni.getStorageSync("point");
	},
	isShow: function()
	{
		return uni.getStorageSync("isShow");
	},
	activityness: function(){
		return uni.getStorageSync("activityness");
	},
	minerActivityness: function(){
		return uni.getStorageSync("minerActivityness");
	},
    promotionActivityness: function(){
        return uni.getStorageSync("promotionActivityness");
    },
	reputation: function(){
	    return uni.getStorageSync("reputation");
	},
    contribution: function(){
        return uni.getStorageSync("contribution");
    },
    level: function(){
        return uni.getStorageSync("level");
    },
    treeGrade: function(){
        return uni.getStorageSync("treeGrade");
    },
    activeSeeds: function(){
        return uni.getStorageSync("activeSeeds");
    },
    actionType: function(){
        return uni.getStorageSync("actionType");
    },
    actionTimeLeft: function(){
        return uni.getStorageSync("actionTimeLeft");
    },
    code:function(){
        return uni.getStorageSync("code");
    },
}

function generateNonce() {
  //let array = new Uint32Array(1)
  //window.crypto.getRandomValues(array)

  //return array[0]
  return Math.random()*199999
}

async function getSaltSpecS(){
    let key = "saltS"+User.uid()
    let saltS = uni.getStorageSync(key)
    if(!saltS){
        let userinfo = await global.getUserInfo()
        saltS = userinfo.s
        uni.setStorageSync(key,saltS)
    }
    return saltS
}

export default {
	User,
    computeSign: async function(config) {
      let result = {
        Timestamp: (new Date()).getTime(),
        Nonce: generateNonce()
      }
      let params = JSON.parse(JSON.stringify(config))
      params.Timestamp = result.Timestamp
      params.Nonce = result.Nonce
    
      let queryString = ''
      Object.keys(params).sort().map(key => {
        queryString += queryString === '' ? `${key}=${params[key]}` : `&${key}=${params[key]}`
      })
      //console.log('params', params)
      //console.log('queryString', queryString)
      
      let saltS = await getSaltSpecS()
      let signString = encodeURIComponent(queryString)
      let salt = `${global.clientSalt}_${saltS}`
      //console.log(salt)
      let key = `${params.uid}_${params.token}_${salt}`
      let hash = CryptoJS.HmacSHA256(signString, key)
      //console.log(hash)
      let hashString = hash.toString()
      let signFromString = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(hashString))
      result.Authorization = signFromString
      // result.Authorization = signFromByte
    
      return result
    },
}