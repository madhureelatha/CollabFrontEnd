import { POST_FEEDBACK } from '../../constants/api'

export const postFeedback = async (body) => {
    return await fetch(POST_FEEDBACK, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    }).then(response => response.json())
    .catch(error=>{throw(new Error("Unable to send feedback. Please try again"))})
}