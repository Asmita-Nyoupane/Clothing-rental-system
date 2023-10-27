import React from 'react'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { API } from '../service/api';
const signupInitialValues={
  name:"",
  email:"", 
  phone:"",
  password:""
  
}

const Signup = () => {
  let navigate = useNavigate();
  const [signup, setSignup] = useState(signupInitialValues);
  const [error, setError] = useState('');
  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
                        
  }
  const signupUser = async () => {
    
    if (!signup.name || !signup.email || !signup.phone || !signup.password) {
      setError('Please fill in all the required fields.');
      return;
    }
    console.log("signup user:",signup)
        
    try {
      let response = await API.userSignup(signup);
      console.log(response)
      if (response && response.isSuccess) {
        setError('');
        setSignup(signupInitialValues);
        navigate('/login');
        console.log("signup user:",signup)
      } else {
        setError('Something went wrong! Please try again later.');
      }
    } catch (error) {
      console.log(error)
      setError('Something went wrong');
    }
  };
  return (
    <> 

         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}  >
        <div className="col-12 col-sm-8 col-md-6 col-lg-4 mx-2">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center"> Signup Form</h3>
              <form onSubmit={signupUser} >
              <div className="mb-3">
                 <label htmlFor="name" className="form-label" >
                  UserName
                  </label>
                  <input type="text" className="form-control" id="name" name='name' required
                  style={{  borderRadius: '5px' }}  onChange={(e) => onInputChange(e)} />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label" >
                    Email
                  </label>
                  <input type="email" className="form-control" id="email"  name='email'required
                  style={{  borderRadius: '5px' }} onChange={(e) => onInputChange(e)} />
                </div>
                <div className="mb-3">
                          <label htmlFor="phone" className="form-label">
                              Phone Number
                             </label>
                          <input type="tel" className="form-control" id="phone"  name='phone' required 
                          style={{  borderRadius: '5px' }}  onChange={(e) => onInputChange(e)} />
                        </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label" >
                    Password
                  </label>
                  <input type="password" className="form-control" id="password" name='password' required
                  style={{  borderRadius: '5px' }} onChange={(e) => onInputChange(e)} />
                </div>
               
                      {error && <span style={{color: '#c93737',fontSize: '14px',marginTop: '5px', lineHeight:'0',fontWeight:'600'}}>{error}</span>}
                <button type="submit" className="btn btn-success"
                style={{ background: '#007BFF', color: '#fff', borderRadius: '5px', cursor: 'pointer',    padding:' 10px 20px', margin:'10px 100px'  }} 
                 >
                 Signup
                </button>
              </form> 
              
            </div>
          </div>
        </div>
      </div>
   </> 
  )
}

export default Signup