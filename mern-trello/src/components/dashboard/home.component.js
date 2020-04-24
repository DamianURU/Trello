import React, { Component } from 'react'
import { BrowserRouter as Router, Route} from "react-router-dom";
import axios from "axios"
//import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from "../dashboardnavbar/navbar.component";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navbarOpen: false,// <-- initialize the signup state as false
    }
  }

  handleNavbar = () =>  {
    this.setState({navbarOpen: !this.state.navbarOpen});
  }

checkLoginStatus(){
  axios.defaults.withCredentials = true;
  axios.get("http://localhost:9999/home",{
    headers:{
      withCredentials: true
    }
  })
  .then(res => {
    console.log(res)
    if(res.status === 201) {
    console.log("201 - no session")
    window.location.replace("http://localhost:3000/")
    }else{
    console.log("everything fine")
    }
  })
}


render(){
  this.checkLoginStatus()
  return (
    <>
    <Route path="/home" component={Navbar}>
    <Router>
      <Navbar 
        navbarState ={this.state.navbarOpen}
        handleNavbar={this.handleNavbar}
      />
      <br/>
      </Router>
      </Route>
    </>
    );
  }
}

export default Main;