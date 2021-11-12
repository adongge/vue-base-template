<template>
  <div id="app">
    <router-view/>
    <loading id="loading" :show="this.$store.state.common.showLoading" ></loading>
  </div>
</template>

<script>
import loading from "@/components/Loading";//顶部 loading

export default {
  name: 'App',
  components: {loading}
}
</script>

<style>
.el-loading-mask{position:fixed;left:0px;top:0px;width:100%;height:100%;}
</style>
