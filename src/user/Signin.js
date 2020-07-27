import React, { useState } from 'react';
import { Redirect } from 'react-router-dom'
import Layout from '../core/Layout'
import { signin, authenticate, isAuthenticated } from '../auth'
// import { useState } from 'react';

// ** Load env variables ** //
//  require('dotenv').config();

const Signin = () => {

    const [values, setValues] = useState({
        email: 'nami123@gmail.com',
        password: 'nami123nami123',
        error: '',
        loading: false,
        redirectToReferrer: false
    });

    const { email, password, loading, error, redirectToReferrer } = values;
    const {user} = isAuthenticated()

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }



    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true })
        signin({ email, password }) //Signup({name: name, email: email, password: password}) === the same
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, loading: false })
                } else {
                    authenticate(data,
                        () => {
                            setValues({
                                ...values,
                                redirectToReferrer: true
                            })
                        }
                    )
                }
            }

            )
    }

    const signUpFrom = () => (
        <form>
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
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showLoading = () => (
        loading && (
            <div className="alert alert-info">
                <h2>Loading...</h2>
            </div>
        )
    );

    const redirectUser = () => {
        if (redirectToReferrer) {
            if(user && user.role === 1 ){
                return <Redirect to="/admin/dashboard"></Redirect>
            } else{
                return <Redirect to="/user/dashboard"></Redirect> 
            }
        }
        if(isAuthenticated()){
            return <Redirect to="/"></Redirect> 
        }
    }

    return (
        <Layout
            title="Signin"
            description="Signin to React E-commerce App"
            className="container col-md-8 offset-md-2">
            {showLoading()}
            {showError()}
            {signUpFrom()}
            {redirectUser()}
        </Layout>
    )
}

export default Signin;




