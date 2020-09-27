import { LOGIN_URL,THIRD_PARTY_LOGIN_URL } from '../../constants/api'

export const login = async (body) => {
    return await fetch(LOGIN_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    }).then(response => response.json())
    .catch(error=>{throw(new Error(error))})
}
export const thirdPartyLogin = async(body)=>{
  
    return await fetch(THIRD_PARTY_LOGIN_URL,{
        method:"POST",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    }).then(response => response.json())
    .catch(error=>{throw(new Error(error))})
    
}