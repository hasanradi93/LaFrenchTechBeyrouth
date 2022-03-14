import { getCookie, removeCookie } from "./CookiesData"
import connect from "./HttpCommon"
class ConnectWithBackend {

    getLatestEvents() {
        return connect.get('api/events/getLatestForVisitors')
    }
    subscribeToEvent(data, id) {
        return connect.post(`api/subscribers/add/${id}`, data)
    }
    getAvailableEvents() {
        return connect.get('api/events/getForVisitors')
    }
    contact(data) {
        return connect.post('/api/contact', data)
    }
    members() {
        return connect.get('api/members')
    }
    login(data) {
        return connect.post('/api/hidden/users/login', data)
    }
    checkIfStillLoggedInAdmin(cookieName) {
        const token = `bearer ${getCookie(cookieName)}`
        const config = {
            headers: { Authorization: token, 'Content-Type': 'application/json', },
        }
        return connect.post('/api/hidden/users/checkLoggedIn', {}, config)
    }
    logout(cookieName) {
        removeCookie(cookieName)
    }
    getForAdmin(cookieName) {
        const token = `bearer ${getCookie(cookieName)}`
        const config = {
            headers: { Authorization: token, 'Content-Type': 'application/json', },
        }
        return connect.get('api/hidden/events/getForAdmin', config)
    }
    deleteEvent(cookieName, id) {
        const token = `bearer ${getCookie(cookieName)}`
        const config = {
            headers: { Authorization: token, 'Content-Type': 'application/json', },
        }
        return connect.delete(`api/hidden/events/${id}`, config)
    }
    searchEvents(cookieName, textSearch) {
        const token = `bearer ${getCookie(cookieName)}`
        const config = {
            headers: { Authorization: token, 'Content-Type': 'application/json', },
        }
        return connect.get(`api/hidden/events/getBySearch?${textSearch}`, config)
    }
}
export default new ConnectWithBackend()