import { useEffect } from "react";
import ProductCardList from "../../components/ProductCardList";
import { useState } from "react";
import axios from "axios";
import { ProductResponseDTO } from "../../types/ProductResponseDTO";

const Home = () => {
  const [productList, setProductList] = useState<ProductResponseDTO[]>([]);

  const client = axios.create({
    baseURL: "http://localhost:8080/products",
  });

  useEffect(() => {
    client.get("").then((res) => {
      if (res.status === 200) {
        setProductList(res.data.body);
      }
    });
  }, []);

  return <ProductCardList productList={productList} />;
};

export default Home;
