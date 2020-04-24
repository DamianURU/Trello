import React from 'react'
import styled from "styled-components";
import axios from 'axios';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import Mainboard from "./mainboard"

class ProjectManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: []
            }
        }
    componentDidMount()
    {
        axios.get('http://localhost:9999/projects/userProjects')
        .then(res => {
            const projects = res.data;
            this.setState({projects});
        })
    }

    editDescription() {
        console.log("true")
    }

    render()
    {
        return (
            <div className="App">
                <div>
                    <table>
                        <tbody>
                            <TR>
                                <TH>Your Projects</TH>
                                <TH>Description</TH>    
                            </TR>
                            {
                            this.state.projects.map(project => 
                                <TR>
                                    <A href={'http://localhost:3000/home/projects/mainboard/' + project._id}>
                                        <TD>
                                            {project.name}
                                        </TD>
                                    </A>
                                        <TD>
                                            {project.description}
                                        </TD>
                                        <Button onClick={this.editDescription}>
                                            Edit Description
                                        </Button>
                                </TR>)
                            }
                        </tbody>
                    </table>
                </div>
                    <Switch>
                        <Route path="/home/projects/mainboard/">
                            <Mainboard/>
                        </Route>
                    </Switch>
            </div>
        );
    }
}
export default ProjectManager;

const A = styled.a`
`;

const Form = styled.form`
  background-color: #2d3436;
  justify-content: space-between;
  display: block;
`;

const TH = styled.th`
`;

const TD = styled.td`
background-color: #2d3436;
border-radius: 5px;
`;

const TR = styled.tr`
`;

const Input = styled.input`
    display: block;
    font-size: 2rem;
    border: none;
    border-radius: 20px;
    outline: none;
    position: relative;
    margin: 0 auto;
    margin-top: 10px;
    margin-bottom: 10px;
    width: 100%;
    padding: 2%;
`;

const Button = styled.button`
    display: block;
    border: none;
    border-radius: 20px;
    outline: none;
    position: relative;
    text-align: center;
    padding: 6px;
    align-self: center;
    font-size: 2rem;
`;  