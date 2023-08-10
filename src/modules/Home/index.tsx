import { useEffect } from "react";
import ProductCardList from "../../components/ProductCardList";
import { useState } from "react";
import axios from "axios";
import { ProductResponseDTO } from "../../types/ProductResponseDTO";
import AddProductModal from "../../components/AddProductModal";
import { CreateProductRequestDTO } from "../../types/CreateProductRequestDTO";
import { OrderRequestDTO } from "../../types/OrderRequestDTO";

const Home = () => {
  const [productList, setProductList] = useState<ProductResponseDTO[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [postMade, setPostMade] = useState(false);

  const client = axios.create({
    baseURL: "http://localhost:8080",
  });

  const createProduct = (request: CreateProductRequestDTO) => {
    client.post("/products", request).then((response) => {
      if (response.status === 200) setPostMade((prev) => !prev);
    });
  };

  const handleCheckout = (request: OrderRequestDTO) => {
    client.post("/orders", request).then((response) => {
      if (response.status === 200) {
      }
    });
  };

  useEffect(() => {
    client.get("/products").then((res) => {
      if (res.status === 200) {
        setProductList(res.data.body);
      }
    });
  }, []);

  useEffect(() => {
    client.get("").then((res) => {
      if (res.status === 200) {
        setProductList(res.data.body);
      }
    });
  }, [postMade]);

  return (
    <div className="container">
      <ProductCardList
        productList={productList}
        onClickAddProduct={() => setShowModal(true)}
        onCheckout={(request) => {
          handleCheckout(request);
        }}
      />
      <AddProductModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={(request) => createProduct(request)}
      ></AddProductModal>
    </div>
  );
};

export default Home;
