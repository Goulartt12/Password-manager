import { useEffect, useState } from 'react'
import './App.css'
import Axios from "axios";

function App() {

  const [data, setData] = useState([{}]);

  const [site, setSite] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(()=>{
    Axios.get("http://localhost:5000/api").then((res)=>{
      setData(res.data);
    });
  },[]);

  const createUser = ()=>{
    Axios.post("http://localhost:5000/createUser",{
      site: site,
      email: email,
      password: password
    }).then((res)=>{
      setData([...data,{
        site: site,
        email: email,
        password: password
      }]);
    });
  };

  const deleteUser = async (email)=>{
    Axios.delete(`http://localhost:5000/deleteUser/${email}`);
    setData(data.filter(user => user.email !== email));
  };

  return(
    <>
    <div className='content'>
      <h1>Password manager</h1>
      <div className='manager'>
        <h2>Register</h2>
        <input type="text" placeholder='Site...' onChange={(e)=>{setSite(e.target.value)}}/>
        <input type="text" placeholder='Email...' onChange={(e)=>{setEmail(e.target.value)}}/>
        <input type="text" placeholder='Password' onChange={(e)=>{setPassword(e.target.value)}}/>
        <button type='submit' className='submit' onClick={()=> createUser()}>Submit</button>
        <div className='table'>
          <table>
            <thead>
              <tr>
                <th>Site</th>
                <th>Email</th>
                <th>Password</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
                {data.map((user, index) => (
                  <tr key={index}>
                  <td>{user.site}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td><button className='rmv' onClick={()=> deleteUser(user.email)}>X</button></td>
                  </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
