 function encodeUTF8(s) {
   var i, r = [], c, x;
   for (i = 0; i < s.length; i++)
     if ((c = s.charCodeAt(i)) < 0x80) r.push(c);
     else if (c < 0x800) r.push(0xC0 + (c >> 6 & 0x1F), 0x80 + (c & 0x3F));
     else {
       if ((x = c ^ 0xD800) >> 10 == 0) //对四字节UTF-16转换为Unicode
         c = (x << 10) + (s.charCodeAt(++i) ^ 0xDC00) + 0x10000,
           r.push(0xF0 + (c >> 18 & 0x7), 0x80 + (c >> 12 & 0x3F));
       else r.push(0xE0 + (c >> 12 & 0xF));
       r.push(0x80 + (c >> 6 & 0x3F), 0x80 + (c & 0x3F));
     };
   return r;
 }
 
export default {
 //判断是否为手机号的正则表达式
 IsMobilePhone: function (phones){
    var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    if (!myreg.test(phones)) {
      return false;
    } else {
      return true;
    }
 },
 
 //保留n位小数点
 retain:function(num,decimal){
     num = num.toString();
    let index = num.indexOf('.');
    if(index !== -1){
        num = num.substring(0,decimal + index + 1)
    }else{
        num = num.substring(0)
    }
    return parseFloat(num).toFixed(decimal) 
 },
 
 //截取指定长度字符串（中文为1，字母、数字、符号为0.5）
 subTextLen:function(text,maxlen){
     let pattern = new RegExp("[\u4E00-\u9FA5]+")   //汉字正则表达式
     let len = 0
     let rtnText=''
     for(let s of text){
         if(len>=maxlen) break
         rtnText += s
         if(pattern.test(s)) len += 1
         else len += 0.5
     }
     return rtnText
 },

 //判断人名
 IsUsersName: function(name){
	 var regName = /^[\u4e00-\u9fa5]{2,4}$/;  
	 if(!regName.test(name)){  
	      return false;  
	  }
	  
	  return true;
 },
 
 //判断身份证号码
 IsIDNo: function(idNo){	 
	     var regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  
	     if(!regIdNo.test(idNo)){
	         return false;  
	     }
		 
		 return true;
 },
 
 //阻塞一段时间
 sleep:function(ms) {
     return new Promise(resolve => setTimeout(resolve, ms));
 },
 
 //格式化时间
 formatDate:function(time,format='YY-MM-DD hh:mm:ss'){
 	var date = new Date(time);
 
 	var year = date.getFullYear(),
 		month = date.getMonth()+1,//月份是从0开始的
 		day = date.getDate(),
 		hour = date.getHours(),
 		min = date.getMinutes(),
 		sec = date.getSeconds();
 	var preArr = Array.apply(null,Array(10)).map(function(elem, index) {
 		return '0'+index;
 	}); //开个长度为10的数组 格式为 00 01 02 03
 
 	var newTime = format.replace(/YY/g,year)
 						.replace(/MM/g,preArr[month]||month)
 						.replace(/DD/g,preArr[day]||day)
 						.replace(/hh/g,preArr[hour]||hour)
 						.replace(/mm/g,preArr[min]||min)
 						.replace(/ss/g,preArr[sec]||sec);
 
 	return newTime;			
 },
 
 //判断密码
 CheckPassWord: function(password) {//必须为字母加数字且长度不小于8位
    let v = password
    var numasc = 0;    
    var charasc = 0;
    var otherasc = 0;
    if(0==v.length){
        return false;
    }else if(v.length<8||v.length>16){
        return false;
    }else{
        for (var i = 0; i < v.length; i++) {
            var asciiNumber = v.substr(i, 1).charCodeAt();
            if (asciiNumber >= 48 && asciiNumber <= 57) {
                numasc += 1;
            }
            if ((asciiNumber >= 65 && asciiNumber <= 90)||(asciiNumber >= 97 && asciiNumber <= 122)) {
                charasc += 1;
            }
            if ((asciiNumber >= 33 && asciiNumber <= 47)||(asciiNumber >= 58 && asciiNumber <= 64)||(asciiNumber >= 91 && asciiNumber <= 96)||(asciiNumber >= 123 && asciiNumber <= 126)) {
                otherasc += 1;
            }
        }
        if(0==numasc)  {
            //return "密码必须含有数字";
            return false
        }else if(0==charasc){
            //return "密码必须含有字母";
            return false
        }else if(0==otherasc){
            //return "密码必须含有特殊字符";
            return true
        }else{
            return true;
        }
      }
    },
    
    //复制文本到剪贴板
    copyTxt: function(txt) {//传入要复制的内容
    	if(!txt){
            console.log('no copy')
    		return true;
    	}
        
      // #ifdef APP-PLUS
      uni.setClipboardData({
          data:txt,
      });
      return true
      // #endif
     
      // #ifdef H5
      if (document.queryCommandSupported('copy')) {
          let textarea = document.createElement("textarea")
          textarea.value = txt
          textarea.readOnly = "readOnly"
          document.body.appendChild(textarea)
          textarea.select() // 选中文本内容
          textarea.setSelectionRange(0, txt.length) 
          let result = document.execCommand("copy") 
          textarea.remove()
          
          return true
      }else{
          console.log('not support copy')
          return false
      }
      // #endif  
 },
  
 // 字符串加密成 hex 字符串
 sha1: function(s) {
       var data = new Uint8Array(encodeUTF8(s))
       var i, j, t;
       var l = ((data.length + 8) >>> 6 << 4) + 16, s = new Uint8Array(l << 2);
       s.set(new Uint8Array(data.buffer)), s = new Uint32Array(s.buffer);
       for (t = new DataView(s.buffer), i = 0; i < l; i++)s[i] = t.getUint32(i << 2);
       s[data.length >> 2] |= 0x80 << (24 - (data.length & 3) * 8);
       s[l - 1] = data.length << 3;
       var w = [], f = [
         function () { return m[1] & m[2] | ~m[1] & m[3]; },
         function () { return m[1] ^ m[2] ^ m[3]; },
         function () { return m[1] & m[2] | m[1] & m[3] | m[2] & m[3]; },
         function () { return m[1] ^ m[2] ^ m[3]; }
       ], rol = function (n, c) { return n << c | n >>> (32 - c); },
         k = [1518500249, 1859775393, -1894007588, -899497514],
         m = [1732584193, -271733879, null, null, -1009589776];
       m[2] = ~m[0], m[3] = ~m[1];
       for (i = 0; i < s.length; i += 16) {
         var o = m.slice(0);
         for (j = 0; j < 80; j++)
           w[j] = j < 16 ? s[i + j] : rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1),
             t = rol(m[0], 5) + f[j / 20 | 0]() + m[4] + w[j] + k[j / 20 | 0] | 0,
             m[1] = rol(m[1], 30), m.pop(), m.unshift(t);
         for (j = 0; j < 5; j++)m[j] = m[j] + o[j] | 0;
       };
       t = new DataView(new Uint32Array(m).buffer);
       for (var i = 0; i < 5; i++)m[i] = t.getUint32(i << 2);
     
       var hex = Array.prototype.map.call(new Uint8Array(new Uint32Array(m).buffer), function (e) {
         return (e < 16 ? "0" : "") + e.toString(16);
       }).join("");
       return hex;
 },

}