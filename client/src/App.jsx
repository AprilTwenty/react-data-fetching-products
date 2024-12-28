import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import { use } from "react";

function App() {
  const [productsData, setProductsData] = useState([]);
  
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productDescription, setProductDescription] = useState("");

  useEffect(() => {
    getProductsData();
  }, []);

  async function getProductsData() {
    const result = await axios.get("http://localhost:4001/products");
    console.log(result);
    setProductsData(result.data.data);
  }

  async function deleteProductsData(index) {
    const deleteUrl = "http://localhost:4001/products/" + index;
    const result = await axios.delete(deleteUrl);
    getProductsData()
  }

  async function addProductsData(event) {
    event.preventDefault();
    const data = {
      name: productName,
      price: productPrice,
      image: productImage,
      description: productDescription
    }
    const addProducts = await axios.post("http://localhost:4001/products", data);
    getProductsData()
  }

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>

      <div className="product-list">
        {
          productsData.map((item, index) => (
            <div key={item.id} className="product">
              <div className="product-preview">
                <img
                  src={item.image}
                  alt="some product"
                  width="350"
                  height="350"
                />
              </div>
              <div className="product-detail">
                <h1>Product name: {item.name}</h1>
                <h2>Product price: {item.price} Baht</h2>
                <p>Product description: {item.description}</p>
              </div>
              <button className="delete-button" onClick={() => (deleteProductsData(item.id))}>x</button>
            </div>
          ))
        }
      </div>
      <form onSubmit={addProductsData}>
      <div className="product-list">Add new product
        <div className="addNewProduct">
          <label htmlFor="productName" className="productName">Name</label>
            <input className="productName" value={productName} onChange={(event) => {setProductName(event.target.value)}}></input>
          <label htmlFor="price" className="price">Price</label>
            <input className="price" value={productPrice} onChange={(event) => {setProductPrice(event.target.value)}}></input>
          <label htmlFor="description" className="description">Description</label>
            <input className="description" value={productDescription} onChange={(event) => {setProductDescription(event.target.value)}}></input>
          <label htmlFor="image" className="image">Image Url</label>
            <input className="image" value={productImage} onChange={(event) => {setProductImage(event.target.value)}}></input>

        </div>
        <button className="submitButton" type="submit">Submit</button>
      </div>
      </form>
    </div>
  );
}

export default App;


/* สำรอง id: 11
Product name: Veal - Liver
Product price: 1295 Baht
Product description: Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.

image
: 
"http://dummyimage.com/350x350.png/dddddd/000000"



*/