import React, { useState } from 'react';
import './Lend.css';

const Lend = () => {
  const [formData, setFormData] = useState({
    type: '',
    category: '',
    size: '',
    image: null,
    gender: '',
    rentPrice: '',
  });
  const [rentPriceError, setRentPriceError] = useState('');
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'rentPrice' && !/^\d+$/.test(value)) {
      
        setRentPriceError('Rental price must contain only digits.')
    
      } else {
      setRentPriceError('') // Clear the error message if the input is valid
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const [uploadImageError, setuploadImageError] = useState('');
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    // Check if the selected file is a valid image (jpg or png)
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      setFormData({
        ...formData,
        image: file,
      });
    } else {
      setuploadImageError("please upload png or jpg image")
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission here
    console.log(formData);
  };

  return (
   
      <div>
        <h1>Product Form</h1>
        <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="category">Categories:</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
            >
               <option value="">-- Select Category --</option> 
              <option value="casual-wear">Casual Wear</option>
              <option value="wedding-wear">Wedding Wear</option>
              <option value="outer-wear">Outer Wear</option>
              <option value="other">Other</option>
            </select>
          </div>
  
          <div>
            <label htmlFor="rentPrice">Rent Price:</label>
            <input
              type="text"
              id="rentPrice"
              name="rentPrice"
              value={formData.rentPrice}
              onChange={handleInputChange}
              required
              />
              {rentPriceError && <div className="error-message">{rentPriceError}</div>}
            
          </div>
  
          
          
          <label>Gender:</label>
          <div class="gender-options">
            
            <input
              type="radio"
              id="male"
              name="gender"
              value="male"
              checked={formData.gender === "male"} 
              onChange={handleInputChange}
              required
            />
             <label htmlFor="male">Male</label> 
          
          
            <input
              type="radio"
              id="female"
              name="gender"
              value="female"
              checked={formData.gender === "female"}
              onChange={handleInputChange}
              required
            />
             <label htmlFor="female">Female</label> 
          
          
            <input
              type="radio"
              id="other"
              name="gender"
              value="other"
              checked={formData.gender === "other"}
              onChange={handleInputChange}
              required
            />
             <label htmlFor="other">Other</label>
             </div>
            
            
           <label htmlFor="size">Size:</label>
            <input
              type="text"
              id="size"
              name="size"
              value={formData.size}
              onChange={handleInputChange}
              required
            />
         
  
          <div>
            <label htmlFor="image">Upload Image:</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
            {uploadImageError && <div className="error-message">{uploadImageError}</div>}
          </div>
          
  
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  };
  
  export default Lend;
  