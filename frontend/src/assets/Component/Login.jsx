import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    
    <div className ="container-fluid mt-5">
      <div className ="row  justify-content-center">
        <div className ="col-12 col-sm-8 col-md-6 col-lg-4">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center">Login</h3>
              <form>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input type="text"
                   className="form-control form-control-sm"
                    id="username"
                  style={{ borderRadius: '5px' }}
                  /> 
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" className="form-control  form-control-sm" id="password"
                   style={{  borderRadius: '5px' }}
                   />
                </div>
                <button type="submit" 
                className="btn btn-primary"
                style={{ background: '#007BFF', color: '#fff', borderRadius: '5px', cursor: 'pointer',    padding:' 10px 20px', margin:'10px 140px'  }}
                >
                  Login</button>
               </form>
                <p className="mt-3 text-center" >
                Don't have an account?<Link to="/register">Register</Link>
              </p>
                     
             </div>
           </div>
         </div>
       </div>
     </div>
       
  )
}

export default Login