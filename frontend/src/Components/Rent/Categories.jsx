// import { categories } from "../../constants/data";
// import React from 'react';
// import { Link, useSearchParams } from "react-router-dom";
// const Categories = () => {
//   const [SearchParams]= useSearchParams();
//   const category = SearchParams.get('category');
//   return (
//     <div style={{ marginTop: '20px', display: 'grid' }}>
//       <div></div>
//       <div style={{textAlign: 'center'}}>
//         <table style={{ border: '1px solid black', width: '40%', textAlign: 'center' }}>
//           <thead>
//             <tr>
//               <th style={{ backgroundColor: 'lightgray', padding: '10px' }}>
//               <Link to ={'/rent'}>
//               All Categories
//               </Link>

//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {categories.map(category => (
//               <tr key={category.id} style={{ borderBottom: '1px solid black' }}>
//                 <td style={{ padding: '10px' }}>
//                 <Link to ={`/?category=${category.type}`}>
//                 {category.type}
//                 </Link></td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };
import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Container, Table } from "react-bootstrap";
import { categories } from "../../constants/data";

const Categories = () => {
  // const [searchParams] = useSearchParams();
  // const category = searchParams.get("category");

  return (
    <Container style={{ marginTop: "20px", display: "grid", width: "80%" }}>
      <div style={{ textAlign: "center" }}>
        <Table
          bordered={false}
          style={{
            width: "100%",
            textAlign: "center",
            margin: 0,
            backgroundColor: "transparent",
            // borderCollapse: "separate", // Separate borders for cells
            borderSpacing: "0 8px ", // Add light-colored border between
          }}
        >
          <thead>
            <tr>
              <th style={{ backgroundColor: "lightgray", padding: "10px" }}>
                <Link
                  to="/rent"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  All Categories
                </Link>
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr
                key={category.id}
                style={{
                  borderBottom: "1px light grey",
                  transition: "background-color 0.3s",
                }}
              >
                <td style={{ padding: "10px" }}>
                  <Link
                    to={`/rent?category=${category.type}`}
                    style={{
                      textDecoration: "none",
                      color: "black",
                      display: "block",
                      padding: "8px",
                    }}
                  >
                    {category.type}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default Categories;
