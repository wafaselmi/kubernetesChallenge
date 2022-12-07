import React from 'react'
import { useState } from 'react'
import EmployeeService from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';
import {notification} from 'antd';
function EmployeeCreate() {
    const[firstName,setFirstName] = useState("");
    const[lastName,setLastName] = useState("");
    const[emailId,setEmailId] = useState("");

    const navigate = useNavigate();

    const firstNameHandler = (e) => {
        setFirstName(e);
    }
    const lastNameHandler = (e) => {
        setLastName(e);
    }
    const emailIdHandler = (e) => {
        setEmailId(e);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        let employee = {
            firstName: firstName,
            lastName: lastName,
            emailId: emailId
        };
        EmployeeService.createEmployee(employee)
                        .then(() => {
                            openNotificationWithIcon('success');
                            navigate("/");

                        })
                        .catch(error => {
                            console.error(error)
                        });
    }
    const openNotificationWithIcon = type => {
        notification[type]({
          message: 'Success',
          description:
            'Employee Created Successfully !'
        })
      }
    return ( 
    <div>
        <div className="container">
            <div className="formbg-outer">
                <div className="formbg">
                    <div className="formbg-inner padding-horizontal--48">
                        <h3 className="text-center">Add Employee</h3>
                            <form onSubmit={handleSubmit} id="add-form">
                                <div className="form-group">
                                    <div className="field padding-bottom--24">
                                    <label>First Name: </label>
                                    <input placeholder="First name..." name="firstName" className='form-control'  onChange={e => firstNameHandler(e.target.value)} />
                                    </div>
                                    <div className="field padding-bottom--24">
                                    <label>Last Name: </label>
                                    <input placeholder="Last name..." name="lastName" className='form-control'  onChange={e => lastNameHandler(e.target.value)} /> 
                                    </div>
                                    <div className="field padding-bottom--24">
                                    <label>Email Address: </label>
                                    <input placeholder="Email..." name="EmailId" className='form-control'  onChange={e => emailIdHandler(e.target.value)} /> 
                                    </div>
                                </div>
                                <div className="field padding-bottom--24">
                                <button type='submit'>Submit</button>
                                </div>
                            </form>
                    </div> 
                </div>
            </div>
        </div>
    </div>
  )
}

export default EmployeeCreate