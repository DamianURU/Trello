import UserManager from "./usermanager.component"
import React from 'react';
import styled from "styled-components";
import { useSpring, animated } from "react-spring";

const UserManagerContainer= (props) => {
    const barAnimation = useSpring({
      from: { transform: 'translate3d(0, -30rem, 0)' },
      transform: 'translate3d(0, 10rem, 0)',
    });
    

return (
        <>
        <Home1 style={barAnimation}>
            <HomeContainer>
            <div> Update your info. </div>
            <UserManager/>
            </HomeContainer>
        </Home1>
        </>
    )
}
  
  export default UserManagerContainer

  const Home1 = styled(animated.nav)`
  width: 66%;
  top: 0;
  margin: 0 auto;
  background: #2d3436;
  z-index: 10;
  font-size: 4rem;
  border-radius: 20px; 
  height: 65%;x
`;

const HomeContainer = styled.div`
  background-color: #2d3436;
  margin: 0 auto;
  padding: 20px;
  justify-content: space-between;
  border-radius: 20px;
  height: 100%;
  width: 100%;
`;

