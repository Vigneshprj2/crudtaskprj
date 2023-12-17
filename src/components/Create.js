import React, { useState } from 'react';
import { Form, Button, Checkbox } from "semantic-ui-react";
import { API_URL } from '../constant/URL';
import axios from 'axios'; // Import Axios here
import { useNavigate } from 'react-router-dom';

function Create() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  const handleSubmit = () => {
    
    axios.post(API_URL, { firstName, lastName, checked })
      .then(response => {
    
        console.log('Response:', response.data);
    
        navigate('/read');
      })
      .catch(error => {
    
        console.error('Error:', error);
      });
  };

  return (
    <Form className='form'>
      <Form.Field>
        <label>First Name</label>
        <input value={firstName} onChange={handleFirstNameChange} placeholder='Enter First Name' />
      </Form.Field>
      <Form.Field><br/>
        <label>Last Name</label>
        <input value={lastName} onChange={handleLastNameChange} placeholder='Enter Last Name' />
      </Form.Field>
      <Form.Field><br/>
        <Checkbox checked={checked} onChange={handleCheckboxChange} label="Agree to the terms & conditions" />
      </Form.Field><br/>
      <Button onClick={handleSubmit}>Submit</Button>
    </Form>
  );
}

export default Create;

