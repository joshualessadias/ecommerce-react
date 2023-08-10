import { FormEvent, useEffect, useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { CreateProductRequestDTO } from "../../types/CreateProductRequestDTO";

interface Props {
  show: boolean;
  onClose: () => void;
  onSubmit: (request: CreateProductRequestDTO) => void;
}

const AddProductModal = ({ show, onClose, onSubmit }: Props) => {
  const [validated, setValidated] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      onSubmit({
        name: name,
        price: price,
        stock: stock,
      });
    }

    setValidated(true);
  };

  useEffect(() => {
    if (show) setValidated(false);
  }, [show]);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            noValidate
            validated={validated}
            onSubmit={(event) => handleSubmit(event)}
          >
            <Form.Label htmlFor="basic-url">
              Please insert product info
            </Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                required
                placeholder="Product name"
                aria-label="Product name"
                onChange={(event) => setName(event.target.value)}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>R$</InputGroup.Text>
              <Form.Control
                required
                type="number"
                min={0}
                placeholder="Product price"
                aria-label="Product price"
                onChange={(event) => setPrice(Number(event.target.value))}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <Form.Control
                required
                type="number"
                min={1}
                placeholder="Quantity in stock"
                aria-label="Quantity in stock"
                onChange={(event) => setStock(Number(event.target.value))}
              />
            </InputGroup>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddProductModal;
