import React from 'react'
import { useState,useEffect } from 'react'
import EmployeeService from '../services/EmployeeService';
import { FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Pagination } from "antd";


export default function EmployeeList() {
    const [employees,setEmployees] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const [totalPage,setTotalPage] = useState(0);
    const [current,setCurrent] = useState(1);
    const [minIndex,setMinIndex] = useState(0);
    const [maxIndex,setMaxIndex] = useState(0);

    const pageSize = 8;

    
    const navigate = useNavigate();

    const getEmployees = () => {
        EmployeeService.getEmployees()
                        .then(response => {
                            setEmployees(response.data);
                            setTotalPage(employees.length / pageSize)
                            setMinIndex(0)
                            setMaxIndex(pageSize);
                            setIsLoading(false);


                        })
                        .catch(error =>{
                            console.log(error);
                        });
    }

    const editEmployee= (id) => {
      navigate(`/update-employee/${id}`);  
    }
    const handleChange = (page) => {
          setCurrent(page);
          setMinIndex((page - 1) * pageSize)
          setMaxIndex(page * pageSize)
        
      };
    useEffect(() => {
        getEmployees();
    }, []);

  return (
    <div>
         {isLoading ? (
            <h3>Loading Data...</h3>
            ) : 
            ( 
            <div>
                { employees.length == 0 ? (
                    <div>No employees found </div>
                    ) : (
                    <div className='container'>
                        <h2 className="text-content">Employee List</h2>
                        <div className="row">
                            <table className="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th>Employee First Name</th>
                                        <th>Employee Last Name</th>
                                        <th>Employee Email ID</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {employees?.map((employee, index) => 
                                        index>= minIndex && index < maxIndex &&
                                    (
                                        <tr key= {employee.id}>
                                            <td>{employee.firstName}</td>
                                            <td>{employee.lastName}</td>
                                            <td>{employee.emailId}</td>
                                            <td>
                                                <a onClick={() => editEmployee(employee.id)}> <FaEdit/> </a>
                                            </td>
                                        </tr>

                                    ))}
                                    
                                </tbody>
                            </table>
                            
                        </div>
                    </div>
                    )   
                }
                <Pagination
                    pageSize={pageSize}
                    current={current}
                    total={employees.length}
                    onChange={handleChange}
                    style={{ bottom: "0px" }}
                />                 
            </div> 
            )}
    </div> 
  )

}
