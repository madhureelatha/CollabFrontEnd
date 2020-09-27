import React, { Component } from 'react'
import '../../App.css'
import './LandingPage.css'
import NavigationBar from '../../controls/navigation-bar/NavigationBar'
import Template from '../Template'
import { toast } from 'react-toastify';
// import ImgLoader from '../../assets/images/loader.svg'
import ImgWorld from '../../assets/world.svg'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';

import {
  Route,
  NavLink,
  BrowserRouter
} from "react-router-dom";


class LandingPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }


    shortenUrl = () => {
        // eslint-disable-next-line
        const expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi
        const regex = new RegExp(expression)
        if (this.props.enteredUrl.match(regex)) {
            let options = {}
            options.url = this.props.enteredUrl
            this.props.getShortenUrl(options)
        }
        else {
            toast.error("Please enter proper URL", {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }

    deleteACard = (cardDetails) => {
        let newLinks = [];
        for (let link of this.props.links) {
            if (link.generatedUrl !== cardDetails.generatedUrl) {
                newLinks.push(link)
            }
        }
        this.props.updateAllLinks(newLinks)
    }

    generatedLinksCard = (cardDetails) => {
        return (
            <div className="generated-links-card">
                <div className="generated-links-card-container">
                    <div className="entered-url-info">{cardDetails.enteredUrl}</div>
                    <div className="shortened-url-div">
                        <div className="shortened-url-text" onClick={()=>{window.open(cardDetails.generatedUrl)}}>{cardDetails.generatedUrl ? cardDetails.generatedUrl : ""}</div>
                        <i className="far fa-clipboard" onClick={() => { this.props.copyToClipBoard(cardDetails.generatedUrl) }}></i>
                    </div>
                    <i class="far fa-times-circle circle-landing" onClick={() => { this.deleteACard(cardDetails) }}></i>
                </div>
            </div>
        )
    }

    render() {
        return (
            <BrowserRouter>	
            <div className="App">
                <div className="first-part">
                    <NavigationBar />
                    <div className="header-div row">
                        <img src={ImgWorld} alt="world" style={{ height: "45vh", width: "50%" }} className="col-md-6 col-sm-6 col-12" />
                        <div className="intro-div col-md-6 col-sm-6 col-12">
                            <div className="intro-text-div">
                                <div className="intro-div-left">
                                    <div className="intro-heading">Collab</div>
                                    <div className="intro-text">With SHYLNK in hands, shorten, protect,
                                     customize, share your links or secret messages
                                     and much more.</div>
                                    <div className="get-started-button" >GET STARTED</div>
                                    <NavLink exact to="/trends">Chart with Index / Data Label</NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <AllRightReserved />
                <Col xl={{ span: 7, offset: 3 }} lg={{ span: 8, offset: 3 }} xs={{ span: 8, offset: 2 }}>
                <Container>
                    <div className="content">
                        <Route exact path="/trends" component={Template}/>

                        <Route exact path="/" component={LandingPage}/>

                    </div>
                </Container>
                </Col>
            </div >
            </BrowserRouter>	
            	
        )
    }

}

class AllRightReserved extends Component{
    render(){
        return(
            <div className="all-rights-reserved">
               ©All Rights Reserved
            </div>
        )
    }
}

export default LandingPage
