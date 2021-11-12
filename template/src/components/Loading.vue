<template>
    <div>
      <div v-if="show" :id="id" class="loading" :style="loadStyle" ></div>
      <section v-if="show && type== 'full'" class="full-load">
        <div class="text">{{text}}</div>
        <div class="load">
          <div>L</div><div>O</div><div>A</div><div>D</div><div>I</div><div>N</div><div>G</div>
        </div>
      </section>
    </div>
</template>

<script>
//统一加载样式
export default {
  name: "loading",
  props: {
    id: { type: String },
    show: { type: Boolean },
    type: {type:String},//加载类型，默认顶部加载进度条，full 全屏加载
    text: {type:String,default:''}//加载时显示文字内容
  },
  data() {
    return {
      w: 0,
      loadStyle: { width: this.w + "%" },
      myshow: false
    };
  },
  methods: {},
  watch: {
    show: function(val, old) {//监听变化
      let _this = this;
      if (val != old) {
        _this.w = 0;
        _this.loadStyle = { width: _this.w + "%" };
        let clearInt = setInterval(function() {
          _this.w = _this.w + 10;
          _this.loadStyle = { width: _this.w + "%" };
          if (_this.w > 100) {
            clearInterval(clearInt);
            _this.w = 0;
          }
        }, 50);
      } else if (val === false && this.w > 0) {
        _this.loadStyle = { width: "0%" };
      }
    }
  }
};
</script>

<style scoped>
.loading {
  top: 0;
  left: 0;
  height:1px;
  padding:1px;
  background:rgba(255,0,0,0.6);
  position: fixed;
  z-index:999;
  -webkit-background-size: 30px 30px; 
  -moz-background-size: 30px 30px; 
  background-size: 30px 30px;
  background-image: -webkit-gradient(linear, left top, right bottom, 
  color-stop(.25, rgba(255, 255, 255, .35)), color-stop(.25, transparent), 
  color-stop(.5, transparent), color-stop(.5, rgba(255, 255, 255, .35)), 
  color-stop(.75, rgba(255, 255, 255, .35)), color-stop(.75, transparent), 
  to(transparent));
  background-image: -webkit-linear-gradient(135deg, rgba(255, 255, 255, .35) 25%, transparent 25%, 
  transparent 50%, rgba(255, 255, 255, .35) 50%, rgba(255, 255, 255, .35) 75%, 
  transparent 75%, transparent); 
  background-image: -moz-linear-gradient(135deg, rgba(255, 255, 255, .35) 25%, transparent 25%, 
  transparent 50%, rgba(255, 255, 255, .35) 50%, rgba(255, 255, 255, .35) 75%, 
  transparent 75%, transparent); 
  background-image: -ms-linear-gradient(135deg, rgba(255, 255, 255, .35) 25%, transparent 25%, 
  transparent 50%, rgba(255, 255, 255, .35) 50%, rgba(255, 255, 255, .35) 75%, 
  transparent 75%, transparent); 
  background-image: -o-linear-gradient(135deg, rgba(255, 255, 255, .35) 25%, transparent 25%, 
  transparent 50%, rgba(255, 255, 255, .35) 50%, rgba(255, 255, 255, .35) 75%, 
  transparent 75%, transparent); 
  background-image: linear-gradient(135deg, rgba(255, 255, 255, .35) 25%, transparent 25%, 
  transparent 50%, rgba(255, 255, 255, .35) 50%, rgba(255, 255, 255, .35) 75%, 
  transparent 75%, transparent);
  animation:animate-stripes .25s linear infinite; 
  -webkit-animation:animate-stripes .25s linear infinite; 
  -moz-animation:animate-stripes .25s linear infinite; 
} 
@keyframes animate-stripes { 
  0% {background-position: 0 0;} 
  100% {background-position: 30px 0;} 
}
@-webkit-keyframes animate-stripes { 
  0% {background-position: 0 0;} 
  100% {background-position: 30px 0;} 
} 
@-moz-keyframes animate-stripes { 
  0% {background-position: 0 0;} 
  100% {background-position: 30px 0;} 
}
.full-load {
  width:100%;height:100%;background:rgba(0,0,0,0.8);position:fixed;top:0;left:0;z-index:1000;
}
.full-load .text{
  text-align:center;color:#35C4F0;    
  position:absolute; width:600px; height:36px; left:50%;top:230px; margin-left:-300px; overflow:visible;
}
.full-load .load {
  position:absolute; width:600px; height:36px; left:50%; top:200px; margin-left:-300px; overflow:visible;
  user-select:none; -webkit-user-select:none; -moz-user-select:none; -ms-user-select:none;
}
.full-load .load div {
  width:20px; height:36px; position:absolute; opacity:0; color:#35C4F0;
  animation:move 2s linear infinite; -moz-animation:move 2s linear infinite; -webkit-animation:move 2s linear infinite;
  transform:rotate(180deg); -moz-transform:rotate(180deg); -webkit-transform:rotate(180deg);
}
.full-load .load div:nth-child(2) {animation-delay:0.2s; -moz-animation-delay:0.2s; -webkit-animation-delay:0.2s;}
.full-load .load div:nth-child(3) {animation-delay:0.4s; -webkit-animation-delay:0.4s;}
.full-load .load div:nth-child(4) {animation-delay:0.6s; -moz-animation-delay:0.6s; -webkit-animation-delay:0.6s;}
.full-load .load div:nth-child(5) {animation-delay:0.8s; -moz-animation-delay:0.8s; -webkit-animation-delay:0.8s;}
.full-load .load div:nth-child(6) {animation-delay:1s; -moz-animation-delay:1s; -webkit-animation-delay:1s;}
.full-load .load div:nth-child(7) {animation-delay:1.2s; -moz-animation-delay:1.2s; -webkit-animation-delay:1.2s;}
@keyframes move {
  0% {right:0; opacity:0;}
  35% {right:41%; opacity:1; transform:rotate(0deg);}
  65% {right:59%; opacity:1; transform:rotate(0deg);}
  100% {right:100%; opacity:0; transform:rotate(-180deg);}
}

@-moz-keyframes move {
  0% {right:0; opacity:0;}
  35% {right:41%; opacity:1; -moz-transform:rotate(0deg);}
  65% {right:59%; opacity:1; -moz-transform:rotate(0deg);}
  100% {right:100%; opacity:0; -moz-transform:rotate(-180deg);}
}

@-webkit-keyframes move {
  0% {right:0; opacity:0;}
  35% {right:41%; opacity:1; -webkit-transform:rotate(0deg);}
  65% {right:59%; opacity:1; -webkit-transform:rotate(0deg);}
  100% {right:100%; opacity:0; -webkit-transform:rotate(-180deg);}
}

</style>