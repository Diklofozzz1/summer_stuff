import React from "react";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { Link as Scroll } from 'react-scroll'
import {IconButton} from "@material-ui/core";

import { MenuAppBar } from '../../component/AppBar/AppBar';


export default class StreamPage extends React.Component {
    render(){
        return(
            <div>
                <MenuAppBar parent = {this} />
                <div style={{textAlign: 'center',}}>

                    <h1 style={{fontSize:'3rem',}}>Добро пожаловать на <span style={{color: '#3f50b6'}}>KEKW.tv</span><br />
                        <span style={{fontSize:'2rem',}}>Смотрите трансляции онлайн вместе с нами!</span>
                    </h1>

                    <Scroll to="stream-online" smooth={true}>
                        <IconButton>
                            <ArrowDownwardIcon />
                        </IconButton>
                    </Scroll>

                </div>
            </div>
        )
    }
}