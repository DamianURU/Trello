import React from 'react'
import styled from "styled-components";
import axios from 'axios';

class NewProjectManager extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state =
        {
            name: '',
            description: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event)
    {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({ [name]: value });
    
        return true;
    }

    componentDidMount(){
        console.log(this.state.sessionID)
    }



    handleSubmit(e)
    {
        e.preventDefault();
        const project = {
            name: this.state.name,
            description: this.state.description
        }
        axios.post('http://localhost:9999/projects/createProject',project)
        .then(res => res.headers)
    }

    render()
    {
        return (
            <div>
                <h1>Create a new Project</h1>
                {this.state.success === false &&
                <p className="alert alert-danger" role="alert">
                    {this.state.message}
                </p>}
                {this.state.success === true &&
                <p className="alert alert-success" role="alert">
                    User successfully registered
                </p>}
                {!this.state.success &&
                    <Form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <Input type="text" className="form-control" placeholder="Project's Name" name="name" required onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <Input type="text" className="form-control" placeholder="Project's Description" name="description" required onChange={this.handleChange} />
                        </div>
                        <Button type="submit" className="btn btn-primary">Create</Button>
                    </Form>}
            </div>
        );
    }
 }

export default NewProjectManager;

const Form = styled.form`
  background-color: #2d3436;
  justify-content: space-between;
  display: block;
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
    width: 10%;
    padding: 6px;
    align-self: center;
    margin: 0 auto;
`;  