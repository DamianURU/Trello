import ProjectManager from "./projectmanager.component"
import React from 'react';
import styled from "styled-components";
import { useSpring, animated } from "react-spring";

const ProjectContainer = (props) => {
    const barAnimation = useSpring({
      from: { transform: 'translate3d(0, -30rem, 0)' },
      transform: 'translate3d(0, 10rem, 0)',
    });
    

return (
        <>
        <Home1 style={barAnimation}>
            <HomeContainer>
            <h1> Select a Project </h1>
            <h4> Click a Project's name to edit it.</h4>
            </HomeContainer>
        </Home1>
        <MainProjectsContainer style={barAnimation}>
        <ProjectManager/>
        </MainProjectsContainer>
        </>
    )
}
  
  export default ProjectContainer 

  const Home1 = styled(animated.nav)`
  top: 0;
  margin: 0 auto;
  z-index: 10;
  font-size: 4rem;
  border-radius: 20px; 
`;

const HomeContainer = styled.div`
  text-align: center;
  margin: 0 auto;
  padding: 20px;
  justify-content: space-between;
  border-radius: 20px;
  height: 100%;
  width: 100%;
`;

const MainProjectsContainer = styled(animated.nav)`
  font-size: 3rem;
`;