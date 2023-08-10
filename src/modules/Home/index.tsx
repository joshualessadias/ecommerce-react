import { useEffect } from "react";
import ProductCardList from "../../components/ProductCardList";
import { useState } from "react";
import axios from "axios";
import { ProductResponseDTO } from "../../types/ProductResponseDTO";
import AddProductModal from "../../components/AddProductModal";
import { CreateProductRequestDTO } from "../../types/CreateProductRequestDTO";

const Home = () => {
  const [productList, setProductList] = useState<ProductResponseDTO[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [postMade, setPostMade] = useState(false);

  const client = axios.create({
    baseURL: "http://localhost:8080/products",
  });

  const createProduct = (request: CreateProductRequestDTO) => {
    console.log(request);
    client.post("", request).then((response) => {
      if (response.status === 200) setPostMade((prev) => !prev);
    });
  };

  useEffect(() => {
    client.get("").then((res) => {
      if (res.status === 200) {
        setProductList(res.data.body);
        console.log(res.data.body);
      }
    });
  }, []);

  useEffect(() => {
    client.get("").then((res) => {
      if (res.status === 200) {
        setProductList(res.data.body);
        console.log(res.data.body);
      }
    });
  }, [postMade]);

  return (
    <>
      <ProductCardList
        productList={productList}
        onClickAddProduct={() => setShowModal(true)}
      />
      <AddProductModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={(request) => createProduct(request)}
      ></AddProductModal>
    </>
  );
};

export default Home;
