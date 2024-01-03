import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { SearchContext } from "../../context/SearchProvider";
import { useContext } from "react";
import { API } from "../../service/api";
import { useNavigate } from "react-router";

function Search() {
  const navigate = useNavigate();
  const { setKeyword, setResult, keyword, result } = useContext(SearchContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.SearchKeyword(keyword);
      setResult(response.data);
      navigate("/searchResult");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Row>
      <Col xs="auto">
        <Form.Control
          type="text"
          placeholder="Search"
          className=" mr-sm-2"
          value={keyword || ""}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </Col>
      <Col xs="auto">
        <Button type="submit" onClick={handleSubmit}>
          Search
        </Button>
      </Col>
    </Row>
  );
}

export default Search;
