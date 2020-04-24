import React from 'react'
import styled from "styled-components";
import { useSpring, animated, config } from "react-spring";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"; 
import Brand from "./Brand";
import BurgerMenu from "./BurgerMenu";
import CollapseMenu from "./CollapseMenu";
import UserManagerContainer from "../dashboard/usermanager.container.js"
import NewProjectContainer from "../dashboard/newproject.container.js"
import Logout from "../dashboard/logout.js"
import ProjectManagerContainer from "../dashboard/projectmanager.container.js"


const Navbar = (props) => {
  const barAnimation = useSpring({
    from: { transform: 'translate3d(0, -10rem, 0)' },
    transform: 'translate3d(0, 0, 0)',
  });

  const linkAnimation = useSpring({
    from: { transform: 'translate3d(0, 30px, 0)', opacity: 0 },
    to: { transform: 'translate3d(0, 0, 0)', opacity: 1 },
    delay: 800,
    config: config.wobbly,
  });

  const MainDiv  = (props) => {
    const barAnimation = useSpring({
      from: { transform: 'translate3d(0, -30rem, 0)' },
      transform: 'translate3d(0, 10rem, 0)',
    });
    
  return (
      <>
        <Text style={barAnimation}>
            <TextContainer>
                Welcome.
            </TextContainer>
        </Text>
      </>
  )
}

  return (
    <>
      <Router>
      <NavBar style={barAnimation}>
        <FlexContainer>
          <Brand></Brand>
          <NavLinks style={linkAnimation}>
          <Link to="/home/new">New Project +</Link>
          <Link to="/home/projects">Projects</Link>
          <Link to="/home/user">My profile</Link>
          <Link to="/home/logout">Log Out</Link>
          </NavLinks>
          <BurgerWrapper>
            <BurgerMenu
              navbarState={props.navbarState} 
              handleNavbar={props.handleNavbar}
            />
          </BurgerWrapper>
        </FlexContainer>
      </NavBar>
      <CollapseMenu 
        navbarState={props.navbarState} 
        handleNavbar={props.handleNavbar}
      />
        <Switch>
          <Route path="/home/new">
          <NewProjectContainer/>
          </Route>
          <Route path="/home/projects">
          <ProjectManagerContainer/>
          </Route>
          <Route path="/home/user">
          <UserManagerContainer/>
          </Route>
          <Route path="/home/logout">
          <Logout/>
          </Route>
          <Route path="/home">
          <MainDiv/>
          </Route>
        </Switch>
    </Router>
   </>
  )
}

export default Navbar



const NavBar = styled(animated.nav)`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  background: #2d3436;
  z-index: 20;
  font-size: 1.4rem;
`;

const FlexContainer = styled.div`
  max-width: 120rem;
  display: flex;
  margin: auto;
  padding: 0 2rem;;
  justify-content: space-between;
  height: 5rem;
`;

const NavLinks = styled(animated.ul)`
  justify-self: end;
  list-style-type: none;
  margin: auto 0;

  & a {
    color: #dfe6e9;
    text-transform: uppercase;
    font-weight: 600;
    border-bottom: 1px solid transparent;
    margin: 0 1.5rem;
    transition: all 300ms linear 0s;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      color: #fdcb6e;
      border-bottom: 1px solid #fdcb6e;
    }

    @media (max-width: 768px) {
      display: none;
    }
  }
`;

const BurgerWrapper = styled.div`
  margin: auto 0;

  @media (min-width: 769px) {
    display: none;
  }
`;

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