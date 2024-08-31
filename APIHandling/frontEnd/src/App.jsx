import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  // if we need to use async awaiyt in useeffect for that we need to use ()() - immediately invoked functions - we cant use async await directly

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await axios.get("/api/products");
        console.log("res", response.data);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return <h1>Loading ....</h1>;
  }

  if (error) {
    return <h1>Something went wrong</h1>;
  }

  return (
    <>
      <h1>New Js </h1>
      <h2>Number of products are {products.length}</h2>
    </>
  );
}

export default App;
