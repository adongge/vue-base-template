import http from '@/util/http'

/** api */
export default {
    login(param) { return http.post('/api/login', param) },
    getData(param) { return http.post('/api/company', param) },
    updateStatus(param) { return http.post('/api/update', param) },
    todo(param) { return http.post('/api/todo', param) },
    updateLocation(param) { return http.post('/api/location', param) },
}