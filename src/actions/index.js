export const updateEmail = (value) => {
    return({
        type : "EMAIL",
        value : value
    })
}

export const updatePassword = (value) => {
    return({
        type   :  "PASSWORD",
        value  :  value
    })
}

export const updateConfirmPassword = (value) => {
    return({
        type   :  "CFMPASSWORD",
        value  :  value
    })
}

export const setError = (value, message) => {
    return({
        type    : "ERROR",
        value   : value,
        message : message
    })
}

export const setLogin = (value, userId, email, vip) => {
    return({
        type    :  "LOGIN",
        value   :   value,
        userId  :   userId,
        email   :   email,
        vip     :   vip
    })
}

export const setServers = (value) => {
    return({
        type    :   "SERVERS",
        value   :   value
    })
}

