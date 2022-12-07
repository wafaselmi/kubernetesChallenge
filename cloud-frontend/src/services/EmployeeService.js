import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

class EmployeeService {
    getEmployees() {
        return axios.get(`${API_URL}/employees`);
           
    }
    createEmployee(employee) {
        return axios.post(`${API_URL}/employees`,employee);
    }

    getEmployeeById(id) {
        return axios.get(`${API_URL}/employees/${id}`);
    }
    updateEmployee(id,employee) {
        return axios.put(`${API_URL}/employees/${id}`,employee);
    }
}

export default new EmployeeService();