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
          window.location.reload();
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
    window.location.reload();
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
    window.location.reload();
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
          <button className='btn btn-success btn-lg' onClick={() => getAllProducts()}>Toggle Showing All Products</button>
          <hr></hr>
          {viewer1 && <div><span className='fs-2'>Products:</span><span className='row row-cols-auto'>{showAllItems}</span></div>}

          <hr></hr>
          <h1><u>Show One Product by ID:</u></h1>
          <input type="text" id="message" name="message" placeholder="id" className='form-control form-control-lg' style={{ maxWidth: `10vw` }} onChange={(e) => getOneProduct(e.target.value)} />
          {viewer2 && <div><span className='fs-2'>Product:</span> {showOneItem}</div>}
          <hr></hr>
        </div>}

        {menu === 1 && <div>
          <h1 className='text-center fs-1 fw-bold text-success fw-underline'><u>Add a New Product:</u></h1>
          <form style={{ maxWidth: `50vw`, marginLeft: `25vw` }}>
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label col-form-label-lg">Product ID</label>
              <div className="col-sm-10">
                <input type="number" className="form-control form-control-lg" placeholder="ID" name="_id" value={addNewProduct._id} onChange={handleChange} />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label col-form-label-lg">Name</label>
              <div className="col-sm-10">
                <input type="text" placeholder="Title" className="form-control form-control-lg" name="title" value={addNewProduct.title} onChange={handleChange} />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label col-form-label-lg">Price</label>
              <div className="col-sm-10">
                <input type="number" placeholder="Price" className="form-control form-control-lg" name="price" value={addNewProduct.price} onChange={handleChange} />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label col-form-label-lg">Product Category</label>
              <div className="col-sm-10">
                <input type="text" placeholder="Category" className="form-control form-control-lg" name="category" value={addNewProduct.category} onChange={handleChange} />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label col-form-label-lg">Image Filepath</label>
              <div className="col-sm-10">
                <input type="text" placeholder="Image" className="form-control form-control-lg" name="image" value={addNewProduct.image} onChange={handleChange} />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label col-form-label-lg">Product Rating</label>
              <div className="col-sm-10">
                <input type="number" placeholder="Rate" className="form-control form-control-lg" name="rate" value={addNewProduct.rating.rate} onChange={handleChange} />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label col-form-label-lg">Product Count</label>
              <div className="col-sm-10">
                <input type="number" placeholder="Count" className="form-control form-control-lg" name="count" value={addNewProduct.rating.count} onChange={handleChange} />
              </div>
            </div>
            <div className="row mb-3">
              <button type="submit" onClick={handleOnSubmit} className="btn btn-success col-auto">
                Submit
              </button>
            </div>
          </form>
        </div>}

        {menu === 4 && <div>
          <h1 className='text-center fs-1 fw-bold text-success fw-underline'><u>Delete One Product:</u></h1>
          
          <div style={{width: `286px`, marginLeft: `41vw`}}>
            <div>
              <div className="row flex-nowrap">
                <div className="col">
                <button className='btn btn-secondary' onClick={() => getOneByOneProductPrev()}>Prev.</button>
                </div>
                <div className="col">
                <button className='btn btn-secondary' onClick={() => getOneByOneProductNext()}>Next</button>
                </div>
                <div className="col">
                <button className='btn btn-success' onClick={() => deleteOneProduct(product[index]._id)}>Delete</button>
                </div>
              </div>
            </div>
          <div key={product[index]._id}>
            <div className='card border border-dark' style={{ width: `18rem` }}>
              <img src={product[index].image} width={20} alt={product[index].title} className='card-img-top' />
              <div className='card-body border border-dark' style={{ background: `lightgray` }}>
                <p className='card-text'><span className='fw-bold'><u>Title:</u></span> {product[index].title}</p>
                <p className='card-text'><span className='fw-bold'><u>Category:</u></span> {product[index].category}</p>
                <p className='card-text'><span className='fw-bold'><u>Price:</u></span> {product[index].price}</p>
                <p className='card-text'><span className='fw-bold'><u>Rate:</u></span> {product[index].rating.rate} <span className='fw-bold'><u>Count:</u></span> {product[index].rating.count}</p>
              </div>
            </div>
            </div>
          </div>
        </div>}

        {menu === 3 && <div>
          <h1 className='text-center fs-1 fw-bold text-success fw-underline'><u>Update One Products's Price:</u></h1>
          <div style={{width: `286px`, marginLeft: `41vw`}}>
            <div>
              <div className="row flex-nowrap">
                <div className="col">
                  <button className='btn btn-secondary' onClick={() => getOneByOneProductPrevU()}>Prev.</button>
                </div>
                <div className="col">
                  <button className='btn btn-secondary' onClick={() => getOneByOneProductNextU()}>Next</button>
                </div>
              </div>
            </div>
            <input style={{maxWidth: `50%`}} type="number" placeholder="New Price" name="updated_price" value={addNewPrice} onChange={handleUpdateChange} />
            <button className='btn btn-success m-2' onClick={() => updateOneProduct(product[index2]._id, addNewPrice)}>Update Price</button>
            <div key={product[index2]._id}>
              <div className='card border border-dark' style={{ width: `18rem` }}>
                <img src={product[index2].image} width={20} alt={product[index2].title} className='card-img-top' />
                <div className='card-body border border-dark' style={{ background: `lightgray` }}>
                  <p className='card-text'><span className='fw-bold'><u>Title:</u></span> {product[index2].title}</p>
                  <p className='card-text'><span className='fw-bold'><u>Category:</u></span> {product[index2].category}</p>
                  <p className='card-text'><span className='fw-bold'><u>Price:</u></span> {product[index2].price}</p>
                  <p className='card-text'><span className='fw-bold'><u>Rate:</u></span> {product[index2].rating.rate} <span className='fw-bold'><u>Count:</u></span> {product[index2].rating.count}</p>
                </div>
              </div>
            </div>
          </div>
        </div>}

        {menu === 5 && <div>
          <h1 className='text-center fs-1 fw-bold text-success fw-underline'><u>Credits</u></h1>
          <div className='text-center'>
            <p><span className='fw-bold'>Team:</span> #49</p>
            <p><span className='fw-bold'>Member #1:</span> Nathan Geater (<a href="mailto:nkgeater@iastate.edu">nkgeater@iastate.edu</a>)</p>
            <p><span className='fw-bold'>Member #2:</span> Andrew Sand (<a href="mailto:asand@iastate.edu">asand@iastate.edu</a>)</p>
            <p><span className='fw-bold'>Course:</span> SE/ComS 319</p>
            <p><span className='fw-bold'>Instructor:</span> Dr. Aldaco </p>
            <p><span className='fw-bold'>Date:</span> 30 Apr. 2023 </p>
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