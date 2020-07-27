// nami123@gmail.com nami123nami123

import React,  {useState} from 'react';
import {Link} from 'react-router-dom'
import Layout from '../core/Layout'
import {signup} from '../auth'
// import { useState } from 'react';

// ** Load env variables ** //
//  require('dotenv').config();

const Signup = () => {
    
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false

    });

    const {name, email, password, success, error} = values;

    const handleChange = name => event => {
        setValues({...values, error: false, [name] : event.target.value})
    }



    const clickSubmit = (event) => {
         event.preventDefault();
         setValues({...values, error: false})
        signup({name, email, password}) //Signup({name: name, email: email, password: password}) === the same
        .then(data => {
            if(data.error) {
                setValues({...values, error: data.error, success:false})
            } else {
                setValues({
                    ...values, 
                    name: '', 
                    email: '', 
                    password: '', 
                    error: '',
                    success: true
                })
            }
        }

        )
    }

    const signUpFrom = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input 
                onChange={handleChange('name')} 
                type="text" 
                className="form-control"
                value={name}>
                </input>
            </div>

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input 
                onChange={handleChange('email')} 
                ype="email" 
                className="form-control"
                value={email}>
                </input>
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input 
                onChange={handleChange('password')} 
                type="password" 
                className="form-control"
                value={password}>
                </input>
            </div>
            <button onClick={clickSubmit} className="btn btn-primary">Submit</button>
        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
          {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{display: success ? '' : 'none'}}>
             New account is created. Please <Link to="/signin">Signin</Link>
        </div>
    );

    return(
        <Layout 
        title="Signup" 
        description="Signup to React E-commerce App"
        className="container col-md-8 offset-md-2">
            {showSuccess()}
            {showError()}
            {signUpFrom()}
        </Layout>
    )
}

export default Signup;


