import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import {useParams,useNavigate} from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';
import { toast, ToastContainer } from 'react-toastify';


function EmployeeUpdate() {
    const  [employee,setEmployee] = useState({});

    const navigate = useNavigate();

   const params = useParams();
   
   
   const getEmployee = (id) => {
    EmployeeService.getEmployeeById(id)
                    .then(res => {
                        setEmployee(res.data)
                    })
                    .catch(err => {
                        alert("User doesn't exist")
                        console.error(err)
                    })

   } 

   const firstNameHandler = (e) => {
    setEmployee({
        ...employee,
        firstName: e.target.value
    })
}
const lastNameHandler = (e) => {
    setEmployee({
        ...employee,
        lastName: e.target.value
    })
}
const emailIdHandler = (e) => {
    setEmployee({
        ...employee,
        emailId: e.target.value
    })
}
const handleSubmit = (e) => {
    e.preventDefault();
    EmployeeService.updateEmployee(params.id,employee)
                    .then(() => {
                       
                        navigate("/");
                        toast.success("User Updated Successfully", {
                            position: toast.POSITION.TOP_RIGHT
                        });

                    })
                    .catch(error => {
                        console.error(error)
                    });
}

   useEffect(() => {
         getEmployee(params.id)
   },[])

  return (
    <div>
        <div className="container">
            <div className="formbg-outer">
                <div className="formbg">
                    <div className="formbg-inner padding-horizontal--48">
                        <h3 className="text-center">Edit Employee</h3>
                            <form onSubmit={handleSubmit} id="add-form">
                                <div className="form-group">
                                    <div className="field padding-bottom--24">
                                    <label>First Name: </label>
                                    <input placeholder={employee.firstName} name="firstName" className='form-control'  onChange={e => firstNameHandler(e)} />
                                    </div>
                                    <div className="field padding-bottom--24">
                                    <label>Last Name: </label>
                                    <input placeholder={employee.lastName} name="lastName" className='form-control'  onChange={e => lastNameHandler(e)} /> 
                                    </div>
                                    <div className="field padding-bottom--24">
                                    <label>Email Address: </label>
                                    <input placeholder={employee.emailId} name="EmailId" className='form-control'  onChange={e => emailIdHandler(e)} /> 
                                    </div>
                                </div>
                                <div className="field padding-bottom--24">
                                <button type='submit'>Update</button>
                                </div>
                            </form>
                    </div> 
                </div>
            </div>
        </div>
        <ToastContainer />

    </div>
  )
}

export default EmployeeUpdate