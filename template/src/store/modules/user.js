const state = {
	token:'',
	param:undefined,
	setting:{},
	data:undefined,
	urls:[]
}

const mutations = {
	setToken(state,token) {
		return state.token = token;
	},
	setUrls(state,urls) {
		return state.urls = urls;
	},
	setParam(state,param) {
		return state.param = param;
	},
	setCfg(state,setting){//全局配置修改
		state.setting = setting;
	},
	setUser(state,data){
		state.data = data;
	},
}
const getters = {
}
const actions = {
}
module.exports = {
	state,
	mutations,
	getters,
	actions
}