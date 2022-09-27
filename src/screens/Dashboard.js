import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { config } from './../config';
import 'react-toastify/dist/ReactToastify.css';
function Dashboard() {
    const [users, setusers] = useState([])
    const notify = () => toast.success('Added successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    let fetchdata = async () => {
        try {
            let res = await axios.get(`${config.api}/api/dashboard/getalldata`);
            setusers(res.data);
        } catch (error) { console.log(error) }
    };

    useEffect(() => {
        fetchdata()
    }, []);
    const formik = useFormik({
        initialValues: {
            employeename:"",
            email:"",
            role:"",
            age:""
        },
        onSubmit: async (values) => {
            try {
                const dash = await axios.post(`${config.api}/api/dashboard/adddata`, values);
                window.location.reload();
            } catch (error) {
                console.log("Employee not added ");
            }
        }
    });
    return (
        <div className='container'>
            <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div className='row'>
        <div className='col-lg-6 mt-4'>
        <h2>Employees Table</h2>
                <hr/>
            <table class="table table-dark table-hover">
              <thead>
                <tr>
                  <th scope="col">S.No</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Role</th>
                  <th scope="col">Age</th>

                </tr>
              </thead>
              <tbody>
                {
                  users.map((ele, index) => {
                    return (<tr>
                      <th scope="row">{index + 1}</th>
                      <th scope="row">{ele.employeename}</th>
                      <td>{ele.email}</td>
                      <td>{ele.role}</td>
                      <td>{ele.age}</td>
                    </tr>)
                  })
                }
              </tbody>
            </table>
          </div>
          <div className='col-lg-6 mt-4'>
            <form onSubmit={formik.handleSubmit} autoComplete="off">
              <div className='col-lg-12'>
                <h2>Employee Form</h2>
                <hr/>
                <label >Name</label>
                <input className='form-control' type="text" name="employeename" value={formik.values.employeename} onChange={formik.handleChange} />
              </div>
              <div className='col-lg-12'>
                <label >Email</label>
                <input className='form-control' type="text" name="email" value={formik.values.email} onChange={formik.handleChange} />
              </div>
              <div className='col-lg-12'>
                <label >Role</label>
                <input className='form-control' type="text" name="role" value={formik.values.role} onChange={formik.handleChange} />
              </div>
              <div className='col-lg-12'>
                <label>Age</label>
                <input className='form-control' type="text" name="age" value={formik.values.age} onChange={formik.handleChange} />
              </div>
              <div className='col-lg-12'>
                <input className='btn btn-primary mt-2' type='submit' value='submit' onClick={notify} />

              </div>
            </form>
          </div>
          
        </div>
        </div>
        
    )
}

export default Dashboard