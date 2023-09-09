import http from '@/util/http'

/** api */
export default {
    adminLogin(param) { return http.post('/admin/login', param)},
    adminMenu(param) { return http.get('/admin/menu', param)},

    getAdminList(param, query) { return http.get('/admin/list' + (query ? '?' + query : ''), param)},
    updateAdmin(param) { return http.post('/admin/update', param)},
    updateAdminStatus(param) { return http.post('/admin/update_status', param)},
    resetAdminPwd(param) { return http.post('/admin/reset_pwd', param)},

    getRoleList(param, query) { return http.get('/admin/role/list' + (query ? '?' + query : ''), param)},
    updateRole(param) { return http.post('/admin/role_update', param)},
    updateRoleStatus(param) { return http.post('/admin/role_update_status', param)},

    updateRolePermission(param) { return http.post('/admin/role_permission_update', param)},
    getRolePermission(param) { return http.get('/admin/role_permission/' + param.id )},
    getAllPermission(param) { return http.get('/admin/all_permission/')},
}