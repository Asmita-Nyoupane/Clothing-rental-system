import React from 'react'

const Register = () => {
  return (
    <> 

         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}  >
        <div className="col-12 col-sm-8 col-md-6 col-lg-4">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center"> Register Form</h3>
              <form>
              <div className="mb-3">
                 <label htmlFor="name" className="form-label">
                  UserName
                  </label>
                  <input type="text" className="form-control" id="name" required
                  style={{  borderRadius: '5px' }} />
                </div>
            
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input type="email" className="form-control" id="email" required
                  style={{  borderRadius: '5px' }} />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input type="password" className="form-control" id="password" required
                  style={{  borderRadius: '5px' }} />
                </div>
                 
              
                        <div className="mb-3">
                          <label htmlFor="phone" className="form-label">
                              Phone Number
                             </label>
                          <input type="tel" className="form-control" id="phone" required 
                          style={{  borderRadius: '5px' }}/>
                        </div>
                <button type="submit" className="btn btn-success"
                style={{ background: '#007BFF', color: '#fff', borderRadius: '5px', cursor: 'pointer',    padding:' 10px 20px', margin:'10px 100px'  }} >
                 Register
                </button>
              </form> 
              
            </div>
          </div>
        </div>
      </div>
   </> 
  )
}

export default Register