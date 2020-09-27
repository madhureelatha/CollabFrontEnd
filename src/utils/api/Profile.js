import { DEFAULT_SETTINGS, SET_DEFAULT_SETTINGS, GET_PROFILE_DETAILS } from '../../constants/api'

export const getDefaultSettings = async () => {
    let token = await localStorage.getItem('token')
    return await fetch(DEFAULT_SETTINGS, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token ? token.toString() : ""
        },
    }).then(response => response.json())
        .catch(error => {
            throw error
        }
        )
}

export const setDefaultSettings = async (body) => {
    let token = await localStorage.getItem('token')
    return await fetch(SET_DEFAULT_SETTINGS, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token ? token.toString() : ""
        },
        body: JSON.stringify(body)
    }).then(response => response.json())
        .catch(error => {
            throw error
        }
        )
}


export const getProfileDetails = async () => {
    let token = await localStorage.getItem('token')
    return await fetch(GET_PROFILE_DETAILS, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token ? token.toString() : ""
        },
    }).then(response => response.json())
        .catch(error => {
            throw error
        }
        )
}