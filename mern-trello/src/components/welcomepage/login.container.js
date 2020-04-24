import React from 'react';
import styled from "styled-components";
import Login from "./login.component";
import { useSpring, animated } from "react-spring";

const LoginContainer = (props) => {
    const barAnimation = useSpring({
      from: { transform: 'translate3d(0, -30rem, 0)' },
      transform: 'translate3d(0, 10rem, 0)',
    });
    

return (
        <>
        <Home1 style={barAnimation}>
            <HomeContainer>
            <div> Hello there! </div>
            <Login/>
            </HomeContainer>
        </Home1>
        </>
    )
}
  
  export default LoginContainer

  const Home1 = styled(animated.nav)`
  position: fixed;
  width: 20%;
  top: 0;
  right: 0;
  background: #2d3436;
  z-index: 10;
  font-size: 1.4rem;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;  
  height: 65%;
  width: 30%;
`;

const HomeContainer = styled.div`
  background-color: #2d3436;
  margin: right;
  padding: 20px;
  justify-content: space-between;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  height: 100%;
  width: 100%;
`;

