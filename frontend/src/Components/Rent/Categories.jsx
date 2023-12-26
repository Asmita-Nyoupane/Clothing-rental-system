import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Container, Table, Button } from "react-bootstrap";
import { categories } from "../../constants/data";
import { useLocation } from "../../context/LocationProvider";

const Categories = () => {
  const { toggleViewNearbyPosts } = useLocation();
  // const [searchParams] = useSearchParams();
  // const category = searchParams.get("category");

  return (
    <Container style={{ marginTop: "-10px", display: "grid", width: "80%" }}>
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
              <th colSpan="2">
                <Button
                  style={{
                    width: "fit-content",
                    height: "fit-content",
                    marginBottom: "10px",
                  }}
                  onClick={toggleViewNearbyPosts}
                >
                  Nearby Options
                </Button>
                {/* </th>
              <th
                colSpan="2"
                style={{ backgroundColor: "lightgray", padding: "10px" }}
              > */}
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
