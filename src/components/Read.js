import React, { useState, useEffect } from 'react';
import { Table, Button } from 'semantic-ui-react';
import axios from 'axios';
import { API_URL } from '../constant/URL';
import { useNavigate } from 'react-router-dom';

function Read() {
  const [apiData, setAPIData] = useState([]);
  const navigate = useNavigate(); 

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      
      callGetAPI();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const callGetAPI = async () => {
    try {
      const response = await axios.get(API_URL);
      setAPIData(response.data); 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    callGetAPI();
  }, []); 

  const updateUser = ({ firstName, lastName, checked, id }) => {
    localStorage.setItem('id', id);
    localStorage.setItem('firstName', firstName);
    localStorage.setItem('lastName', lastName);
    localStorage.setItem('checked', checked);
    navigate('/update'); 
  };

  return (
    <Table singleLine>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell className='tb'>First Name</Table.HeaderCell>
          <Table.HeaderCell className='tb'>Last Name</Table.HeaderCell>
          <Table.HeaderCell className='tb'>Checked</Table.HeaderCell>
          <Table.HeaderCell className='tb'>Delete</Table.HeaderCell>
          <Table.HeaderCell className='tb'>Update</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {apiData.map((data) => (
          <Table.Row key={data.id}>
            <Table.Cell>{data.firstName}</Table.Cell>
            <Table.Cell>{data.lastName}</Table.Cell>
            <Table.Cell>{data.checked.toString()}</Table.Cell>
            <Table.Cell>
              <Button onClick={() => deleteUser(data.id)}>Delete</Button>
            </Table.Cell>
            <Table.Cell>
              <Button onClick={() => updateUser(data)}>Update</Button>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

export default Read;
