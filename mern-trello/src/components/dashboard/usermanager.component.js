import React from 'react'
import styled from "styled-components";
import axios from 'axios';

class UserManager extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state =
        {
            username: '',
            email: '',
            pass: '',
            name: '',
            lastname: '',
            success: false,   
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

    handleSubmit(e)
    {
        e.preventDefault();
        const user = {
            username: this.state.username,
            email: this.state.email,
            pass: this.state.pass,
            name: this.state.name,
            lastname: this.state.lastname
        }
        axios.post('http://localhost:9999/update',user)
        .then(res => res.headers)
    }

    render()
    {
        return (
            <div>
                <h1>Update your information</h1>
                {this.state.success === false &&
                <p className="alert alert-danger" role="alert">
                    {this.state.message}
                </p>}
                {this.state.success === true &&
                <p className="alert alert-success" role="alert">
                    User successfully updated
                </p>}
                {!this.state.success &&
                    <Form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <Input type="text" className="form-control" placeholder="Username" name="username" required onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <Input type="text" className="form-control" placeholder="Email" name="email" required onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <Input type="password" className="form-control" placeholder="Password" name="pass" onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <Input type="text" className="form-control" placeholder="Name" name="name" onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <Input type="text" className="form-control" placeholder="Last Name" name="lastname" onChange={this.handleChange} />
                        </div>
                        <Button type="submit" className="btn btn-primary">Submit</Button>
                    </Form>}
            </div>
        );
    }
 }

export default UserManager;

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