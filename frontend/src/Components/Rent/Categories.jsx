import { categories } from "../../constants/data";
import React from 'react';
import { Link, useSearchParams } from "react-router-dom";
const Categories = () => {
  const [SearchParams]= useSearchParams();
  const category = SearchParams.get('category');
  return (
    <div style={{ marginTop: '20px', display: 'grid' }}>
      <div></div>
      <div style={{textAlign: 'center'}}>
        <table style={{ border: '1px solid black', width: '40%', textAlign: 'center' }}>
          <thead>
            <tr>
              <th style={{ backgroundColor: 'lightgray', padding: '10px' }}>
              <Link to ={'/rent'}>
              All Categories
              </Link>
               
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map(category => (
              <tr key={category.id} style={{ borderBottom: '1px solid black' }}>
                <td style={{ padding: '10px' }}>
                <Link to ={`/?category=${category.type}`}>
                {category.type}
                </Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default Categories