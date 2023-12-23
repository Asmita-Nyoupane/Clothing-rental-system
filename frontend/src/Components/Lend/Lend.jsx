import React, { useState, useEffect, useContext } from "react";
import { DataContext } from "../../context/DataProvider";
import { useNavigate } from "react-router-dom";
import "./Lend.css";
import { API } from "../../service/api";

const InitialPost = {
  category: "",
  size: "",
  image: "",
  gender: "",
  type:"",
  rentPrice: "",
  name: "",
  phone: "",
  location: "",
  description: "",
  createDate: new Date(),
};
const Lend = () => {
  const [post, setPost] = useState(InitialPost);
  const [rentPriceError, setRentPriceError] = useState("");
  const [uploadImageError, setuploadImageError] = useState("");
  const [file, setFile] = useState("");
  const { account} = useContext(DataContext);
 const navigate = useNavigate();
 

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        // Check if the selected file is a valid image (jpg or png)
        if (file.type === "image/jpeg" || file.type === "image/png") {
          const data = new FormData();
          data.append("name", file.name);
          data.append("file", file);

          // API Call
          const response = await API.uploadFile(data);
          console.log("hello", response);
          post.image = response.data;

          setuploadImageError("");
        } else {
          setuploadImageError("please upload png or jpg image");
        }
      }
    };
    getImage();
    // post.name = account.name;
    // post.phone = account.phone;
  }, [file]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "rentPrice" && !/^\d+$/.test(value)) {
      setRentPriceError("Rental price must contain only digits.");
    } else {
      setRentPriceError(""); // Clear the error message if the input is valid
    }

    // setPost({
    //   name: account.name,
    //   phone: account.phone,
    //   ...post,
    //   [name]: value,
    // });
    setPost((prevPost) => ({
      ...prevPost,
      [name]: value,
      name: account.name,
      phone: account.phone,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // You can handle form submission here
    //  const response =   await API.createPost(post);
    const response = await API.createPost(post);
    if (response && response.isSuccess) {
      console.log("frontend", response);
      navigate("/rent");
    }
  };

  return (
    <div>
      <h1>Product Form</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
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
          </div><br></br>
        
          <label htmlFor="type">Type:</label>
          <input
            type="text"
            id="type"
            name="type"
            value={post.type}
            onChange={handleInputChange}
            required
            placeholder="example:Shirt, Pant, Lehenga"
          />
          <label htmlFor="description">Description:</label>
          <textarea
            type="text"
            id="description"
            name="description"
            value={post.description}
            onChange={handleInputChange}
            placeholder="material,color and condition of clothes "
          />
          


        <label htmlFor="type">Type:</label>
        <input
          type="text"
          id="type"
          name="type"
          value={post.type}
          onChange={handleInputChange}
          required
          placeholder="example: shirt, lehenga, pant"
        />

        <label htmlFor="size">Size:</label>
        <input
          type="text"
          id="size"
          name="size"
          value={post.size}
          onChange={handleInputChange}
          required
          placeholder=" example: small, medium, large, x-large"
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
