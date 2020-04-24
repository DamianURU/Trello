import React from 'react'
//import styled from "styled-components";
import axios from 'axios';


class Logout extends React.Component
{
    componentDidMount()
    {
        axios.defaults.withCredentials = true;
        return axios.get('http://localhost:9999/logout',{
            headers:{
              withCredentials: true
            }
          }).then(res => {
              console.log(res)
              if (res.status === 200){
                return window.location.replace('http://localhost:3000')
              }else{
                  console.alert("Login Unsuccessful")
              }
          })
    }
    render()
    {
        return (
            <div>
            X D
            </div>
        );
    }
 }

export default Logout;