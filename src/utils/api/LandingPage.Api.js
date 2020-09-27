import { API_SHORTEN_URL } from '../../constants/api'

export const shortenTheUrl = async (body) => {
    return await fetch(API_SHORTEN_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    }).then(response => response.json())
    .catch(error=>{throw(new Error("Failed to generate URL"))})

}