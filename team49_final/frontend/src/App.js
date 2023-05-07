// import logo from './logo.svg';
import './App.css';

import { useState, useEffect } from 'react';

function App() {
  const [product, setProduct] = useState([]);

  const [oneProduct, setOneProduct] = useState([]);
  const [viewer2, setViewer2] = useState(false);

  const [checked4, setChecked4] = useState(false);
  const [index, setIndex] = useState(0);

  const [checked5, setChecked5] = useState(false);
  const [index2, setIndex2] = useState(0);

  const [menu, setMenu] = useState(2);

  const [showConfirm, setShowConfirm] = useState(false);

  let showCart = false;

  const [nameState, setNameState] = useState('');
  const [emailState, setEmailState] = useState('');
  const [cardState, setCardState] = useState('');
  const [cityState, setCityState] = useState('');
  const [addressState, setAddressState] = useState('');
  const [address2State, setAddress2State] = useState('');
  const [zipState, setZipState] = useState('');
  const [stateState, setStateState] = useState('');

  //Declaring and Initialising the order object for submitting the order
  const order = {
    Name: '',
    Email: '',
    Card: '',
    City: '',
    Address: '',
    Secondary_Address: '',
    Zip: '',
    State: ''
  }

  //Declaring and Initialising Variables used with the submission form
  let inputCard = document.querySelector('#inputCard');

  // new Product
  const [addNewProduct, setAddNewProduct] = useState({
    _id: 0,
    title: '',
    price: 0.0,
    description: '',
    category: '',
    image: 'http://127.0.0.1:4000/images/',
    rating: { rate: 0.0, count: 0 },
  });

  const [addNewPrice, setAddNewPrice] = useState(0);

  useEffect(() => {
    getAllProducts();
    // eslint-disable-next-line
  }, [checked4]);

  function getAllProducts() {
    fetch('http://localhost:4000/')
      .then((response) => response.json())
      .then((data) => {
        console.log('Show Catalog of Products :');
        console.log(data);
        setProduct(data);
      })
    console.log("End of Gett All Products");
  }

  function getOneProduct(id) {
    console.log(id);

    if (id >= 1) {
      fetch('http://localhost:4000/' + id)
        .then((response) => response.json())
        .then((data) => {
          console.log('Show one product :', id);
          console.log(data);
          const dataArr = [];
          dataArr.push(data);
          setOneProduct(dataArr);
          setViewer2(!viewer2);
        })
        .catch((err) => {
          console.log('Wrong number of Product id.');
          setViewer2(false);
        })
    } else {
      console.log('Wrong number of Product id.');
      setViewer2(false);
    }
  }

  function getOneDetailedProduct(id) {
    console.log(id);

    if (id >= 1) {
      fetch('http://localhost:4000/' + id)
        .then((response) => response.json())
        .then((data) => {
          console.log('Show one product page :', id);
          console.log(data);
          const dataArr = [];
          dataArr.push(data);
          setOneProduct(dataArr);
        })
        .catch((err) => {
          console.log('Wrong number of Product id.');
        })
    } else {
      console.log('Wrong number of Product id.');
    }
  }

  function handleChange(evt) {
    const value = evt.target.value;
    if (evt.target.name === '_id') {
      setAddNewProduct({ ...addNewProduct, _id: value });
    } else if (evt.target.name === 'title') {
      setAddNewProduct({ ...addNewProduct, title: value });
    } else if (evt.target.name === 'price') {
      setAddNewProduct({ ...addNewProduct, price: value });
    } else if (evt.target.name === 'description') {
      setAddNewProduct({ ...addNewProduct, description: value });
    } else if (evt.target.name === 'category') {
      setAddNewProduct({ ...addNewProduct, category: value });
    } else if (evt.target.name === 'image') {
      const temp = value;
      setAddNewProduct({ ...addNewProduct, image: temp });
    } else if (evt.target.name === 'rate') {
      console.log(value);
      setAddNewProduct({ ...addNewProduct, rating: { rate: value } });
    } else if (evt.target.name === 'count') {
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
    fetch('http://localhost:4000/insert', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(addNewProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Post a new product completed');
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
    console.log('Product to delete :', deleteid);
    fetch('http://localhost:4000/delete/', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _id: deleteid }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Delete a product completed : ', deleteid);
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
    console.log('Product to update :', updateid);
    console.log('Value to update :', new_price);
    fetch('http://localhost:4000/update/', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
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
    setChecked5(!checked5);
    window.location.reload();
  }

  //Adds the product to the cart
  const addToCart = (addID, addValue) => {
    const newVal = +product.find(x => x._id === addID).inCart + +addValue;

    console.log(newVal);

    fetch('http://localhost:4000/update/', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _id: addID, inCart: newVal }),
    })
      .then((response) => console.log(response))
      .then((data) => {
        console.log("Updating the product's quantity completed : ", newVal);
        console.log(data);
        if (data) {
          //const keys = Object.keys(data);
          const value = Object.values(data);
          alert(value);
        }
      });
    getAllProducts();
    console.log("End of Add To Cart");
    console.log(product);
  };

  //Removes the product from the cart
  const removeFromCart = (remID, remValue) => {
    let newVal = +product.find(x => x._id === remID).inCart - +remValue;

    if (newVal < 0) {
      newVal = 0;
    }

    fetch('http://localhost:4000/update/', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _id: remID, inCart: newVal }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Updating the product's quantity completed : ", newVal);
        console.log(data);
        if (data) {
          //const keys = Object.keys(data);
          const value = Object.values(data);
          alert(value);
        }
      });
    getAllProducts();
  }

  const showAllItems = product.map((el) => (
    <div key={el._id} className='col mt-3'>
      <div className='card border border-dark' style={{ width: `18rem` }}>
        <img src={el.image} width={20} alt={el.title} className='card-img-top' />
        <div className='card-body border border-dark' style={{ background: `lightgray` }}>
          <p className='card-text'><span className='fw-bold'><u>Title:</u></span> {el.title}</p>
          <p className='card-text'><span className='fw-bold'><u>Genres:</u></span> {el.genres}</p>
          <p className='card-text'><span className='fw-bold'><u>Price:</u></span> ${el.price}</p>
          <p className='card-text'><span className='fw-bold'><u>Rating:</u></span> {el.rating.rate} ({el.rating.count})</p>
          <p className='card-text'><span className='fw-bold'><u>Recommended By:</u></span> {el.recommender}</p>
          <div className='add-buttons'>
            <input id={el._id} type="number" className="form-control" defaultValue={1} placeholder="Quantity" />
            <button type="button" className='bg-lime-500 hover:bg-lime-700 fw-bold py-2 px-4 rounded' onClick={() => removeFromCart(el._id, document.getElementById(el._id).value)} > - </button>
            <button type="button" className='bg-lime-500 hover:bg-lime-700 fw-bold py-2 px-4 rounded' onClick={() => addToCart(el._id, document.getElementById(el._id).value)}> + </button>
          </div>
          <button className='btn btn-success' onClick={() => { setMenu(7); getOneDetailedProduct(el._id); window.scroll({ top: 0, left: 0, behavior: "instant" }); }}>Go to Store Page</button>
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

  const showDetailedPage = oneProduct.map((el) => (
    <div key={el._id}>
      <table style={{ marginTop: `10px` }}>
        <tr>
          <td><img id='image' className='details-imgs card shadow-sm card-border' src={el.image} /></td>
          <td>
            <h1 id='title' style={{ position: `relative`, left: `27vw`, maxWidth: `30vw` }}>{el.title}</h1>
            <p id='description' style={{ position: `relative`, top: `1vh`, left: `30vw`, wordWrap: `break-word`, maxWidth: `25vw` }}>{el.description}</p>
          </td>
        </tr>
      </table>
      <div className='info-grid'>
        <h3 className='info-grid-text'>Price</h3>
        <h3 className='info-grid-text'>${el.price}</h3>
        <h3 className='info-grid-text'>Reviews</h3>
        <h3 className='info-grid-text'>{el.rating.rate} ({el.rating.count})</h3>
        <h3 className='info-grid-text'>Release Date</h3>
        <h3 id='relDate' className='info-grid-text'>{el.releaseDate}</h3>
        <h3 className='info-grid-text'>Developer</h3>
        <h3 id='dev' className='info-grid-text'>{el.developer}</h3>
        <h3 className='info-grid-text'>Publisher</h3>
        <h3 id='pub' className='info-grid-text'>{el.publisher}</h3>
        <h3 className='info-grid-text'>Platforms</h3>
        <h3 id='platforms' className='info-grid-text'>{el.platforms}</h3>
        <h3 className='info-grid-text'>Genres</h3>
        <h3 id='genres' className='info-grid-text'>{el.genres}</h3>
        <h3 className='info-grid-text'>No. of Players</h3>
        <h3 id='numPlayers' className='info-grid-text'>{el.numOfPlayers}</h3>
        <h3 className='info-grid-text'>Recommended By</h3>
        <h3 id='recommended' className='info-grid-text'>{el.recommender}</h3>
      </div>
      <div style={{ marginBottom: `50px`, textAlign: `center` }}>
        <h1 style={{ textAlign: `center` }}>Gameplay Images</h1>
        <img id='image2' className='gameplay-images' src={el.image2} />
        <img id='image3' className='gameplay-images' src={el.image3} />
      </div>
    </div>
  ));

  //Function used to list the items on the cart screen
  const listItems = product.map((el) => (
    // PRODUCT
    <div key={el._id}>
      {el.inCart > 0 && <div className="row border-top border-bottom">
        <div className="row main align-items-center">
          <div className="col-2">
            <img className="img-fluid" src={el.image} alt={el.title} />
          </div>
          <div className="col">
            <div className="row">{el.title}</div>
            <div className="row text-muted">{el.genres}</div>
          </div>
          <div className="col">
            <button className="btn fw-bold btn-outline-secondary" type="button" onClick={() => removeFromCart(el._id, 1)} > - </button>
            <button className="btn fw-bold btn-outline-secondary" type="button" onClick={() => addToCart(el._id, 1)}> + </button>
          </div>
          <div className="col">
            ${el.price} <span className="close">&#10005;</span>{el.inCart}
          </div>
        </div>
      </div>}
    </div>
  ));

  const confirmItems = product.map((el) => (
    // PRODUCT
    <div key={el._id}>
      {el.inCart > 0 && <div className="row border-top border-bottom">
        <div className="row main align-items-center">
          <div className="col-2">
            <img className="img-fluid" src={el.image} alt={el.title} />
          </div>
          <div className="col">
            <div className="row">{el.title}</div>
            <div className="row text-muted">{el.genres}</div>
          </div>
          <div className="col">
            ${el.price} <span className="close">&#10005;</span>{el.inCart}
          </div>
        </div>
      </div>}
    </div>
  ));

  //Tests if the input is numeric
  function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  let validate = function () {
    let val = true;
    let email = document.getElementById('inputEmail4')
    let name = document.getElementById('inputName')
    let card = document.getElementById('inputCard')
    let city = document.getElementById('inputCity');
    let address = document.getElementById('inputAddress');
    let zip = document.getElementById('inputZip');
    let state = document.getElementById('inputState');
    let address2 = document.getElementById('inputAddress2');
    //Check Email Address
    if (!email.value.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      email.setAttribute("class", "form-control is-invalid");
      val = false;
    }
    else {
      email.setAttribute("class", "form-control is-valid");
      order.Email = email.value;
      setEmailState(email.value)
    }
    //Check Name
    if (name.value.length === 0) {
      name.setAttribute("class", "form-control is-invalid")
      val = false
    }
    else {
      name.setAttribute("class", "form-control is-valid");
      order.Name = name.value;
      setNameState(name.value);
    }
    //Check Credit Card
    if (!card.value.match(/^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/)) {
      card.setAttribute("class", "form-control is-invalid")
      val = false
    }
    else {
      card.setAttribute("class", "form-control is-valid");
      order.Card = card.value;
      setCardState(card.value);
    }
    //Check City
    if (city.value.length === 0) {
      city.setAttribute("class", "form-control is-invalid")
      val = false
    }
    else {
      city.setAttribute("class", "form-control is-valid");
      order.City = city.value;
      setCityState(city.value);
    }
    //Check Address
    if (address.value.length === 0) {
      address.setAttribute("class", "form-control is-invalid")
      val = false
    }
    else {
      address.setAttribute("class", "form-control is-valid");
      order.Address = address.value;
      setAddressState(address.value);
    }
    //Zip Code
    if (zip.value.length === 5 && !isNaN(zip.value)) {
      zip.setAttribute("class", "form-control is-valid");
      order.Zip = zip.value;
      setZipState(zip.value);
    }
    else {
      zip.setAttribute("class", "form-control is-invalid")
      val = false
    }
    //Check State
    if (state.options[state.selectedIndex].text === 'Choose...') {
      state.setAttribute("class", "form-control is-invalid")
      val = false
    }
    else {
      state.setAttribute("class", "form-control is-valid");
      order.State = state.value;
      setStateState(state.value);
    }
    //Checking Secondary Address
    if (address2.value.length > 0) {
      order.Secondary_Address = address2.value;
      setAddress2State(address2.value);
    }

    if (val) {
      handleShowHideConfirm(true);
    }

    return val;
  }

  //Toggles between the catalog and cart view
  function handleShowHideConfirm(test) {
    showCart = !test;
    setShowConfirm(test);

    window.scroll({ top: 0, left: 0, behavior: "instant" });

    if (test) {
      setMenu(8);
      document.querySelector('.card').classList.remove("collapse");

      for (let i = 0; i < 8; i++) {
        document.querySelector('.card > ul').innerHTML = '';
      }

      for (const [key, value] of Object.entries(order)) {
        // eslint-disable-next-line
        document.querySelector('.card > ul').innerHTML += '<li className="list-group-item"> <b>' + `${key}` +
          // eslint-disable-next-line
          ': </b>' + `${value}` + '</li>'
      }
    }
    else{
      setMenu(6);
    }
  }

  const alert = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
      `<div className="alert alert-${type} alert-dismissible" role="alert">`,
      ` <div>${message}</div>`,
      //' <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label = "Close" ></button > ',
      '</div>'
    ].join('')

    document.getElementById('liveAlertPlaceholder').append(wrapper);
  }

  let cartConfig = function () {
    //Add event listener for credit card formatting
    inputCard = document.querySelector('#inputCard');
    inputCard.addEventListener('input', event => {
      if (!inputCard.value) {
        return event.preventDefault();
      }
      else {
        inputCard.value = inputCard.value.replace(/-/g, '');
        let newVal = '';
        for (var i = 0, nums = 0; i < inputCard.value.length; i++) {
          if (nums !== 0 && nums % 4 === 0) {
            newVal += '-';
          }

          newVal += inputCard.value[i];
          if (isNumeric(inputCard.value[i])) {
            nums++;
          }
        }
        inputCard.value = newVal;
      }
    });

    //Add event listener for checkout form validity
    document.getElementById('checkout-form').addEventListener('submit', event => {
      if (!validate()) {
        document.getElementById('liveAlertPlaceholder').innerHTML = ''
        alert('<i className="bi-exclamation-circle"></i> Invalid Input! See the errors below for details.', 'danger')
      }
      event.preventDefault();
      event.stopPropagation();
    }, false);
  }

  if (menu == 6) {
    showCart = true;
  }
  else {
    showCart = false;
  }

  function handleOrderSubmission(){
    order.Name = nameState;
    order.Email =emailState;
    order.Card = cardState;
    order.City = cityState;
    order.Address = addressState;
    order.Secondary_Address = address2State;
    order.Zip = zipState;
    order.State = stateState;
    console.log(order);
    fetch('http://localhost:4000/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Post a new order completed');
        console.log(data);
        if (data) {
          //const keys = Object.keys(data);
          const value = Object.values(data);
          alert(value);
          window.location.reload();
        }
      });
  }

  return (
    <div style={{ background: `linear-gradient(lightblue, lightgreen)`, minHeight: `100vh` }}>
      <div style={{ textAlign: 'center' }}>
        <h1>SE/ComS 319 Final Project: Fake Video Game Store</h1>
        <nav className='navbar navbar-expand-lg bg-body-tertiary border border-dark' style={{ background: `radial-gradient(#cfcfcf, #a2b0a3)` }}>
          <div className='container-fluid'>
            <div className='collapse navbar-collapse justify-content-center'>
              <div className='btn-group-lg' role='group'>
                {/* <button className='btn btn-success' style={{ marginLeft: `15px`, marginRight: `15px` }} onClick={() => setMenu(1)}>Create</button> */}
                <button className='btn btn-success' aria-current='page' style={{ marginLeft: `15px`, marginRight: `15px` }} onClick={() => {setMenu(2); setShowConfirm(false)}}>Catalog</button>
                {/* <button className='btn btn-success' style={{ marginLeft: `15px`, marginRight: `15px` }} onClick={() => setMenu(3)}>Update</button> */}
                {/* <button className='btn btn-success' style={{ marginLeft: `15px`, marginRight: `15px` }} onClick={() => setMenu(4)}>Delete</button> */}
                <button className='btn btn-success' style={{ marginLeft: `15px`, marginRight: `15px` }} onClick={() => { setMenu(6); cartConfig(); setShowConfirm(false)}}>View Cart & Checkout</button>
                <button className='btn btn-success' style={{ marginLeft: `15px`, marginRight: `15px` }} onClick={() => {setMenu(5); setShowConfirm(false)}}>About & Credits</button>
              </div>
            </div>
          </div>
        </nav>
      </div>

      <div className='m-4'>
        {menu === 2 && <div>
          <h1 className='text-center fs-1 fw-bold text-success fw-underline'><u>View Products:</u></h1>
          <button className='btn btn-success btn-lg' onClick={() => getAllProducts()}>Refresh Products</button>
          <hr></hr>
          <div><span className='fs-2'>Products:</span><span className='row row-cols-auto'>{showAllItems}</span></div>

          <hr></hr>
          <h1><u>Show One Product by ID:</u></h1>
          <input type='text' id='message' name='message' placeholder='id' className='form-control form-control-lg' style={{ maxWidth: `10vw` }} onChange={(e) => getOneProduct(e.target.value)} />
          {viewer2 && <div><span className='fs-2'>Product:</span> {showOneItem}</div>}
          <hr></hr>
        </div>}

        {menu === 1 && <div>
          <h1 className='text-center fs-1 fw-bold text-success fw-underline'><u>Add a New Product:</u></h1>
          <form style={{ maxWidth: `50vw`, marginLeft: `25vw` }}>
            <div className='row mb-3'>
              <label className='col-sm-2 col-form-label col-form-label-lg'>Product ID</label>
              <div className='col-sm-10'>
                <input type='number' className='form-control form-control-lg' placeholder='ID' name='_id' value={addNewProduct._id} onChange={handleChange} />
              </div>
            </div>
            <div className='row mb-3'>
              <label className='col-sm-2 col-form-label col-form-label-lg'>Name</label>
              <div className='col-sm-10'>
                <input type='text' placeholder='Title' className='form-control form-control-lg' name='title' value={addNewProduct.title} onChange={handleChange} />
              </div>
            </div>
            <div className='row mb-3'>
              <label className='col-sm-2 col-form-label col-form-label-lg'>Price</label>
              <div className='col-sm-10'>
                <input type='number' placeholder='Price' className='form-control form-control-lg' name='price' value={addNewProduct.price} onChange={handleChange} />
              </div>
            </div>
            <div className='row mb-3'>
              <label className='col-sm-2 col-form-label col-form-label-lg'>Product Category</label>
              <div className='col-sm-10'>
                <input type='text' placeholder='Category' className='form-control form-control-lg' name='category' value={addNewProduct.category} onChange={handleChange} />
              </div>
            </div>
            <div className='row mb-3'>
              <label className='col-sm-2 col-form-label col-form-label-lg'>Image Filepath</label>
              <div className='col-sm-10'>
                <input type='text' placeholder='Image' className='form-control form-control-lg' name='image' value={addNewProduct.image} onChange={handleChange} />
              </div>
            </div>
            <div className='row mb-3'>
              <label className='col-sm-2 col-form-label col-form-label-lg'>Product Rating</label>
              <div className='col-sm-10'>
                <input type='number' placeholder='Rate' className='form-control form-control-lg' name='rate' value={addNewProduct.rating.rate} onChange={handleChange} />
              </div>
            </div>
            <div className='row mb-3'>
              <label className='col-sm-2 col-form-label col-form-label-lg'>Product Count</label>
              <div className='col-sm-10'>
                <input type='number' placeholder='Count' className='form-control form-control-lg' name='count' value={addNewProduct.rating.count} onChange={handleChange} />
              </div>
            </div>
            <div className='row mb-3'>
              <button type='submit' onClick={handleOnSubmit} className='btn btn-success col-auto'>
                Submit
              </button>
            </div>
          </form>
        </div>}

        {menu === 4 && <div>
          <h1 className='text-center fs-1 fw-bold text-success fw-underline'><u>Delete One Product:</u></h1>

          <div style={{ width: `286px`, marginLeft: `41vw` }}>
            <div>
              <div className='row flex-nowrap'>
                <div className='col'>
                  <button className='btn btn-secondary' onClick={() => getOneByOneProductPrev()}>Prev.</button>
                </div>
                <div className='col'>
                  <button className='btn btn-secondary' onClick={() => getOneByOneProductNext()}>Next</button>
                </div>
                <div className='col'>
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
          <div style={{ width: `286px`, marginLeft: `41vw` }}>
            <div>
              <div className='row flex-nowrap'>
                <div className='col'>
                  <button className='btn btn-secondary' onClick={() => getOneByOneProductPrevU()}>Prev.</button>
                </div>
                <div className='col'>
                  <button className='btn btn-secondary' onClick={() => getOneByOneProductNextU()}>Next</button>
                </div>
              </div>
            </div>
            <input style={{ maxWidth: `50%` }} type='number' placeholder='New Price' name='updated_price' value={addNewPrice} onChange={handleUpdateChange} />
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
          <h1 className='text-center fs-1 fw-bold text-success fw-underline'><u>About & Credits</u></h1>
          <div className='text-center'>
            <p><span className='fw-bold'>Team:</span> #49</p>
            <p><span className='fw-bold'>Member #1:</span> Nathan Geater (<a href='mailto:nkgeater@iastate.edu'>nkgeater@iastate.edu</a>)</p>
            <p><span className='fw-bold'>Member #2:</span> Andrew Sand (<a href='mailto:asand@iastate.edu'>asand@iastate.edu</a>)</p>
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
        {<div id='topCart' style={{ display: showCart ? 'contents' : 'none' }}>
          {/* Shopping Cart Page */}
          <div id='top_cart'>
            <div>
              <div className="py-1"></div>
              <div className="card">
                <div className="row">
                  {/* HERE, IT IS THE SHOPING CART */}
                  <div className="col-md-8 cart">
                    <div className="title">
                      <div className="row">
                        <div className="col">
                          <h4>
                            <b>Your Shopping Cart</b>
                          </h4>
                        </div>
                        <div className="col align-self-center text-right text-muted">
                          Products selected
                          {/* {cart.length} */}
                        </div>
                      </div>
                    </div>
                    <div>{listItems}</div>
                  </div>
                  <div className="float-end">
                    <p className="mb-0 me-5 d-flex align-items-center">
                      <span className="small text-muted me-2">Cost of Cart:</span>
                      {/* <span className="lead fw-normal">${Math.round(cartTotal * 100) / 100}</span> */}
                    </p>
                    <p className="mb-0 me-5 d-flex align-items-center">
                      <span className="small text-muted me-2">Tax:</span>
                      {/* <span className="lead fw-normal">${Math.round((cartTotal * 0.07) * 100) / 100}</span> */}
                    </p>
                    <p className="mb-0 me-5 d-flex align-items-center">
                      <span className="small text-muted me-2">Order Total:</span>
                      {/* <span className="lead fw-normal">${Math.round((cartTotal + cartTotal * 0.07) * 100) / 100}</span> */}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-2"></div>
                <div className="col-8">
                  <h1>Order Checkout Form</h1>
                  <div id="liveAlertPlaceholder"></div>
                  <form className="row g-3" id="checkout-form">

                    {/* Full Name */}
                    <div className="col-md-6">
                      <label htmlFor="inputName" className="form-label">Name</label>
                      <input type="text" className="form-control" id="inputName" />
                      <div className="invalid-feedback">
                        Invalid Name. Example: "John Doe"
                      </div>
                    </div>

                    {/* Email */}
                    <div className="col-md-6">
                      <label htmlFor="inputEmail4" className="form-label">Email</label>
                      <input type="email" className="form-control" id="inputEmail4" />
                      <div className="invalid-feedback">
                        Invalid Email Address. Must be formatted like "abc@xyz.efg"
                      </div>
                    </div>

                    {/* Credit Card */}
                    <div className="col-12">
                      <label htmlFor="inputCard" className="form-label">Credit Card</label>
                      <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1"><i className="bi-credit-card-fill"></i></span>
                        <input type="text" id="inputCard" className="form-control" placeholder="XXXX-XXXX-XXXX-XXXX"
                          aria-label="Username" aria-describedby="basic-addon1" />
                        <div className="invalid-feedback">
                          Invalid Credit Card Number. Must be formatted like "5555-5555-5555-5555"
                        </div>
                      </div>
                    </div>

                    {/* Shipping Address */}
                    <div className="col-12">
                      <label htmlFor="inputAddress" className="form-label">Shipping Address</label>
                      <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" />
                      <div className="invalid-feedback">
                        Invalid Shipping Address. Must be formatted like "1234 Main St"
                      </div>
                    </div>

                    {/* Secondary Address */}
                    <div className="col-12">
                      <label htmlFor="inputAddress2" className="form-label">Secondary Address</label>
                      <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
                    </div>

                    {/* City */}
                    <div className="col-md-6">
                      <label htmlFor="inputCity" className="form-label">City</label>
                      <input type="text" className="form-control" id="inputCity" />
                      <div className="invalid-feedback">
                        Invalid City. Must be formatted like "Berlin"
                      </div>
                    </div>

                    {/* State */}
                    <div className="col-md-4">
                      <label htmlFor="inputState" className="form-label">State</label>
                      <select id="inputState" className="form-select">
                        <option defaultValue={"Selected"}>Choose...</option>
                        <option>Alabama</option>
                        <option>Alaska</option>
                        <option>Arizona</option>
                        <option>Arkansas</option>
                        <option>California</option>
                        <option>Colorado</option>
                        <option>Connecticut</option>
                        <option>Delaware</option>
                        <option>Florida</option>
                        <option>Georgia</option>
                        <option>Hawaii</option>
                        <option>Idaho</option>
                        <option>Illinois</option>
                        <option>Indiana</option>
                        <option>Iowa</option>
                        <option>Kansas</option>
                        <option>Kentucky</option>
                        <option>Louisiana</option>
                        <option>Maine</option>
                        <option>Maryland</option>
                        <option>Massachusetts</option>
                        <option>Michigan</option>
                        <option>Minnesota</option>
                        <option>Mississippi</option>
                        <option>Missouri</option>
                        <option>Montana</option>
                        <option>Nebraska</option>
                        <option>Nevada</option>
                        <option>New Hampshire</option>
                        <option>New Jersey</option>
                        <option>New Mexico</option>
                        <option>New York</option>
                        <option>North Carolina</option>
                        <option>North Dakota</option>
                        <option>Ohio</option>
                        <option>Oklahoma</option>
                        <option>Oregon</option>
                        <option>Pennsylvania</option>
                        <option>Rhode Island</option>
                        <option>South Carolina</option>
                        <option>South Dakota</option>
                        <option>Tennessee</option>
                        <option>Texas</option>
                        <option>Utah</option>
                        <option>Vermont</option>
                        <option>Virginia</option>
                        <option>Washington</option>
                        <option>West Virginia</option>
                        <option>Wisconsin</option>
                        <option>Wyoming</option>
                      </select>
                      <div className="invalid-feedback">
                        Invalid State. Something other than the default must be chosen.
                      </div>
                    </div>

                    {/* Zip Code */}
                    <div className="col-md-2">
                      <label htmlFor="inputZip" className="form-label">Zip Code</label>
                      <input type="text" className="form-control" id="inputZip" />
                      <div className="invalid-feedback">
                        Invalid Zip Code. Must be formatted like "55555"
                      </div>
                    </div>

                    {/* Order Button */}
                    <div className="col-12">
                      <button type="submit" className="btn btn-success"> <i className="bi-bag-check"></i> Proceed to Confirmation</button>
                    </div>
                  </form>
                </div>
                <div className="col-2"></div>
              </div>
            </div>
          </div>
        </div>}
        {menu === 7 && <div>
          <div>{showDetailedPage}</div>
        </div>}
        {/* Checkout Confirmation Page */}

        <div id='top_confirm' style={{ display: showConfirm ? 'contents' : 'none' }}>
          <div>
            <b>
              {/* Return Button */}
              <button className="bg-lime-600 rounded-full px-3 py-1
               text-sm font-semibold text-gray-700 mr-2 mt-2" onClick={() => handleShowHideConfirm(false)}>Return to Cart</button>
            </b>


            <div className="card" style={{ width: '18rem' }}>
              <div className="card-body">
                <h5 className="card-title">Order summary</h5>
                <p className="card-text">Here is a summary of your order.</p>
              </div>
              <div>{confirmItems}</div>
              <div className="float-end">
                <p className="mb-0 me-5 d-flex align-items-center">
                  <span className="small text-muted me-2">Cost of Cart:</span>
                  {/* <span className="lead fw-normal">${Math.round(cartTotal * 100) / 100}</span> */}
                </p>
                <p className="mb-0 me-5 d-flex align-items-center">
                  <span className="small text-muted me-2">Tax:</span>
                  {/* <span className="lead fw-normal">${Math.round((cartTotal * 0.07) * 100) / 100}</span> */}
                </p>
                <p className="mb-0 me-5 d-flex align-items-center">
                  <span className="small text-muted me-2">Order Total:</span>
                  {/* <span className="lead fw-normal">${Math.round((cartTotal + cartTotal * 0.07) * 100) / 100}</span> */}
                </p>
              </div>
              <ul className="list-group list-group-flush">

              </ul>
              <button className="btn btn-secondary" onClick={() => handleOrderSubmission()}>Confirm and Place Order</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} // App end
export default App