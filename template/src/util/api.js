import http from '@/util/http'

/** api */
export default {
    login(param) { return http.post('/api/login', param) }
}