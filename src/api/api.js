import axios from "axios";

const template = '';

export function apiReg(username, email, password){
    return axios({
        method: 'POST',
        url: 'http://privetdima.xyz:8000/api/register',
        data: {
            username: username,
            password: password,
            email: email
        }
    })
}

export function apiLog(username, password){
    return axios({
        method: 'POST',
        url: 'http://privetdima.xyz:8000/api/login',
        data: {
            username: username,
            password: password,
        }
    })
}

export function apiStreamKey(username){
    return axios({
        method: 'post',
        url: 'http://privetdima.xyz:8000/api/streamkey',
        data: {
            username: username,
        }
    })
}

export function apiStreamName(username, streamName){
    return axios({
        method: 'post',
        url: 'http://privetdima.xyz:8000/api/streamname/',
        data: {
            username: username,
            stream_name: streamName
        }
    })
}


export function apiStreamPool(){
    return axios({
        method: 'get',
        url: 'http://privetdima.xyz:8000/api/streams',
    })
}

export const apiUserInfo = (userName) => {
    return axios({
        method: 'GET',
        url: `http://privetdima.xyz:8000/api/info/${userName}`
    });
}

export const apiUserSubscriptions = (userName) => {
    return axios({
        method: 'GET',
        url: `http://privetdima.xyz:8000/api/subscribe/${userName}`
    });
}

export const apiSubscribe = (fromUser, toUser) => {
    return axios({
        method: 'POST',
        url: `http://privetdima.xyz:8000/api/subscribe/`,
        data: {
            username: fromUser,
            subscribe: toUser
        }
    });
}

export const apiAddMoreUserInfo = (userName, age, country, information) => {
    return axios({
        method: 'POST',
        url: `http://privetdima.xyz:8000/api/info/`,
        data: {
            username : userName,
            age: age,
            country: country,
            information: information
        }
    });
}

export const apiUnsubscribe = (user, fromUser) => {
    return axios({
        method: 'POST',
        url: `http://privetdima.xyz:8000/api/unsubscribe/`,
        data: {
            username: user,
            subscribe: fromUser
        }
    });
}
