import React from "react";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { Link as Scroll } from 'react-scroll'
import {IconButton} from "@material-ui/core";

import { MenuAppBar } from '../../component/AppBar/AppBar';
import StreamCard from '../../component/StreamCard/StreamCard'
import {cookie} from "../../endpoint/cookie";


export default class StreamPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [],
        }
    }

    async componentDidMount(){
        let cards = []
        for(let i=0; i<1; i++){
            cards.push(<StreamCard userName={'huila'+i} streamName={'balbalblablablabl'}/>)
        }
        this.setState({
            cards: cards
        })
    }


    render(){
        console.log(`streamOnline: ${cookie.get('username')}`);
        console.log(`streamOnlineAuth: ${cookie.get('isAuth')}`);

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

                <div id="stream-online" style={{minHeight:'50vh',
                                                display:'flex',
                                                flexWrap: "wrap",
                                                justifyContent:'center',
                                                alignItems:'center',}}>
                    {this.state.cards}
                </div>

            </div>
        )
    }
}