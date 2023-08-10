import { Button, Card, Carousel, Col, Form, Image, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { ProductResponseDTO } from "../../types/ProductResponseDTO";
import { OrderRequestDTO } from "../../types/OrderRequestDTO";
import { ProductQuantity } from "../../types/ProductQuantity";

interface Props {
  productList: ProductResponseDTO[];
  onClickAddProduct: () => void;
  onCheckout: (request: OrderRequestDTO) => void;
}

const ProductCardList = ({
  productList,
  onClickAddProduct,
  onCheckout,
}: Props) => {
  const imgFolder = "src/img/";
  const [quantityList, setQuantityList] = useState<ProductQuantity[]>([]);
  const [, setState] = useState(false);

  const onChangeQuantity = (value: number, index: number) => {
    console.log(quantityList);
    let aux = quantityList;
    aux[index].quantity = value;
    setQuantityList(aux);
    setState((prev) => !prev);
  };

  const handleClickAddProduct = () => {
    onClickAddProduct();
  };

  const handleClickCheckout = () => {
    let orderRequestDTO: OrderRequestDTO = {
      productOrderRequestList: [],
    };

    quantityList.forEach((value) => {
      orderRequestDTO.productOrderRequestList.push({
        productId: value.productId,
        quantity: value.quantity,
      });
    });

    onCheckout(orderRequestDTO);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  const formatStock = (stock: number) => {
    return "Quantity in stock: " + stock;
  };

  useEffect(() => {
    productList.forEach((product) => {
      let aux = quantityList;
      aux.push({ productId: product.productId, quantity: 0 });

      setQuantityList(aux);
    });
  }, []);

  return (
    <>
      {productList.length === 0 && <p>No products found</p>}
      <Row xs={1} sm={1} md={2} lg={3} xl={4} className="g-4">
        {productList.map((product, index) => (
          <Col>
            <Card style={{ height: 360 }}>
              <Carousel>
                <Carousel.Item style={{ height: 200 }}>
                  <Image
                    src={imgFolder + "vite.svg"}
                    width={1000}
                    fluid
                  ></Image>
                </Carousel.Item>
                <Carousel.Item style={{ height: 200 }}>
                  <Image
                    src={imgFolder + "vite.svg"}
                    width={1000}
                    fluid
                  ></Image>
                </Carousel.Item>
              </Carousel>
              <Card.Body>
                <Card.Title>{formatPrice(product.price)}</Card.Title>
                <Card.Subtitle>{product.name}</Card.Subtitle>
                <Card.Text>{formatStock(product.stock)}</Card.Text>
                {quantityList[index]?.quantity &&
                quantityList[index]?.quantity > 0 ? (
                  <Form.Control
                    type="number"
                    min={0}
                    value={quantityList[index]?.quantity}
                    onChange={(e) =>
                      onChangeQuantity(Number(e.target.value), index)
                    }
                  ></Form.Control>
                ) : (
                  <Button
                    variant="dark"
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
              <Button
                variant="secondary"
                onClick={() => handleClickAddProduct()}
              >
                Add new product
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div style={{ height: 50 }}></div>
      <Button
        variant="primary"
        size="lg"
        disabled={false}
        onClick={() => handleClickCheckout()}
      >
        Checkout
      </Button>
    </>
  );
};

export default ProductCardList;
