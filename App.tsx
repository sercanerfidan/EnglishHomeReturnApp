import { useState } from "react";
import Login from "./components/login";
import Main from "./components/main-page";
import Product from "./components/product";

export default function App() {
  const [visible, setVisible] = useState(false);
  const setVisibility = () => {
    setVisible(true);
  };
  return (
    <Product />
    //  <Main/>
  );
}
