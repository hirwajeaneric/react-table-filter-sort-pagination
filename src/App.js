import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {MDBTable,MDBTableHead,MDBTableBody,MDBRow,MDBCol,MDBContainer,MDBBtn,MDBBtnGroup} from 'mdb-react-ui-kit';
import './App.css';

function App() {

  const [data, setData] = useState([]);
  const [value, setValue] = useState("");
  const [sortValue, setSortValue] = useState("");
  
  const sortOptions = ["name", "address", "email","phone","status"];

  useEffect(()=>{
    loadUserData();
  },[])

  const loadUserData = async ()=>{
    return await axios.get('http://localhost:5000/users')
    .then((response) => setData(response.data))
    .catch((err)=> console.log(err))
  }

  const handleReset = () => {loadUserData()};

  const handleSearch = async(e) => {
    e.preventDefault();
    return await axios.get(`http://localhost:5000/users?q=${value}`)
      .then((response)=> {
        setData(response.data);
        setValue("");
      })
      .catch((err)=> console.log(err));
  };

  const handleSort = async(e) => {
    let value = e.target.value;
    setSortValue(value);
    return await axios.get(`http://localhost:5000/users?_sort=${value}&_order=asc`)
      .then((response)=> {
        setData(response.data);
      })
      .catch((err)=> console.log(err));
  };

  const handleFilter = async(value) => {
    setSortValue(value);
    return await axios.get(`http://localhost:5000/users?status=${value}`)
      .then((response)=> {
        setData(response.data);
      })
      .catch((err)=> console.log(err));
  };

  return (
    <MDBContainer>
      <form style={{margin: "auto", padding: "15px", maxWidth: "400px", alignContent: "center",}} className="d-flex input-group w-auto" onSubmit={handleSearch}>
        <input type="text" className='form-control' placeholder='Search Name...' value={value} onChange={(e)=> setValue(e.target.value)} />
          <MDBBtn type='submit' color='dark'>Search</MDBBtn>
          <MDBBtn className='mx-2' color='info' onClick={()=> handleReset()}>Reset</MDBBtn>
      </form>
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
                      <th sco-pe='row'>{index+1}</th>
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
      <MDBRow>
        <MDBCol size="8">
          <h5>Sort By:</h5>
          <select style={{width: "50%", borderRadius: "2px", height: "35px"}} onChange={handleSort} value={sortValue}>
            <option>Please Select Value</option>
            {
              sortOptions.map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
          </select>
        </MDBCol>
        <MDBCol size="4">
          <h5>Filter By Status:</h5>
          <MDBBtnGroup>
            <MDBBtn color='success' onClick={()=> handleFilter("Active")}>Active</MDBBtn>
            <MDBBtn color='danger' style={{marginLeft: "2px"}} onClick={()=> handleFilter("Inactive")}>Inactive</MDBBtn>
          </MDBBtnGroup>
          </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default App;
