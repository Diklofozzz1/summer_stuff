import React from "react";
import { MenuAppBar } from '../../component/AppBar/AppBar';
import qs from 'qs';

const errors = {
    401: {
        description: 'User no authorized'
    },
    403: {
        description: 'Request page forbidden for you'
    },
    404: {
        description: 'Request page not found'
    }
}

export default function ErrorPage(props) {
    const errorCode = qs.parse(props.location.search, {ignoreQueryPrefix: true}).error;
    let   errorDescription = '';

    try {
        errorDescription = errors[errorCode].description;
    } catch(_) {
        errorDescription = 'Uuups... Something went wrong! Sorry'
    }

    return (
        <div>
            <MenuAppBar parent = {this} />
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', height: '90vh'}}>
                <div style={{fontSize: 80, color: '#3f50b6'}}><b>{errorCode}</b></div>
                <div style={{fontSize: 50}}>{errorDescription}</div>
            </div>
        </div>
    );
}