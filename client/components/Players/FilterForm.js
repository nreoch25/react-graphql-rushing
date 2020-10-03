import { useState } from "react";
import {
  Alert,
  Button,
  Form,
  FormGroup,
  Input,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Collapse,
} from "reactstrap";

const FilterForm = ({ filterByName }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [collapse, setCollapse] = useState(false);

  const toggle = () => setCollapse(!collapse);

  const handleChange = ({ target: { value } }) => {
    setError("");
    setName(value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log("NAME LENGTH", name.length);
    if (name.length < 3) {
      return setError("Please type 3 characters of the players name");
    }
    setError("");
    setName("");
    filterByName(name);
  };

  return (
    <Card className="mb-3">
      <CardHeader className="text-center" tag="h3" style={{ cursor: "pointer" }} onClick={toggle}>
        Filter By Name
      </CardHeader>
      <Collapse isOpen={collapse}>
        <CardBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Input
                type="name"
                name="name"
                placeholder="Player Name"
                value={name}
                onChange={handleChange}
              />
            </FormGroup>
            <Button type="submit" color="primary" block>
              Submit
            </Button>
          </Form>
        </CardBody>
        {error && (
          <CardFooter>
            <Alert style={{ marginBottom: "0" }} color="danger">
              {error}
            </Alert>
          </CardFooter>
        )}
      </Collapse>
    </Card>
  );
};

export default FilterForm;
