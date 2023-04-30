// import logo from './logo.svg';
// import './App.css';

import { useState, useEffect } from "react";

function App() {
  const [product, setProduct] = useState([]);
  const [viewer1, setViewer1] = useState(false);

  const [oneProduct, setOneProduct] = useState([]);
  const [viewer2, setViewer2] = useState(false);

  const [checked4, setChecked4] = useState(false);
  const [index, setIndex] = useState(0);

  const [checked5, setChecked5] = useState(false);
  const [index2, setIndex2] = useState(0);

  const [menu, setMenu] = useState(1);

  // new Product
  const [addNewProduct, setAddNewProduct] = useState({
    _id: 0,
    title: "",
    price: 0.0,
    description: "",
    category: "",
    image: "http://127.0.0.1:4000/images/",
    rating: { rate: 0.0, count: 0 },
  });

  const [addNewPrice, setAddNewPrice] = useState(0);

  useEffect(() => {
    getAllProducts();
  }, [checked4]);

  function getAllProducts() {
    fetch("http://localhost:4000/")
      .then((response) => response.json())
      .then((data) => {
        console.log("Show Catalog of Products :");
        console.log(data);
        setProduct(data);
      });
    setViewer1(!viewer1);
  }

  const showAllItems = product.map((el) => (
    <div key={el._id}>
      <img src={el.image} width={30} /> <br />
      Title: {el.title} <br />
      Category: {el.category} <br />
      Price: {el.price} <br />
      Rate :{el.rating.rate} and Count:{el.rating.count} <br />
    </div>
  ));

  function getOneProduct(id) {
    console.log(id);
    if (id >= 1 && id <= 20) {
      fetch("http://localhost:4000/" + id)
        .then((response) => response.json())
        .then((data) => {
          console.log("Show one product :", id);
          console.log(data);
          const dataArr = [];
          dataArr.push(data);
          setOneProduct(dataArr);
        });
      setViewer2(!viewer2);
    } else {
      console.log("Wrong number of Product id.");
    }
  }

  const showOneItem = oneProduct.map((el) => (
    <div key={el._id}>
      <img src={el.image} width={30} /> <br />
      Title: {el.title} <br />
      Category: {el.category} <br />
      Price: {el.price} <br />
      Rate :{el.rating.rate} and Count:{el.rating.count} <br />
    </div>
  ));

  function handleChange(evt) {
    const value = evt.target.value;
    if (evt.target.name === "_id") {
      setAddNewProduct({ ...addNewProduct, _id: value });
    } else if (evt.target.name === "title") {
      setAddNewProduct({ ...addNewProduct, title: value });
    } else if (evt.target.name === "price") {
      setAddNewProduct({ ...addNewProduct, price: value });
    } else if (evt.target.name === "description") {
      setAddNewProduct({ ...addNewProduct, description: value });
    } else if (evt.target.name === "category") {
      setAddNewProduct({ ...addNewProduct, category: value });
    } else if (evt.target.name === "image") {
      const temp = value;
      setAddNewProduct({ ...addNewProduct, image: temp });
    } else if (evt.target.name === "rate") {
      setAddNewProduct({ ...addNewProduct, rating: { rate: value } });
    } else if (evt.target.name === "count") {
      const temp = addNewProduct.rating.rate;
      setAddNewProduct({
        ...addNewProduct,
        rating: { rate: temp, count: value },
      });
    }
  }

  function handleUpdateChange(evt){
    setAddNewPrice(evt.target.value);
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    console.log(e.target.value);
    fetch("http://localhost:4000/insert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addNewProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Post a new product completed");
        console.log(data);
        if (data) {
          //const keys = Object.keys(data);
          const value = Object.values(data);
          alert(value);
        }
      });
  }


  function getOneByOneProductNext() {
    if (product.length > 0) {
      if (index === product.length - 1) setIndex(0);
      else setIndex(index + 1);
      if (product.length > 0) setChecked4(true);
      else setChecked4(false);
    }
  }

  function getOneByOneProductPrev() {
    if (product.length > 0) {
      if (index === 0) setIndex(product.length - 1);
      else setIndex(index - 1);
      if (product.length > 0) setChecked4(true);
      else setChecked4(false);
    }
  }

  function getOneByOneProductNextU() {
    if (product.length > 0) {
      if (index2 === product.length - 1) setIndex2(0);
      else setIndex2(index2 + 1);
      if (product.length > 0) setChecked5(true);
      else setChecked5(false);
    }
  }

  function getOneByOneProductPrevU() {
    if (product.length > 0) {
      if (index2 === 0) setIndex2(product.length - 1);
      else setIndex2(index2 - 1);
      if (product.length > 0) setChecked5(true);
      else setChecked5(false);
    }
  }

  function deleteOneProduct(deleteid) {
    console.log("Product to delete :", deleteid);
    fetch("http://localhost:4000/delete/", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: deleteid }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Delete a product completed : ", deleteid);
        console.log(data);
        if (data) {
          //const keys = Object.keys(data);
          const value = Object.values(data);
          alert(value);
        }
      });
    setChecked4(!checked4);
  }

  function updateOneProduct(updateid, new_price) {
    console.log("Product to update :", updateid);
    console.log("Value to update :", new_price);
    fetch("http://localhost:4000/update/", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: updateid , price: new_price}),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Updating the product's price completed : ", updateid);
        console.log(data);
        if (data) {
          //const keys = Object.keys(data);
          const value = Object.values(data);
          alert(value);
        }
      });
    setChecked5(!checked5);
  }

  return (
    <div>
      <h1>Catalog of Products</h1>
      <div>
        <button onClick={() => setMenu(1)}>Create</button>
        <button onClick={() => setMenu(2)}>Read</button>
        <button onClick={() => setMenu(3)}>Update</button>
        <button onClick={() => setMenu(4)}>Delete</button>
        <button onClick={() => setMenu(5)}>Credits</button>
      </div>

      {menu === 2 && <div>
      <h1>Show all available Products.</h1>
      <button onClick={() => getAllProducts()}>Show All products</button>
      <hr></hr>
      {viewer1 && <div>Products {showAllItems}</div>}

      <hr></hr>
      <h1>Show one Product by Id:</h1>
      <input type="text" id="message" name="message" placeholder="id" onChange={(e) => getOneProduct(e.target.value)} />
      {viewer2 && <div>Product: {showOneItem}</div>}
      <hr></hr>
      </div>}

      {menu === 1 && <div>
        <h3>Add a new product :</h3>
        <form action="">
          <input type="number" placeholder="id?" name="_id" value={addNewProduct._id} onChange={handleChange} />
          <input type="text" placeholder="title?" name="title" value={addNewProduct.title} onChange={handleChange} />
          <input type="number" placeholder="price?" name="price" value={addNewProduct.price} onChange={handleChange} />
          <input type="text" placeholder="description?" name="description" value={addNewProduct.description} onChange={handleChange} />
          <input type="text" placeholder="category?" name="category" value={addNewProduct.category} onChange={handleChange} />
          <input type="text" placeholder="image?" name="image" value={addNewProduct.image} onChange={handleChange} />
          <input type="number" placeholder="rate?" name="rate" value={addNewProduct.rating.rate} onChange={handleChange} />
          <input type="number" placeholder="count?" name="count" value={addNewProduct.rating.count} onChange={handleChange} />
          <button type="submit" onClick={handleOnSubmit}>
            Submit
          </button>
        </form>
      </div>}

      {menu === 4 && <div>
        <h3>Delete one product:</h3>
        <input type="checkbox" id="acceptdelete" name="acceptdelete" checked={checked4}
          onChange={(e) => setChecked4(!checked4)} />
        <button onClick={() => getOneByOneProductPrev()}>Prev</button>
        <button onClick={() => getOneByOneProductNext()}>Next</button>
        <button onClick={() => deleteOneProduct(product[index]._id)}>Delete</button>
        {checked4 && (
          <div key={product[index]._id}>
            <img src={product[index].image} width={30} /> <br />
            Id:{product[index]._id} <br />
            Title: {product[index].title} <br />
            Category: {product[index].category} <br />
            Price: {product[index].price} <br />
            Rate :{product[index].rating.rate} and Count:
            {product[index].rating.count} <br />
          </div>
        )}
      </div>}

      {menu === 3 && <div>
        <h3>Update One Product's Price:</h3>
        <input type="checkbox" id="acceptupdate" name="acceptdelete" checked={checked5}
          onChange={(e) => setChecked5(!checked5)} />
        <button onClick={() => getOneByOneProductPrevU()}>Prev</button>
        <button onClick={() => getOneByOneProductNextU()}>Next</button>
        {checked5 && (
          <div>
            <input type="number" placeholder="New Price" name="updated_price" value={addNewPrice} onChange={handleUpdateChange} />
            <button onClick={() => updateOneProduct(product[index2]._id, addNewPrice)}>Update</button>
            <div key={product[index2]._id}>
              <img src={product[index2].image} width={30} /> <br />
              Id:{product[index2]._id} <br />
              Title: {product[index2].title} <br />
              Category: {product[index2].category} <br />
              Price: {product[index2].price} <br />
              Rate :{product[index2].rating.rate} and Count:
              {product[index2].rating.count} <br />
            </div>
          </div>
        )}
      </div>}

      {menu === 5 && <div>
        <h1>Credits</h1>
        <p>Team #49</p>
        <p>Member #1: Nathan Geater (nkgeater@iastate.edu)</p>
        <p>Member #2: Andrew Sand (asand@iastate.edu)</p>
        <p>Course: SE/ComS 319</p>
        <p>Instructor: </p>
        <p>This basic website was created for assignment #3 for Iowa State University's SE/ComS 319 course in the Spring 2023 semester exclusively for educational purposes. 
          The project utilizes MongoDB, Express, React, and NodeJS to create a simple website that can interface with a locally-run database. Using the website, users can create, 
          read, update, and deleted data from the database, which stores information on various fictional products. Furthermore, this assignment uses
          images from the FakeStoreAPI.
        </p>
      </div>}
    </div>
  );
} // App end
export default App