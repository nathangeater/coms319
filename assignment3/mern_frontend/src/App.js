// import logo from './logo.svg';
import './App.css';

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

  const [menu, setMenu] = useState(2);

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
    // eslint-disable-next-line
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

  function getOneProduct(id) {
    console.log(id);

    if (id >= 1) {
      fetch("http://localhost:4000/" + id)
        .then((response) => response.json())
        .then((data) => {
          console.log("Show one product :", id);
          console.log(data);
          const dataArr = [];
          dataArr.push(data);
          setOneProduct(dataArr);
          setViewer2(!viewer2);
        })
        .catch((err) => {
          console.log("Wrong number of Product id.");
          setViewer2(false);
        })
    } else {
      console.log("Wrong number of Product id.");
      setViewer2(false);
    }
  }

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
      console.log(value);
      setAddNewProduct({ ...addNewProduct, rating: { rate: value } });
    } else if (evt.target.name === "count") {
      const temp = addNewProduct.rating.rate;
      setAddNewProduct({ ...addNewProduct, rating: { rate: temp, count: value } });
    }
  }

  function handleUpdateChange(evt) {
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
      body: JSON.stringify({ _id: updateid, price: new_price }),
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
    setViewer1(false);
    setChecked5(!checked5);
  }

  const showAllItems = product.map((el) => (
    <div key={el._id} className='col mt-3'>
      <div className='card border border-dark' style={{ width: `18rem` }}>
        <img src={el.image} width={20} alt={el.title} className='card-img-top' />
        <div className='card-body border border-dark' style={{ background: `lightgray` }}>
          <p className='card-text'><span className='fw-bold'><u>Title:</u></span> {el.title}</p>
          <p className='card-text'><span className='fw-bold'><u>Category:</u></span> {el.category}</p>
          <p className='card-text'><span className='fw-bold'><u>Price:</u></span> {el.price}</p>
          <p className='card-text'><span className='fw-bold'><u>Rate:</u></span> {el.rating.rate} <span className='fw-bold'><u>Count:</u></span> {el.rating.count}</p>
        </div>
      </div>
    </div>
  ));

  const showOneItem = oneProduct.map((el) => (
    <div key={el._id}>
      <div className='card border border-dark' style={{ width: `18rem` }}>
        <img src={el.image} width={20} alt={el.title} className='card-img-top' />
        <div className='card-body border border-dark' style={{ background: `lightgray` }}>
          <p className='card-text'><span className='fw-bold'><u>Title:</u></span> {el.title}</p>
          <p className='card-text'><span className='fw-bold'><u>Category:</u></span> {el.category}</p>
          <p className='card-text'><span className='fw-bold'><u>Price:</u></span> {el.price}</p>
          <p className='card-text'><span className='fw-bold'><u>Rate:</u></span> {el.rating.rate} <span className='fw-bold'><u>Count:</u></span> {el.rating.count}</p>
        </div>
      </div>
    </div>
  ));

  return (
    <div style={{ background: `linear-gradient(lightblue, lightgreen)`, minHeight: `100vh` }}>
      <div style={{ textAlign: 'center' }}>
        <h1>SE/ComS 319 Assignment #3: Catalog of Products</h1>
        <nav className="navbar navbar-expand-lg bg-body-tertiary border border-dark" style={{ background: `radial-gradient(#cfcfcf, #a2b0a3)` }}>
          <div className="container-fluid">
            <div className="collapse navbar-collapse justify-content-center">
              <div className="btn-group-lg" role="group">
                <button className="btn btn-success" style={{ marginLeft: `15px`, marginRight: `15px` }} onClick={() => setMenu(1)}>Create</button>
                <button className="btn btn-success" aria-current="page" style={{ marginLeft: `15px`, marginRight: `15px` }} onClick={() => setMenu(2)}>Read</button>
                <button className="btn btn-success" style={{ marginLeft: `15px`, marginRight: `15px` }} onClick={() => setMenu(3)}>Update</button>
                <button className="btn btn-success" style={{ marginLeft: `15px`, marginRight: `15px` }} onClick={() => setMenu(4)}>Delete</button>
                <button className="btn btn-success" style={{ marginLeft: `15px`, marginRight: `15px` }} onClick={() => setMenu(5)}>Credits</button>
              </div>
            </div>
          </div>
        </nav>
      </div>

      <div className='m-4'>
        {menu === 2 && <div>
          <h1 className='text-center fs-1 fw-bold text-success fw-underline'><u>View Products:</u></h1>
          <h1><u>Show All Available Products:</u></h1>
          <button onClick={() => getAllProducts()}>Show All Products</button>
          <hr></hr>
          {viewer1 && <div><span className='fs-2'>Products:</span><span className='row row-cols-auto'>{showAllItems}</span></div>}

          <hr></hr>
          <h1><u>Show One Product by ID:</u></h1>
          <input type="text" id="message" name="message" placeholder="id" onChange={(e) => getOneProduct(e.target.value)} />
          {viewer2 && <div><span className='fs-2'>Product:</span> {showOneItem}</div>}
          <hr></hr>
        </div>}

        {menu === 1 && <div>
          <h1 className='text-center fs-1 fw-bold text-success fw-underline'><u>Add a New Product:</u></h1>
          <form action="">
            <div className="row">
              <div className="col-auto">
                <label for="_id" className="col-form-label">Product ID</label>
              </div>
              <div className="col-auto">
                <input type="number" className="form-control" placeholder="id?" name="_id" value={addNewProduct._id} onChange={handleChange} />
              </div>
            </div>
            <div className="row">
              <div className="col-auto">
                <label for="title" className="col-form-label">Title</label>
              </div>
              <div className="col-auto">
                <input type="text" placeholder="title?" className="form-control" name="title" value={addNewProduct.title} onChange={handleChange} />
              </div>
            </div>
            <div className="row">
              <div className="col-auto">
                <label for="price" className="col-form-label">Price</label>
              </div>
              <div className="col-auto">
                <input type="number" placeholder="price?" className="form-control" name="price" value={addNewProduct.price} onChange={handleChange} />
              </div>
            </div>
            <div className="row">
              <div className="col-auto">
                <label for="category" className="col-form-label">Product Category</label>
              </div>
              <div className="col-auto">
                <input type="text" placeholder="category?" className="form-control" name="category" value={addNewProduct.category} onChange={handleChange} />
              </div>
            </div>
            <div className="row">
              <div className="col-auto">
                <label for="image" className="col-form-label">Image Filepath</label>
              </div>
              <div className="col-auto">
                <input type="text" placeholder="image?" className="form-control" name="image" value={addNewProduct.image} onChange={handleChange} />
              </div>
            </div>
            <div className="row">
              <div className="col-auto">
                <label for="rate" className="col-form-label">Product Rating</label>
              </div>
              <div className="col-auto">
                <input type="number" placeholder="rate?" className="form-control" name="rate" value={addNewProduct.rating.rate} onChange={handleChange} />
              </div>
            </div>
            <div className="row">
              <div className="col-auto">
                <label for="count" className="col-form-label">Product Count</label>
              </div>
              <div className="col-auto">
                <input type="number" placeholder="count?" className="form-control" name="count" value={addNewProduct.rating.count} onChange={handleChange} />
              </div>
            </div>
            <div className="row">
              <button type="submit" onClick={handleOnSubmit} className="col-auto">
                Submit
              </button>
            </div>
          </form>
        </div>}

        {menu === 4 && <div>
          <h1 className='text-center fs-1 fw-bold text-success fw-underline'><u>Delete One Product:</u></h1>
          <button onClick={() => getOneByOneProductPrev()}>Prev</button>
          <button onClick={() => getOneByOneProductNext()}>Next</button>
          <button onClick={() => deleteOneProduct(product[index]._id)}>Delete</button>
          <div key={product[index]._id}>
            <img src={product[index].image} width={30} alt={product[index].title} /> <br />
            Id:{product[index]._id} <br />
            Title: {product[index].title} <br />
            Category: {product[index].category} <br />
            Price: {product[index].price} <br />
            Rate :{product[index].rating.rate} and Count:
            {product[index].rating.count} <br />
          </div>
        </div>}

        {menu === 3 && <div>
          <h1 className='text-center fs-1 fw-bold text-success fw-underline'><u>Update One Products's Price:</u></h1>
          <button onClick={() => getOneByOneProductPrevU()}>Prev</button>
          <button onClick={() => getOneByOneProductNextU()}>Next</button>
          <div>
            <input type="number" placeholder="New Price" name="updated_price" value={addNewPrice} onChange={handleUpdateChange} />
            <button onClick={() => updateOneProduct(product[index2]._id, addNewPrice)}>Update</button>
            <div key={product[index2]._id}>
              <img src={product[index2].image} width={30} alt={product[index2].title} /> <br />
              Id:{product[index2]._id} <br />
              Title: {product[index2].title} <br />
              Category: {product[index2].category} <br />
              Price: {product[index2].price} <br />
              Rate :{product[index2].rating.rate} and Count:
              {product[index2].rating.count} <br />
            </div>
          </div>
        </div>}

        {menu === 5 && <div>
          <h1 className='text-center fs-1 fw-bold text-success fw-underline'><u>Credits</u></h1>
          <div className='text-center'>
            <p><span className='fw-bold'>Team:</span> #49</p>
            <p><span className='fw-bold'>Member #1:</span> Nathan Geater (nkgeater@iastate.edu)</p>
            <p><span className='fw-bold'>Member #2:</span> Andrew Sand (asand@iastate.edu)</p>
            <p><span className='fw-bold'>Course:</span> SE/ComS 319</p>
            <p><span className='fw-bold'>Instructor:</span> Dr. Aldaco </p>
            <p style={{ maxWidth: `50vw`, marginLeft: `25vw` }}>This basic website was created for assignment #3 for Iowa State University's SE/ComS 319 course in the Spring 2023 semester, exclusively for educational purposes.
              The project utilizes MongoDB, Express, React, and NodeJS to create a simple website that can interface with a locally-run database. Usrs can use the website to create,
              read, update, and delete data from the database, which stores information on various fictional products. Furthermore, this assignment uses
              images from the FakeStoreAPI and styling from Bootstrap, the latter of which is &copy; Bootstrap.
            </p>
          </div>
        </div>}
      </div>
    </div>
  );
} // App end
export default App