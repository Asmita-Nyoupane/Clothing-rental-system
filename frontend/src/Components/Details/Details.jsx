import { useEffect, useState  } from "react"
import { Link, useNavigate, useParams } from 'react-router-dom'
import { API } from "../../service/api";


 export const Details = () => {
    const [post, setPost] = useState({});
         const { id } = useParams();
    
    useEffect(() => {
        const fetchData = async () => {
            let response = await API.getPostById(id);
            if (response.isSuccess) {
                setPost(response.data);
            }
        }
        fetchData();
    }, []);
   return (
     <>
          
            <img src={post.image} alt="post" />

     </>
    
        
   )
 }
 