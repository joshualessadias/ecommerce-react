import ProductCardList from "../../components/ProductCardList";

const Home = () => {
  const productList = [
    {
      name: "Galaxy S20",
      price: 12.5,
      stock: 12,
      pictureList: [
        "https://i.pinimg.com/236x/3f/64/43/3f6443acc9f35412d5f7946ecd8bc237.jpg",
        "https://i.pinimg.com/236x/fb/f0/56/fbf0564fe8d1ef56ae3ba6bb73ac34c1.jpg",
      ],
    },
    {
      name: "FPV Drone",
      price: 85.37,
      stock: 98,
      pictureList: [
        "https://i.pinimg.com/236x/83/07/7b/83077b70093cf9d4748992d01008c1bb.jpg",
        "https://i.pinimg.com/236x/6b/91/11/6b9111000542f5e3cf53ac13d83eac1a.jpg",
        "https://i.pinimg.com/236x/5d/3f/7e/5d3f7e9474ab7472c26232f2264e230e.jpg",
      ],
    },
    {
      name: "Windows Key",
      price: 46.85,
      stock: 39,
      pictureList: [
        "https://i.pinimg.com/236x/ce/94/09/ce9409d1251c055ae5d7171b7fa9a32b.jpg",
      ],
    },
    {
      name: "Computer",
      price: 73.13,
      stock: 3,
      pictureList: [
        "https://i.pinimg.com/236x/aa/c4/67/aac4672dc35605e6118898997ca021f1.jpg",
      ],
    },
    {
      name: "test_de4b431cb331",
      price: 19.2,
      stock: 62,
      pictureList: [
        "https://blog.logrocket.com/wp-content/uploads/2021/09/how-when-force-react-component-rerender.png",
      ],
    },
  ];

  return <ProductCardList productList={productList} />;
};

export default Home;
