import React from 'react'
import { useEffect, useContext,useState} from 'react';
 import { DataContext } from '../../context/DataProvider';
import {  useNavigate,useParams} from 'react-router-dom';
import {API} from '../../service/api';
const InitialPost ={
  category: "",
  size: "",
  image: "",
  gender: "",
  type:"",
  description:"",
  rentPrice: "",
  name:"",
  phone:"",
  location:"",
  createDate: new Date()

}

const Update = () => {
   const [post, setPost] = useState(InitialPost);
   const [imageurl, setImageUrl] = useState("");
   const [uploadImageError, setuploadImageError] = useState("");
   const { account } = useContext(DataContext);
   const [file, setFile] = useState("");
   const navigate = useNavigate();
   const {id} = useParams()

  useEffect(() => {
     const fetchData = async () => {
     const response = await API.getPostById(id);
     setPost(response.data);
     setImageUrl(response.data.image);
    };
   fetchData();
   }, [id]);
  
   
   useEffect(() => {
    const getImage = async () => { 
      try {
        if(file) {
          const data = new FormData();
          data.append("name", file.name);
          data.append("file", file);
   
          const response = await API.uploadFile(data);
          if (response.isSuccess) {
            post.image= response.data;
            setImageUrl(response.data);  
          }
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
    getImage();
    post.name = account.name;
    post.phone = account.phone;
   }, [file]);

  

const updateBlogPost = async (e) => {
  e.preventDefault();
   await API.updatePost(post);
   navigate(`/rent/details/${post._id}`);
 };


const handleChange = (e) => {
  const { name, value } = e.target;
  setPost({
    ...post,
    [name]: value,
  });
};

 
 return (
    <>
 <h1>Update Product</h1>
      <form >
        <div>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
           
            onChange={(e) => handleChange(e)}
            value={post.category}
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
            onChange={handleChange}
            required
          />
          {/* {rentPriceError && (
            <div className="error-message">{rentPriceError}</div>
          )} */}
        </div>

        <label>Gender:</label>
        <div className="gender-options">
          <input
            type="radio"
            id="male"
            name="gender"
            value="male"
            checked={post.gender === "male"}
            onChange={handleChange}
            required
          />
          <label htmlFor="male">Male</label>

          <input
            type="radio"
            id="female"
            name="gender"
            value="female"
            checked={post.gender === "female"}
            onChange={handleChange}
            required
          />
          <label htmlFor="female">Female</label>

          <input
            type="radio"
            id="other"
            name="gender"
            value="other"
            checked={post.gender === "other"}
            onChange={handleChange}
            required
          />
          <label htmlFor="other">Other</label>
          </div><br></br>
        
          <label htmlFor="type">Type:</label>
          <input
            type="text"
            id="type"
            name="type"
            value={post.type}
            onChange={handleChange}
            required
            placeholder="example:Shirt, Pant, Lehenga"
          />
          <label htmlFor="description">Description:</label>
          <textarea
            type="text"
            id="description"
            name="description"
            value={post.description}
            onChange={handleChange}
            placeholder="material,color and condition of clothes "
          />
          


        <label htmlFor="size">Size:</label>
        <input
          type="text"
          id="size"
          name="size"
          value={post.size}
          onChange={handleChange}
          required
          placeholder=" example: small, medium, large, x-large"
        />
         <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          name="location"
          value={post.location}
          onChange={handleChange}
          required
        />

        <div>
        {/* <img src={post.image|| imageUrl} alt="Post image" /> */}
          <label htmlFor="image">Upload Image:</label>
          <input
 type="file"
 id="image"
 name="file"
 accept="image/*"
 onChange={(e) => {
   setFile(e.target.files[0]);
   setImageUrl(URL.createObjectURL(e.target.files[0]));
   <img src={imageurl || post.image} alt="Post image" />

 }}
 required
/>

        
{uploadImageError && (
            <div className="error-message">{uploadImageError}</div>
          )}
        </div>

        <button onClick={updateBlogPost} type="submit">Update</button>
      </form>
    </>
  )
};
export default Update;
