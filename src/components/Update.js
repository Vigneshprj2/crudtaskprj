import React, { useState, useEffect } from 'react';
import { Form, Button, Checkbox } from 'semantic-ui-react';
import { API_URL } from '../constant/URL';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Update = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [id, setId] = useState('');
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  const updateuser = async () => {
    try {
      await axios.put(`${API_URL}/${id}`, { firstName, lastName, checked });
      navigate('/read'); 
    } catch (error) {
      console.error('Error updating user:', error);
          }
  };

  useEffect(() => {
    setId(localStorage.getItem('id') || '');
    setFirstName(localStorage.getItem('firstName') || '');
    setLastName(localStorage.getItem('lastName') || '');
    setChecked(localStorage.getItem('checked') === 'true');
  }, []);

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleCheckboxChange = (event, { checked }) => {
    setChecked(checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    localStorage.setItem('id', id);
    localStorage.setItem('firstName', firstName);
    localStorage.setItem('lastName', lastName);
    localStorage.setItem('checked', checked);
    updateuser(); 
  };

  return (
    <Form className='form1' onSubmit={handleSubmit}>
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
      <Button>Update</Button>
    </Form>
  );
};

export default Update;
