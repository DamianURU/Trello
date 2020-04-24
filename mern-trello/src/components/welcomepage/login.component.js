import React from 'react'
import styled from "styled-components";
import axios from 'axios';


class Login extends React.Component
{
    constructor(props)
    {
        super(props);
        
        this.state =
        {
            email: '',
            pass: ''
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
            email: this.state.email,
            pass: this.state.pass
        }
        axios.defaults.withCredentials = true;
        return axios.post('http://localhost:9999/',user,{
            headers:{
              withCredentials: true
            }
          }).then(res => {
              console.log(res)
              if (res.status === 200){
                return window.location.replace('./home')
              }else{
                  console.log("Incorrect password.")
              }
          })
    }


    render()
    {
        return (
            <div>
                <h1>Login</h1>
                {this.state.success === false &&
                <p className="alert alert-danger" role="alert">
                    {this.state.message}
                </p>}
                {this.state.success === true &&
                <p className="alert alert-success" role="alert">
                    User successfully Login
                </p>}
                {!this.state.success &&
                    <Form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <Input type="text" className="form-control" placeholder="Email" name="email" required onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <Input type="password" className="form-control" placeholder="Password" name="pass" onChange={this.handleChange} />
                        </div>
                        <Button type="submit" className="btn btn-primary">Login</Button>
                    </Form>}
            </div>
        );
    }
 }

export default Login;

const Form = styled.form`
  background-color: #2d3436;
  justify-content: space-between;
  display: block;
`;

const Input = styled.input`
    display: block;
    border: none;
    border-radius: 20px;
    outline: none;
    z-index: 10;
    position: relative;
    margin: 15px;
    width: 100%;
    padding: 4%;
`;

const Button = styled.button`
    display: block;
    border: none;
    border-radius: 20px;
    outline: none;
    position: relative;
    text-align: center;
    width: 50%;
    padding: 6px;
    align-self: center;
    margin: 0 auto;
`;  