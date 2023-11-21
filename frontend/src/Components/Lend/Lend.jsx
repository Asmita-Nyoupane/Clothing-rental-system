import React, { useState, useEffect ,useContext} from "react";
import {DataContext} from '../../context/DataProvider'
import { useNavigate } from "react-router-dom"
import "./Lend.css";
import {API} from '../../service/api'

const InitialPost ={
  category: "",
  size: "",
  image: "",
  gender: "",
  rentPrice: "",
  name:"",
  phone:"",
  location:"",
  createDate: new Date()

}
const Lend = () => {
  const [post, setPost] = useState(InitialPost);
  const [rentPriceError, setRentPriceError] = useState("");
  const [uploadImageError, setuploadImageError] = useState("");
  const [file, setFile] = useState("");
  const { account} = useContext(DataContext);
 const navigate = useNavigate();

  useEffect(() => {
    const getImage = async() => {
     if(file){
        // Check if the selected file is a valid image (jpg or png)
        if  (file.type === "image/jpeg" || file.type === "image/png") {
          const data = new FormData();
          data.append("name", file.name);
          data.append("file", file);
        
  
          // API Call
         const response =  await API.uploadFile(data);
         post.image = response.data;
       
       setuploadImageError("")  
        } else {
          setuploadImageError("please upload png or jpg image");
        }
    }
    };
    getImage();
   post.name = account.name;
   post.phone = account.phone;
  }, [file]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "rentPrice" && !/^\d+$/.test(value)) {
      setRentPriceError("Rental price must contain only digits.");
    } else {
      setRentPriceError(""); // Clear the error message if the input is valid
    }
    setPost({
      ...post,
      [name]: value,
    });
  };
  
  

  const handleSubmit = async(e) => {
    e.preventDefault();
    // You can handle form submission here
     const response =   await API.createPost(post);
     if( response && response.isSuccess){
      navigate('/')
     }
   
  };

  return (
    <div>
      <h1>Product Form</h1>
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
        <div>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={post.category}
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
            value={post.rentPrice}
            onChange={handleInputChange}
            required
          />
          {rentPriceError && (
            <div className="error-message">{rentPriceError}</div>
          )}
        </div>

        <label>Gender:</label>
        <div className="gender-options">
          <input
            type="radio"
            id="male"
            name="gender"
            value="male"
            checked={post.gender === "male"}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="male">Male</label>

          <input
            type="radio"
            id="female"
            name="gender"
            value="female"
            checked={post.gender === "female"}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="female">Female</label>

          <input
            type="radio"
            id="other"
            name="gender"
            value="other"
            checked={post.gender === "other"}
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
          value={post.size}
          onChange={handleInputChange}
          required
        />
         <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          name="location"
          value={post.location}
          onChange={handleInputChange}
          required
        />

        <div>
          <label htmlFor="image">Upload Image:</label>
          <input
            type="file"
            id="image"
            name="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
          {uploadImageError && (
            <div className="error-message">{uploadImageError}</div>
          )}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Lend;
  //           <label htmlFor="category">Categories:</label>
  //           <select
  //             id="category"
  //             name="category"
  //             value={formData.category}
  //             onChange={handleInputChange}
  //             required
  //           >
  //              <option value="">-- Select Category --</option> 
  //             <option value="casual-wear">Casual Wear</option>
  //             <option value="wedding-wear">Wedding Wear</option>
  //             <option value="outer-wear">Outer Wear</option>
  //             <option value="other">Other</option>
  //           </select>
  //         </div>
  
  //         <div>
  //           <label htmlFor="rentPrice">Rent Price:</label>
  //           <input
  //             type="text"
  //             id="rentPrice"
  //             name="rentPrice"
  //             value={formData.rentPrice}
  //             onChange={handleInputChange}
  //             required
  //             />
  //             {rentPriceError && <div className="error-message">{rentPriceError}</div>}
            
  //         </div>
  
          
          
  //         <label>Gender:</label>
  //         <div class="gender-options">
            
  //           <input
  //             type="radio"
  //             id="male"
  //             name="gender"
  //             value="male"
  //             checked={formData.gender === "male"} 
  //             onChange={handleInputChange}
  //             required
  //           />
  //            <label htmlFor="male">Male</label> 
          
          
  //           <input
  //             type="radio"
  //             id="female"
  //             name="gender"
  //             value="female"
  //             checked={formData.gender === "female"}
  //             onChange={handleInputChange}
  //             required
  //           />
  //            <label htmlFor="female">Female</label> 
          
          
  //           <input
  //             type="radio"
  //             id="other"
  //             name="gender"
  //             value="other"
  //             checked={formData.gender === "other"}
  //             onChange={handleInputChange}
  //             required
  //           />
  //            <label htmlFor="other">Other</label>
  //            </div>
            
            
  //          <label htmlFor="size">Size:</label>
  //           <input
  //             type="text"
  //             id="size"
  //             name="size"
  //             value={formData.size}
  //             onChange={handleInputChange}
  //             required
  //           />
         
  
  //         <div>
  //           <label htmlFor="image">Upload Image:</label>
  //           <input
  //             type="file"
  //             id="image"
  //             name="image"
  //             accept="image/*"
  //             onChange={handleImageChange}
  //             required
  //           />
  //           {uploadImageError && <div className="error-message">{uploadImageError}</div>}
  //         </div>
          
  
  //         <button type="submit">Submit</button>
  //       </form>
  //     </div>
  //   );
  // };
  
  // export default Lend;
  
