import React, { Component } from 'react'
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import { BrowserRouter as Router, Route} from "react-router-dom";
import Navbar from "../welcomenavbar/navbar.component";

const MainDiv  = (props) => {
    const barAnimation = useSpring({
      from: { transform: 'translate3d(0, -30rem, 0)' },
      transform: 'translate3d(0, 10rem, 0)',
    });
  return (
      <>
        <Text style={barAnimation}>
            <TextContainer>
                Coordinate your team to create amazing things.
            </TextContainer>
        </Text>
      </>
  )
}

class Main extends Component {
  state = {
    navbarOpen: false
  }


  handleNavbar = () =>  {
    this.setState({navbarOpen: !this.state.navbarOpen});
  }

  
  handleNavbar = () =>  {
    this.setState({navbarOpen: !this.state.navbarOpen});
  }
  
  render(){
  return (
    <>
    <Route path="/" component={Navbar}>
    <MainDiv/>
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

const Text = styled(animated.nav)`
    z-index: 15;
`;

const TextContainer = styled.div`
    font-size: 660%;
    height: 100%;
    width: 60%;
    margin: auto 0;
    z-index: 15;
    padding: 20px;
`;