import React from 'react'
import {useState, useEffect} from 'react'
import { useSearchParams, Link} from 'react-router-dom';
//import {API} from '../../../service/api';
import {API} from '../../../service/api';
import { Post } from './Post';




const Posts = () => {
   
    const [posts, getPosts] = useState([]);
    
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');
    

    useEffect(() => {
        const fetchData = async () => { 
            let response = await API.getAllPosts({ category : category || '' });
            if (response.isSuccess) {
                getPosts(response.data);
            }
        }
        fetchData();
    }, [category]);

//    
return (
    <>
      <div className='card-container'>
        {posts?.length ? (
          posts.map(post => (
            <div key={post._id} className="card">
              <Link to={`details/${post._id}`}>
                <Post post={post} />
              </Link>
            </div>
          ))
        ) : (
          <div style={{ backgroundColor: 'lightgray', margin: '30px 80px', fontSize: '15px' }}>
            No data available to display
          </div>
        )}
      </div>
    </>
  );
};


      
 export default Posts;
