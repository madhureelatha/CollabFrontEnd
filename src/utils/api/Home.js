import { GET_CATEGORIES,ACTIVE_GROUPS_COUNT  } from '../../constants/api'

export const getCategories = async (body) => {
    // let token = await localStorage.getItem('token')
    return await fetch(GET_CATEGORIES, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            // "Authorization": token ? token.toString() : ""
        }
    }).then(response => response.json())
        .catch(error => {
            throw error
        }
        )
}

export const getActiveGroups= async (categoryId) => {
    // let token = await localStorage.getItem('token')

    if (categoryId) {
        body = {
            "category_id": category_id,
        }
    }
    return await fetch(ACTIVE_GROUPS_COUNT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }
    }).then(response => response.json())
        .catch(error => {
            throw error
        }
        )
}

// export const getActiveGroups=async(body)=>{
//     return await fetch(USER_URL_STATS_URL, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             // "Authorization": token ? token.toString() : ""
//         }
//     }).then(response => response.json())
//         .catch(error => {
//             throw error
//         }
//         )
// }

// export const getUserUrl = async (pageNumber) => {
//     let token = await localStorage.getItem('token')
//     let body = {}
//     if (pageNumber) {
//         body = {
//             "page_no": pageNumber,
//             "limit": 10,
//         }
//     }
//     return await fetch(USER_URLS, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": token ? token.toString() : ""
//         },
//         body: JSON.stringify(body)
//     },
//     ).then(response => response.json())
//         .catch(error => {
//             throw error
//         }
//         )
// }

// export const getSpecificUrlStats = async (body) => {
//     let token = await localStorage.getItem('token')
//     return await fetch(URL_STATS, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": token ? token.toString() : ""
//         },
//         body: JSON.stringify(body)
//     }).then(response => response.json())
//         .catch(error => {
//             throw error
//         }
//         )
// }

// export const shortenUserSpecificUrl = async (body) => {
//     let token = await localStorage.getItem('token')
//     return await fetch(API_SHORTEN_URL, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": token ? token.toString() : ""
//         },
//         body: JSON.stringify(body)
//     }).then(response => response.json())
//         .catch(error => { throw (new Error("Failed to generate URL")) })

// }

// export const shareSecret = async (body) => {
//     let token = await localStorage.getItem('token')
//     return await fetch(SHARE_SECRET, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": token ? token.toString() : ""
//         },
//         body: JSON.stringify(body)
//     }).then(response => response.json())
//         .catch(error => { throw (new Error("Failed to generate URL")) })

// }