import { REGISTER_URL } from '../../constants/api'

export const registerUser = async (body) => {
    return await fetch(REGISTER_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    }).then(response => response.json())
    .catch(error=>{throw(new Error("Unable to register. Please try again"))})
}