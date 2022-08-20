import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {MDBTable,MDBTableHead,MDBTableBody,MDBRow,MDBCol,MDBContainer} from 'mdb-react-ui-kit';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  
  useEffect(()=>{
    loadUserData();
  },[])

  const loadUserData = async ()=>{
    return await axios.get('http://localhost:5000/users')
    .then((response) => setData(response.data))
    .catch((err)=> console.log(err))
  }

  console.log("data ",data)

  return (
    <MDBContainer>
      <div style={{marginTop: '100px'}}>
        <h2>Search, Filter, Sort and Pagination using JSON Fake Rest API</h2>
        <MDBRow>
          <MDBCol size="12">
            <MDBTable>
              
            </MDBTable>
          </MDBCol>
        </MDBRow>
      </div>
    </MDBContainer>
  );
}

export default App;
