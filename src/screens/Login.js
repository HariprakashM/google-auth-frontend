import React, { useState } from 'react'
import GoogleLogin from 'react-google-login';
import jwt_decode from "jwt-decode"
import axios from 'axios';
import { gapi } from "gapi-script";
import { config } from './../config';
function Login() {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const responseGoogle = async (response) => {
        // console.log(response);
        const userobj = jwt_decode(response.tokenId);
        console.log(userobj)
        try {
            const tokenId={TokenId:response.tokenId}
            console.log(tokenId)
            const result = await axios.post(`${config.api}/api/users/googleauth`, tokenId);
            const logdata = result.data;
            localStorage.setItem('user', JSON.stringify(logdata.temp));
            window.location.href = '/dashboard'
        } catch (error) {
            console.log(error);
        }
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
    
    async function login() {
        const user = {

            email,
            password

        }
        console.log(user);
        try {
            const result = await axios.post(`${config.api}/api/users/login`, user);
            const logdata = result.data;
            localStorage.setItem('user', JSON.stringify(logdata.temp));
            console.log(logdata.message)
            if (logdata.message =="successfully logged in") {
                window.location.href = "/dashboard"
            } else {
                console.log("login failed")
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (

            <div className='row justify-content-center pt-5 login-background'>
                <div className='col-md-5 mt-5'>
                <div className='box-shadow p-4 login'>
                        <h2 className='pad-10' style={{ color: "white" }}>Login</h2>
                    <input type='text' className='form-control' placeholder='Email' value={email} onChange={(e) => { setemail(e.target.value) }} />
                    <input type='text' className='form-control' placeholder='Password' value={password} onChange={(e) => { setpassword(e.target.value) }} />

                    <button className='btn btn-log mt-3' onClick={login}>Login</button>
                    <hr/>
                    <GoogleLogin
                clientId="839291234313-4g4ledigi5l12p33o7foes0rsq3hv49l.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={responseGoogle}
                onFailure={errorGoogle}
                cookiePolicy={'single_host_origin'}

            />
            
            </div>
                </div>
            </div>
            
    )
}

export default Login