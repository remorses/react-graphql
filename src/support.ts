import decodeJwt from 'jwt-decode'
import { LOCAL_STORAGE_TOKEN_KEY } from './constants'

export const getUserId = () => {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)
    if (token) {
        const { user_id } = decodeJwt(token)
        return user_id
    }
}

export const clearJwt = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY)
}

export const setJwt = (jwt: string) => {
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, jwt)
}
