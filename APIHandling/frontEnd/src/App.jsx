import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import axios from "axios";
import { debounce } from "./helperFunction";

function App() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const inputRef = useRef("");

  const debouncedSetSearch = useCallback(
    debounce((value) => {
      setDebouncedSearch(value);
      console.log("Search updated:", value);
    }, 800),
    []
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    inputRef.current = value;
    setSearch(value);
    debouncedSetSearch(value);
  };

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await axios.get(
          `/api/products?search=` + debouncedSearch,
          {
            signal: controller.signal,
          }
        );
        console.log("res", response.data);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("request cancelled", error.message);
          return;
        }
        setError(true);
        setLoading(false);
      }
    })();

    // Cleanup
    return () => {
      controller.abort();
    };
  }, [debouncedSearch]);

  return (
    <>
      <h1>New Js </h1>
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={handleInputChange}
      />
      {loading && <h2>Loading ...</h2>}
      {error ? (
        <h2>Something went wrong</h2>
      ) : (
        <h2>Number of products are {products.length}</h2>
      )}
    </>
  );
}

export default App;
