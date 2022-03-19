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
    getForChart(cookieName) {
        const token = `bearer ${getCookie(cookieName)}`
        const config = {
            headers: { Authorization: token, 'Content-Type': 'application/json', },
        }
        return connect.get('api/hidden/events/getForChart', config)
    }
    searchEvents(cookieName, textSearch) {
        const token = `bearer ${getCookie(cookieName)}`
        const config = {
            headers: { Authorization: token, 'Content-Type': 'application/json', },
        }
        return connect.get(`api/hidden/events/getBySearch?${textSearch}`, config)
    }
    addEvent(cookieName, data) {
        const token = `bearer ${getCookie(cookieName)}`
        const config = {
            headers: { Authorization: token, 'Content-Type': 'application/json', },
        }
        return connect.post(`api/hidden/events/newOne`, data, config)
    }
    editEvent(cookieName, data, id) {
        const token = `bearer ${getCookie(cookieName)}`
        const config = {
            headers: { Authorization: token, 'Content-Type': 'application/json', },
        }
        return connect.put(`api/hidden/events/${id}`, data, config)
    }
    deleteEvent(cookieName, id) {
        const token = `bearer ${getCookie(cookieName)}`
        const config = {
            headers: { Authorization: token, 'Content-Type': 'application/json', },
        }
        return connect.delete(`api/hidden/events/${id}`, config)
    }
    deletePhotoEvent(cookieName, data, id) {
        const token = `bearer ${getCookie(cookieName)}`
        const config = {
            headers: { Authorization: token, 'Content-Type': 'application/json', },
        }
        return connect.post(`api/hidden/events/deletePhoto/${id}`, data, config)
    }
    addMember(cookieName, data) {
        console.log("Addmember Connect")
        const token = `bearer ${getCookie(cookieName)}`
        const config = {
            headers: { Authorization: token, 'Content-Type': 'application/json', },
        }
        return connect.post(`api/hidden/members`, data, config)
    }
    editMember(cookieName, data, id) {
        console.log("Editdmember Connect")
        const token = `bearer ${getCookie(cookieName)}`
        const config = {
            headers: { Authorization: token, 'Content-Type': 'application/json', },
        }
        return connect.put(`api/hidden/members/${id}`, data, config)
    }
    deleteMember(cookieName, id) {
        console.log("delete memebr Connect")
        const token = `bearer ${getCookie(cookieName)}`
        const config = {
            headers: { Authorization: token, 'Content-Type': 'application/json', },
        }
        return connect.delete(`api/hidden/members/${id}`, config)
    }
    getSubscribers(cookieName) {
        const token = `bearer ${getCookie(cookieName)}`
        const config = {
            headers: { Authorization: token, 'Content-Type': 'application/json', },
        }
        return connect.get('api/hidden/subscribers', config)
    }
    searchSubscribers(cookieName, textSearch) {
        const token = `bearer ${getCookie(cookieName)}`
        const config = {
            headers: { Authorization: token, 'Content-Type': 'application/json', },
        }
        return connect.get(`api/hidden/subscribers/getBySearch?${textSearch}`, config)
    }
    editInitialProfileDataAdmin(cookieName, data, id) {
        const token = `bearer ${getCookie(cookieName)}`
        const config = {
            headers: { Authorization: token, 'Content-Type': 'application/json', },
        }
        return connect.patch(`api/hidden/users/${id}`, data, config)
    }
    editUsernameDataAdmin(cookieName, data, id) {
        const token = `bearer ${getCookie(cookieName)}`
        const config = {
            headers: { Authorization: token, 'Content-Type': 'application/json', },
        }
        return connect.patch(`api/hidden/users/username/${id}`, data, config)
    }
    editEmailDataAdmin(cookieName, data, id) {
        const token = `bearer ${getCookie(cookieName)}`
        const config = {
            headers: { Authorization: token, 'Content-Type': 'application/json', },
        }
        return connect.patch(`api/hidden/users/email/${id}`, data, config)
    }
    editPasswordDataAdmin(cookieName, data, id) {
        const token = `bearer ${getCookie(cookieName)}`
        const config = {
            headers: { Authorization: token, 'Content-Type': 'application/json', },
        }
        return connect.patch(`api/hidden/users/password/${id}`, data, config)
    }
    getCompanyData() {
        return connect.get('api/company')
    }
    getCompanyDataAdmin(cookieName) {
        const token = `bearer ${getCookie(cookieName)}`
        const config = {
            headers: { Authorization: token, 'Content-Type': 'application/json', },
        }
        return connect.get('api/hidden/company', config)
    }
    editCompanyDataAdmin(cookieName, data, id) {
        const token = `bearer ${getCookie(cookieName)}`
        const config = {
            headers: { Authorization: token, 'Content-Type': 'application/json', },
        }
        return connect.patch(`api/hidden/company/${id}`, data, config)
    }
    getMailsData(cookieName) {
        const token = `bearer ${getCookie(cookieName)}`
        const config = {
            headers: { Authorization: token, 'Content-Type': 'application/json', },
        }
        return connect.get('api/hidden/mails', config)
    }
}
export default new ConnectWithBackend()