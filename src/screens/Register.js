import React, { useEffect, useState } from 'react'
import GoogleLogin from 'react-google-login';
import jwt_decode from "jwt-decode"
import axios from 'axios';
import { config } from './../config';
function Register() {
    let fetchdata =  () => {
        localStorage.removeItem("user");
      };
    useEffect(() => {
        console.log("done")
        fetchdata()
      }, []);
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [username, setusername] = useState('');
    const responseGoogle = async (response) => {
        console.log(response);
        console.log(response.tokenId);
        const userobj = jwt_decode(response.tokenId);
        console.log(userobj)
        const glog = {
            email: userobj.email,
            name: userobj.name

        }
        console.log(glog);
        try {
            const tokenId = { TokenId: response.tokenId }
            console.log(tokenId)
            const result = await axios.post(`${config.api}/api/users/googleauth`, tokenId);
            const logdata = result.data;
            
            if (logdata.message = "User Registered Successfully") {
                localStorage.setItem('user', JSON.stringify(logdata.temp));
                window.location.href = "/dashboard"
            } else {
                window.location.href = '/register'
            }
        } catch (error) {
            console.log(error);
        }
        // localStorage.setItem('user', JSON.stringify(glog));

    }
    const errorGoogle = (error) => {
        console.log(error);
    }
    // window.gapi.load('client:auth2', () => {
    //   window.gapi.client.init({
    //       clientId: '839291234313-4g4ledigi5l12p33o7foes0rsq3hv49l.apps.googleusercontent.com',
    //       plugin_name: "chat",
    //       scope:"profile"
    //   })
    // })

    async function register() {
        const user = {

            email,
            username,
            password

        }
        console.log(user);
        try {
            const result = await axios.post(`${config.api}/api/users/register`, user);
            setusername('');
            setemail('');
            setpassword('');
            window.location.href = "/";
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='row justify-content-center pt-5 login-background'>
            <div className='col-md-5 mt-5'>
                <div className='box-shadow p-4 login'>
                    <h2 className='pad-10' style={{ color: "white" }}>Register</h2>
                    <input type='text' className='form-control' placeholder='Email' value={email} onChange={(e) => { setemail(e.target.value) }} />
                    <input type='text' className='form-control' placeholder='User Name' value={username} onChange={(e) => { setusername(e.target.value) }} />
                    <input type='text' className='form-control' placeholder='Password' value={password} onChange={(e) => { setpassword(e.target.value) }} />

                    <button className='btn btn-log mt-3' onClick={register}>Register</button>
                    <hr />
                    <GoogleLogin
                        clientId="839291234313-4g4ledigi5l12p33o7foes0rsq3hv49l.apps.googleusercontent.com"
                        buttonText="SignUp with Google"
                        onSuccess={responseGoogle}
                        onFailure={errorGoogle}
                        cookiePolicy={'single_host_origin'}

                    />
                </div>
            </div>
        </div>
    )
}

export default Register