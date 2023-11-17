import { categories } from "../../constants/data";
import React from 'react';

const Categories = () => {
  return (
    <div style={{ marginTop: '20px', display: 'grid' }}>
      <div></div>
      <div style={{textAlign: 'center'}}>
        <table style={{ border: '1px solid black', width: '40%', textAlign: 'center' }}>
          <thead>
            <tr>
              <th style={{ backgroundColor: 'lightgray', padding: '10px' }}>
                All Categories
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map(category => (
              <tr key={category.id} style={{ borderBottom: '1px solid black' }}>
                <td style={{ padding: '10px' }}>{category.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default Categories