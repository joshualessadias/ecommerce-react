import { Button, Card, Carousel, Col, Form, Image, Row } from "react-bootstrap";
import { useState } from "react";
import { ProductResponseDTO } from "../../types/ProductResponseDTO";

interface Props {
  productList: ProductResponseDTO[];
}

const ProductCardList = ({ productList }: Props) => {
  const imgFolder = "src/img/";
  const [quantityList, setQuantityList] = useState([0]);
  const [, setState] = useState(false);

  const onChangeQuantity = (value: number, index: number) => {
    let aux = quantityList;
    aux[index] = value;
    setQuantityList(aux);
    setState((prev) => !prev);
  };

  const onClickAddProduct = () => {};

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  const formatStock = (stock: number) => {
    return "Quantity in stock: " + stock;
  };

  return (
    <div className="container">
      {productList.length === 0 && <p>No products found</p>}
      <Row xs={1} sm={1} md={2} lg={3} xl={4} className="g-4">
        {productList.map((product, index) => (
          <Col>
            <Card style={{ height: 360 }}>
              <Carousel>
                <Carousel.Item style={{ height: 200 }}>
                  {product.pictureList.length === 0 ? (
                    <Image
                      src={imgFolder + "ReactJS.png"}
                      width={1000}
                      fluid
                    ></Image>
                  ) : (
                    product.pictureList.map((picture) => (
                      <Image src={imgFolder + picture} width={1000} fluid />
                    ))
                  )}
                </Carousel.Item>
              </Carousel>
              <Card.Body>
                <Card.Title>{formatPrice(product.price)}</Card.Title>
                <Card.Subtitle>{product.name}</Card.Subtitle>
                <Card.Text>{formatStock(product.stock)}</Card.Text>
                {quantityList[index] && quantityList[index] > 0 ? (
                  <Form.Control
                    type="number"
                    min={0}
                    value={quantityList[index]}
                    onChange={(e) =>
                      onChangeQuantity(Number(e.target.value), index)
                    }
                  ></Form.Control>
                ) : (
                  <Button
                    variant="primary"
                    onClick={() => {
                      onChangeQuantity(1, index);
                    }}
                  >
                    Add to Cart
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
        <Col className="text-center">
          <Card style={{ height: 360 }}>
            <Card.Body>
              <Button variant="secondary" onClick={() => onClickAddProduct}>
                Add new product
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductCardList;
