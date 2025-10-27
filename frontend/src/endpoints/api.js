import axios from 'axios'


const BASE_URL = 'https://sermon-tut9.onrender.com/api/'
const LOGIN_URL = `${BASE_URL}token/`
const REFRESH_URL = `${BASE_URL}token/refresh/`
const NOTES_URL = `${BASE_URL}notes/`
const LOGOUT_URL = `${BASE_URL}logout/`
const AUTHENTICATED_URL = `${BASE_URL}authenticated/`
const REGISTER_URL = `${BASE_URL}register/`
const SERMON_URL = `${BASE_URL}sermon/`
const TELEGRAM_AUDIO_URL = `${BASE_URL}telegram_audios/`


export const login = async (username, password) => {
    const response = await axios.post(LOGIN_URL, { username: username, password: password }, { withCredentials: true })
    
    return response.data.success
}
export const refresh_token = async () => {
    try {
        await axios.post(REFRESH_URL, {}, { withCredentials: true })
        return true
    } catch (err) {
        return false
    }
}

export const get_notes = async () => {
    try {
            const response = await axios.get(NOTES_URL, { withCredentials: true })
            return response.data
    } catch (err) {
        return call_refresh(err, axios.get(NOTES_URL, {withCredentials:true}))
        }
}

export const get_sermon = async () => {
    try {
        const response = await axios.get(SERMON_URL, { withCredentials: true })
        return response.data
    } catch (err) {
        return ('No sermon available')
    }
}

export const get_telegram_audios = async () => {
    try {
        const reponse = await axios.get(TELEGRAM_AUDIO_URL, { withCredentials: true })
        return reponse.data
    } catch (err) {
        return ('No telegram Audio Found')
    }
}

const call_refresh = async (err, func) => {
    if (err.response && err.response.status === 401) {
        const tokenRefreshed = await refresh_token();
        
        if (tokenRefreshed) {
            const retryRespose = await func();
            return retryRespose.data
        }
    }
    return false
}

export const logout = async () => {
    try {
        await axios.post(LOGOUT_URL, {}, { withCredentials: true })
        return true
    } catch (err) {
        return false
    }
}

export const is_authenticated = async () => {
    try {
        await axios.post(AUTHENTICATED_URL, {}, { withCredentials: true })
        return true
    } catch (err) {
        return false
    }
}

export const register = async (username, email, password) => {
    const response = axios.post(REGISTER_URL, { username: username, email: email, password: password }, { withCredentials: true }
    )
    return response.data
}
