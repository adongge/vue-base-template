const state = {
	showLoading:false,  //全局加载 loading
	loadType:'top',
	loadText:'',//上传时用于显示百分比
	partLoading:false // 局部loading
}

// getters：对数据获取之前的再次编译，可以理解为state的计算属性。组件中使用 $sotre.getters.fun()
const getters = {
	isLoading(state) {
		return state.showLoading;
	}
}
// mutations：修改状态，并且是同步的。在组件中使用$store.commit('',params)。这个和我们组件中的自定义事件类似。
const mutations = {
	SHOW_LOADING(state) {
		state.showLoading = true;
	},
	PART_LOADING(state){
		state.partLoading = true;
	},
	CLOSE_LOADING(state) {
		state.showLoading = false;
		state.partLoading = false;
	},
}
// actions：异步操作。在组件中使用是$store.dispath('')
const actions = {
	showLoading(contaxt) {
		contaxt.commit('SHOW_LOADING')
	},
	partLoading(contaxt) {
		contaxt.commit('PART_LOADING')
	},
	closeLoading(contaxt) {
		contaxt.commit('CLOSE_LOADING')
	},
}

module.exports = {
	state,
	mutations,
	getters,
	actions
}