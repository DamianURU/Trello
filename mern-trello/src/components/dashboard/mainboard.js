import React from 'react'
import styled from "styled-components";
import axios from 'axios';

class Mainboard extends React.Component{
    constructor(props){
        super(props);
        this.state={
            project:{},
            projectLists:[],
            projectUsers:[],
            sublist:'',
            sublistdescription:'',
        }
        this.handleChange = this.handleChange.bind(this);
        this.addSublist = this.addSublist.bind(this);
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
        axios.get('http://localhost:9999/projects/getProject')
        .then(res => {
            const project = res.data;
            this.setState({project});
            const projectLists = res.data.lists;
            this.setState({projectLists});
            const projectUsers = res.data.users;
            this.setState({projectUsers});
            console.log(project)
            console.log(projectLists)
            console.log(projectUsers)
        })
    }

    handleChange(event)
    {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({ [name]: value });
    
        return true;
    }

    addSublist(e,arraypos)
    {
        e.preventDefault();
        const sublist = {
            name: this.state.sublist,
            description: this.state.sublistdescription,
            id: this.state.project._id,
            arraypos: arraypos
        }
        axios.defaults.withCredentials = true;
        return axios.post('http://localhost:9999/projects/addSublist',sublist,{
            headers:{
              withCredentials: true
            }
          }).then(res => {
              console.log(res)
              if (res.status === 200){
                return window.location.replace('./home')
              }else{
                  console.alert("Incorrect password.")
              }
          })
    }

   /* componentDidUpdate(){
        axios.get('http://localhost:9999/projects/getProject')
        .then(res => {
            const project = res.data;
            this.setState({project});
            const projectLists = res.data.lists;
            this.setState({projectLists});
            const projectUsers = res.data.users;
            this.setState({projectUsers});
            console.log(project)
            console.log(projectLists)
            console.log(projectUsers)
        })
    }*/

    render(){
        return (<>
        <MainDiv className="app">
            <div>Proyect: {this.state.project.name} - Description: {this.state.project.description}</div>
        </MainDiv>
        <ListContainer>
            {
                this.state.projectLists.map(list =>   
                <Lists>     
                <ListsNames><h1>{list.name}</h1><div><h3>{list.description}</h3></div>
  
                </ListsNames>
                    {list.sublists.map(sub =>
                        <SubContainer><div><h3>{sub.name}</h3></div>
                            <div>{sub.description}</div>
                            <EditSubList>Edit Sublist</EditSubList>
                        </SubContainer>)}

                        <Form onSubmit={()=>this.addSublist(list)}>
                        <div className="form-group">
                            <Input type="text" className="form-control" placeholder="Sublist" name="sublist" required onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <Input type="text" className="form-control" placeholder="Description" name="sublistdescription" onChange={this.handleChange} />
                        </div>
                        <Button type="submit" className="btn btn-primary">Add Sublist</Button>
                        </Form>   

                </Lists>)
            }
        </ListContainer>

        <AddList><h1>+</h1></AddList>

        </>      
        )
    }
}
export default Mainboard;

const MainDiv = styled.div`
  background-color: #2d3436;
  padding: 5px;
  border-radius: 10px;
  margin: 10px;
  color: #FFFFFF;
`;

const A = styled.a`
`;

const Form = styled.form`
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
`
const ListContainer = styled.div`
    display: flex;
    background-color: white;
    color: black;
    padding: 5px;
    border-radius: 10px;
    margin: 10px;
  
`
const Lists = styled.div`
    background-color: #2d3436;
    padding: 5px;
    border-radius: 10px;
    margin: 10px;
`
const ListsNames = styled.div`
    background-color: gray;
    padding: 5px;
    border-radius: 10px;
    margin: 10px;
`
const SubContainer = styled.div`
    background-color: white;
    color: black;
    padding: 5px;
    border-radius: 10px;
    margin: 10px;
`
const UserList = styled.div`
position: -webkit-sticky;
  position: sticky;
  bottom: 1rem; 

`

const AddList = styled.button`
margin: auto;
height: 100px;
width: 100px;
padding: 10px;
border-radius: 10px;
font-size: 2rem;
`
const AddSubList = styled.button`
margin: 0 auto;
padding: 4px;
font-size: 2rem;
border-radius: 10px;
`

const EditList = styled.button`
margin: 0 auto;
padding: 4px;
border-radius: 10px;
`

const EditSubList = styled.button`
margin: 0 auto;
padding: 4px;
border-radius: 10px;
`

const POPUP = styled.div`
    position: absolute;
    top: 0px;
    left: 1vw;
    height: 85vh;
    width: 96.5vw;
    margin: 0 auto;
    z-index: 999999999999999999999999999999999999999999999;
    background-color: gray;
    border-radius: 10px
`