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
        <h2 className='text-center'>
          Search, Filter, Sort and Pagination using JSON Fake Rest API
        </h2>
        <MDBRow>
          <MDBCol size="12">
            <MDBTable>
              <MDBTableHead dark>
                <tr>
                  <th score="col">No.</th>
                  <th score="col">Name</th>
                  <th score="col">Email</th>
                  <th score="col">Phone</th>
                  <th score="col">Address</th>
                  <th score="col">Status</th>
                </tr>
              </MDBTableHead>
              {data.length === 0 ? (
                <MDBTableBody className='align-center mb-0'>
                  <tr>
                    <td colSpan={8} className="text-center mb-0">No Data Found</td>
                  </tr>
                </MDBTableBody>
              ):(
                data.map((item, index) =>(
                  <MDBTableBody key={index}>
                    <tr>
                      <th scope='row'>{index+1}</th>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td>{item.address}</td>
                      <td>{item.status}</td>
                    </tr>
                  </MDBTableBody>
                ))
              )}
            </MDBTable>
          </MDBCol>
        </MDBRow>
      </div>
    </MDBContainer>
  );
}

export default App;
