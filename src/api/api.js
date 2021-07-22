import axios from "axios";

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