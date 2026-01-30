import Input from "./components/Input";
import Button from "./components/Button";
import { useEffect, useState } from "react";

export default function App() {
  const [products, setProducts] = useState([]);
  const baseURL = "http://localhost:4000";

  const getAllProduct = async () => {
    try {
      const res = await fetch(`${baseURL}/products`);
      console.log(res)
      if (!res.ok) {
        throw new Error("failed to fetch product");
      }

      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("error fetching data", error);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, [])

  return (
    <div className="max-w-md mx-auto">
      <div>
        <h2 className="m-2 p-1 underline text-xl">Add Supplier</h2>
        <div className="flex flex-col gap-1">
          <Input text="Product name" />
          <Input text="Price" />
          <Input text="Stock" />
          <Button text="Submit" color="red" />
        </div>
      </div>
      <div>
        <h2 className="m-2 p-1 underline text-xl">Supplier List</h2>
        <div>
          {products.length > 0 ? (
            products.map((p) => (
              <div key={p.id}>{p.name}</div>
            ))
          ): (
            <div>No product list</div>
          )}
        </div>
      </div>
    </div>
  );
}
