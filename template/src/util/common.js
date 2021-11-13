import store from '@/store/index'
export default {
    cfmcfg:{confirmButtonText: '确定',cancelButtonText:'取消',type: 'warning'},
    //cookie 操作
    //s20是代表20秒
    //h是指小时，如12小时则是：h12
    //d是天数，30天则：d30
    //setCookie("key","value","s20");
    getCookie(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        arr = document.cookie.match(reg)
        if(arr) {
            return unescape(arr[2]);
        } else {
            return null;
        }
    },
    setCookie(name, value, time) {
        var strsec = this.getsec(time);
        var exp = new Date();
        exp.setTime(exp.getTime() + strsec * 1);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";
    },
    delCookie(name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = this.getCookie(name);
        if (cval != null) {
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + ";path=/";
        }
    },
    getsec(str) {
        if (str == undefined) str = 'd1';
        var str1 = str.substring(1, str.length) * 1;
        var str2 = str.substring(0, 1);
        if (str2 == "s") {
            return str1 * 1000;
        } else if (str2 == "h") {
            return str1 * 60 * 60 * 1000;
        } else if (str2 == "d") {
            return str1 * 24 * 60 * 60 * 1000;
        }
    },
    loading(){
        store.dispatch('partLoading');
    },
    isMobile() {
        let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
        return flag;
    },
    deepClone(obj) {// 深度拷贝
        let o = obj instanceof Array ? [] : {};
        for (let k in obj){
            o[k] = typeof obj[k] === Object ? this.deepClone(obj[k]) : obj[k];
        }  
        return o;
    },
    inArray(search,array) {
        for (var i in array) {
            if (array[i] == search) {
                return true;
            }
        }
        return false;
    },
    delValueArray(value,arr){
        for (let index = 0; index < arr.length; index++) {
            if(arr[index] == value){
                arr = this.delArray(index,arr);
            }
        }
        return arr;
    },
    delArray(n,arr){
        if(n<0){
            return arr;
        }else{
            return arr.slice(0,n).concat(arr.slice(n+1,arr.length));
        }
    },
    // 时间格式化
    formatDate(date, fmt) {
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        let o = {
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds()
        };
        for (let k in o) {
            if (new RegExp(`(${k})`).test(fmt)) {
                let str = o[k] + '';
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : ('00'+str).substr(str.length));
            }
        }
        return fmt;
    }
}
