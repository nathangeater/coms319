// import logo from './logo.svg';
import './App.css';

import { useState, useEffect } from 'react';

function App() {
  const [product, setProduct] = useState([]);
  const [placedOrders, setPlacedOrders] = useState([]);
  const [oneProduct, setOneProduct] = useState([]);
  const [viewer2, setViewer2] = useState(false);
  // eslint-disable-next-line
  const [checked4, setChecked4] = useState(false);
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

  const [cart, setCart] = useState([0, 0, 0, 0, 0, 0, 0]);

  const [cartTotal, setCartTotal] = useState(0);

  const gamePrices = [14.99, 19.99, 39.99, 14.99, 9.99, 24.99, 9.99];

  const [updateOrder, setUpdateOrder] = useState({
    name: "",
    email: "",
    card: "",
    city: "",
    address: "",
    secondary_address: "",
    zip: "",
    state: ""
  });

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

  useEffect(() => {
    getAllProducts();
    getAllOrders();
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
    console.log("End of Get All Products");
  }

  function getAllOrders() {
    fetch('http://localhost:4000/getOrders')
      .then((response) => response.json())
      .then((data) => {
        console.log('Show List of Orders :');
        console.log(data);
        setPlacedOrders(data);
      })
    console.log("End of Get All Orders");
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
    if (evt.target.name === "name") {
      setUpdateOrder({ ...updateOrder, name: value });
    } else if (evt.target.name === "email") {
      setUpdateOrder({ ...updateOrder, email: value });
    } else if (evt.target.name === "card") {
      setUpdateOrder({ ...updateOrder, card: value });
    } else if (evt.target.name === "city") {
      setUpdateOrder({ ...updateOrder, city: value });
    } else if (evt.target.name === "address") {
      setUpdateOrder({ ...updateOrder, address: value });
    } else if (evt.target.name === "secondary_address") {
      setUpdateOrder({ ...updateOrder, secondary_address: value });
    } else if (evt.target.name === "zip") {
      setUpdateOrder({ ...updateOrder, zip: value });
    } else if (evt.target.name === "state") {
      setUpdateOrder({ ...updateOrder, state: value });
    }
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    console.log(updateOrder);
    fetch('http://localhost:4000/updateOrder', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateOrder),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Updating the order : ",);
        console.log(data);
        if (data) {
          //const keys = Object.keys(data);
          const value = Object.values(data);
          alert(value);
        }
      });
    window.location.reload();
  }

  function deleteOneOrder(deleteid) {
    console.log('Order to delete :', deleteid);
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
    getAllOrders();
  }

  //Adds the product to the cart
  const addToCart = (addID, addValue) => {
    const newCart = cart.slice();
    newCart[addID - 1] = +cart[(addID - 1)] + +addValue;
    setCart(newCart);
    setCartTotal(cartTotal + (gamePrices[addID - 1] * addValue));
    console.log("This is the new cart: " + cart);
  };

  //Removes the product from the cart
  const removeFromCart = (remID, remValue) => {
    const newCart = cart.slice();
    let newVal = +cart[(remID - 1)] - +remValue;

    setCartTotal(cartTotal - (gamePrices[remID - 1] * remValue));

    if (newVal < 0) {
      newVal = 0;
      setCartTotal(0);
    }

    newCart[remID - 1] = newVal;
    setCart(newCart);
    console.log("This is the new cart: " + cart);
  }

  const showAllItems = product.map((el) => (
    <div key={el._id} className='col mt-3'>
      <div className='card border border-dark shadow-lg' style={{ width: `18rem` }}>
        <img src={el.image} width={20} alt={el.title} className='card-img-top' />
        <div className='card-body border border-dark' style={{ background: `lightgray` }}>
          <p className='card-text'><span className='fw-bold'><u>Title:</u></span> {el.title}</p>
          <p className='card-text'><span className='fw-bold'><u>Genres:</u></span> {el.genres}</p>
          <p className='card-text'><span className='fw-bold'><u>Price:</u></span> ${el.price}</p>
          <p className='card-text'><span className='fw-bold'><u>Rating:</u></span> {el.rating.rate} ({el.rating.count})</p>
          <p className='card-text'><span className='fw-bold'><u>Recommended By:</u></span> {el.recommender}</p>
          <input id={el._id} type="number" className="form-control mb-2" defaultValue={1} placeholder="Quantity" />
          <div className='add-buttons pb-2'>
            <button type="button" className='bg-lime-500 hover:bg-lime-700 fw-bold py-2 px-4 rounded' onClick={() => removeFromCart(el._id, document.getElementById(el._id).value)} > - </button>
            <button type="button" className='bg-lime-500 hover:bg-lime-700 fw-bold py-2 px-4 rounded' onClick={() => addToCart(el._id, document.getElementById(el._id).value)}> + </button>
          </div>
          <button className='btn btn-success' onClick={() => { setMenu(7); getOneDetailedProduct(el._id); window.scroll({ top: 0, left: 0, behavior: "instant" }); }}>Go to Store Page</button>
        </div>
      </div>
    </div>
  ));

  const showAllOrders = placedOrders.map((el) => (
    <div key={el._id} className='col mt-3'>
      <div className='card border border-dark shadow-lg' style={{ width: `18rem` }}>
        <div className='card-body border border-dark' style={{ background: `lightgray` }}>
          <p className='card-text'><span className='fw-bold'><u>ID:</u></span> {el._id}</p>
          <p className='card-text'><span className='fw-bold'><u>Name:</u></span> {el.name}</p>
          <p className='card-text'><span className='fw-bold'><u>Email:</u></span> {el.email}</p>
          <p className='card-text'><span className='fw-bold'><u>Card:</u></span> {el.card}</p>
          <p className='card-text'><span className='fw-bold'><u>City:</u></span> {el.city}</p>
          <p className='card-text'><span className='fw-bold'><u>Address:</u></span> {el.address}</p>
          <p className='card-text'><span className='fw-bold'><u>Secondary Address:</u></span> {el.secondary_address}</p>
          <p className='card-text'><span className='fw-bold'><u>Zip:</u></span> {el.zip}</p>
          <p className='card-text'><span className='fw-bold'><u>State:</u></span> {el.state}</p>
          <button className='btn btn-warning' onClick={() => { setMenu(10); setUpdateOrder({ _id: el._id, name: el.name, email: el.email, card: el.card, city: el.city, address: el.address, secondary_address: el.secondary_address, zip: el.zip, state: el.state }); }}>Edit</button>
          <button className='btn btn-danger' onClick={() => deleteOneOrder(el._id)}>Delete</button>
        </div>
      </div>
    </div>
  ));

  const showOneItem = oneProduct.map((el) => (
    <div key={el._id}>
      <div className='card border border-dark shadow-lg' style={{ width: `18rem` }}>
        <img src={el.image} width={20} alt={el.title} className='card-img-top' />
        <div className='card-body border border-dark' style={{ background: `lightgray` }}>
          <p className='card-text'><span className='fw-bold'><u>Title:</u></span> {el.title}</p>
          <p className='card-text'><span className='fw-bold'><u>Category:</u></span> {el.category}</p>
          <p className='card-text'><span className='fw-bold'><u>Price:</u></span> {el.price}</p>
          <p className='card-text'><span className='fw-bold'><u>Rating:</u></span> {el.rating.rate} ({el.rating.count})</p>
          <p className='card-text'><span className='fw-bold'><u>Recommended By:</u></span> {el.recommender}</p>
          <input id={el._id} type="number" className="form-control mb-2" defaultValue={1} placeholder="Quantity" />
          <div className='add-buttons pb-2'>
            <button type="button" className='bg-lime-500 hover:bg-lime-700 fw-bold py-2 px-4 rounded' onClick={() => removeFromCart(el._id, document.getElementById(el._id).value)} > - </button>
            <button type="button" className='bg-lime-500 hover:bg-lime-700 fw-bold py-2 px-4 rounded' onClick={() => addToCart(el._id, document.getElementById(el._id).value)}> + </button>
          </div>
          <button className='btn btn-success' onClick={() => { setMenu(7); getOneDetailedProduct(el._id); window.scroll({ top: 0, left: 0, behavior: "instant" }); }}>Go to Store Page</button>
        </div>
      </div>
    </div>
  ));

  const showDetailedPage = oneProduct.map((el) => (
    <div key={el._id}>
      <table style={{ marginTop: `10px` }}>
        <tr>
          <td><img id='image' className='details-imgs card shadow-sm card-border' src={el.image} alt={el.title} /></td>
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
        <img id='image2' className='gameplay-images' src={el.image2} alt={el.title + "2"} />
        <img id='image3' className='gameplay-images' src={el.image3} alt={el.title + "3"} />
      </div>
    </div>
  ));

  //Function used to list the items on the cart screen
  const listItems = product.map((el) => (
    // PRODUCT
    <div key={el._id}>
      {cart[el._id - 1] > 0 && <div className="row border-top border-bottom">
        <div className="row main align-items-center">
          <div className="col-2">
            <img className="img-fluid border border-secondary border-2 shadow-sm" src={el.image} alt={el.title} />
          </div>
          <div className="col">
            <div className="row fw-bold">{el.title}</div>
            <div className="row text-muted">{el.genres}</div>
          </div>
          <div className="col">
            <button className="btn fw-bold btn-outline-secondary" type="button" onClick={() => removeFromCart(el._id, 1)} > - </button>
            <button className="btn fw-bold btn-outline-secondary" type="button" onClick={() => addToCart(el._id, 1)}> + </button>
          </div>
          <div className="col">
            ${el.price} <span className="close">&#10005;</span> {cart[el._id - 1]}
          </div>
        </div>
      </div>}
    </div>
  ));

  const confirmItems = product.map((el) => (
    // PRODUCT
    <div key={el._id}>
      {cart[el._id - 1] > 0 && <div className="row border-top border-bottom">
        <div className="row main align-items-center">
          <div className="col-2">
            <img className="img-fluid" src={el.image} alt={el.title} />
          </div>
          <div className="col">
            <div className="row">{el.title}</div>
            <div className="row text-muted">{el.genres}</div>
          </div>
          <div className="col">
            ${el.price} <span className="close">&#10005;</span> {cart[el._id - 1]}
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
    else {
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
        alert('<div class="alert alert-danger d-flex align-items-center">Invalid Input! See the errors below for details.</div>', 'danger')
      }
      event.preventDefault();
      event.stopPropagation();
    }, false);
  }

  function countCart() {
    let count = 0;
    count += cart[0];
    count += cart[1];
    count += cart[2];
    count += cart[3];
    count += cart[4];
    count += cart[5];
    count += cart[6];

    return (<span>{count}</span>);
  }

  if (menu === 6) {
    showCart = true;
  }
  else {
    showCart = false;
  }

  function handleOrderSubmission() {
    order.Name = nameState;
    order.Email = emailState;
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
            <div className='navbar-collapse justify-content-center'>
              <div className='btn-group-lg' role='group'>
                {/* <button className='btn btn-success' style={{ marginLeft: `15px`, marginRight: `15px` }} onClick={() => setMenu(1)}>Create</button> */}
                <button className='btn btn-success' aria-current='page' style={{ marginLeft: `15px`, marginRight: `15px` }} onClick={() => { setMenu(2); setShowConfirm(false) }}>Catalog</button>
                {/* <button className='btn btn-success' style={{ marginLeft: `15px`, marginRight: `15px` }} onClick={() => setMenu(3)}>Update</button> */}
                {/* <button className='btn btn-success' style={{ marginLeft: `15px`, marginRight: `15px` }} onClick={() => setMenu(4)}>Delete</button> */}
                <button className='btn btn-success' style={{ marginLeft: `15px`, marginRight: `15px` }} onClick={() => { setMenu(6); cartConfig(); setShowConfirm(false) }}>View Cart & Checkout</button>
                <button className='btn btn-success' style={{ marginLeft: `15px`, marginRight: `15px` }} onClick={() => { setMenu(9); setShowConfirm(false) }}>Manage Orders</button>
                <button className='btn btn-success' style={{ marginLeft: `15px`, marginRight: `15px` }} onClick={() => { setMenu(5); setShowConfirm(false) }}>About & Credits</button>
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
          <h1 className='text-success fw-bold'>Find Product by ID:</h1>
          <input type='text' id='message' name='message' placeholder='id' className='form-control form-control-lg' style={{ maxWidth: `10vw` }} onChange={(e) => getOneProduct(e.target.value)} />
          {viewer2 && <div className='pb-5'><span className='fs-2'>Product:</span> {showOneItem}</div>}
          <hr></hr>
        </div>}

        {menu === 5 && <div>
          <h1 className='text-center fs-1 fw-bold text-success fw-underline'><u>About & Credits</u></h1>
          <div className='text-center'>
            <p><span className='fw-bold'>Team:</span> #49</p>
            <p><span className='fw-bold'>Member #1:</span> Nathan Geater (<a href='mailto:nkgeater@iastate.edu'>nkgeater@iastate.edu</a>)</p>
            <p><span className='fw-bold'>Member #2:</span> Andrew Sand (<a href='mailto:asand@iastate.edu'>asand@iastate.edu</a>)</p>
            <p><span className='fw-bold'>Course:</span> SE/ComS 319</p>
            <p><span className='fw-bold'>Instructor:</span> Dr. Abraham N. Aldaco Gastelum </p>
            <p><span className='fw-bold'>Date:</span> 6 May 2023 </p>
            <div style={{ width: '50%', marginLeft: '25%' }}>
              <p style={{ textAlign: 'center' }}>This basic website was created for the final project's Phase 2 Assignment for Iowa State University's SE/ComS 319 Construction of User Interfaces course
                in the Spring 2023 semester, exclusively for educational purposes. <b>This website does NOT actually sell any products!</b> The project utilizes MongoDB,
                Express, React, and NodeJS to create a simple website that can interface with a locally-run database. Users can use the website to create, read, update,
                and delete data from the database, which stores information on various fictional products and orders. Furthermore, this assignment uses styling from
                Bootstrap, which is &copy; Bootstrap.
              </p>
            </div>
            <h1 style={{ fontFamily: 'Times New Roman', lineHeight: 3, textAlign: 'center' }}>Sources Cited</h1>
            <div id="sources-text" className='pb-5'>
              <p>Bench, Evan. “portal 2.” <i>flickr</i>, 24 Apr. 2011, www.flickr.com/photos/austinevan/5650008236. Accessed
                12 Mar. 2023.</p>
              <p>Bennett, Reece. “Terraria - Improving The House.” <i>flickr</i>, 19 May 2011,
                www.flickr.com/photos/56638362@N05/5737237143. Accessed 12 Mar. 2023.</p>
              <p>Bennett, Reece. “Terraria - Mushroom Farm.” <i>flickr</i>, 20 May 2011,
                www.flickr.com/photos/56638362@N05/5740620803. Accessed 12 Mar. 2023.</p>
              <p>Bonsch, Thorsten. “Skyrim - Marketplace in Riften (Reference).” <i>flickr</i>, 21 Mar. 2015,
                www.flickr.com/photos/xenomurphy/16260723203. Accessed 12 Mar. 2023.</p>
              <p><i>Celeste on Steam</i>, Matt Makes Games Inc., 25 Jan. 2018, store.steampowered.com/app/504230/Celeste/.
                Accessed 5 Mar. 2023.</p>
              <p>GNOME. “Gnome-input-gaming.svg.” <i>Wikimedia Commons</i>, 12 Jan. 2008,
                commons.wikimedia.org/wiki/File:Gnome-input-gaming.svg. Accessed 12 Mar. 2023.</p>
              <p><i>Hollow Knight on Steam</i>, Team Cherry. 24 Feb. 2017, store.steampowered.com/app/367520/Hollow_Knight/.
                Accessed 12 Mar. 2023.</p>
              <p>jit. “The Elder Scrolls V: Skyrim.” <i>flickr</i>, 5 Dec. 2011, www.flickr.com/photos/psygeist/6458745087.
                Accessed 12 Mar. 2023.</p>
              <p>Matt Makes Games. "Celeste box art full." <i>Wikimedia Commons</i>, 29 Aug. 2017,
                commons.wikimedia.org/wiki/File:Celeste_box_art_full.png. Accessed 5 Mar. 2023.</p>
              <p>Matt Makes Games. “Celeste screenshot 02.png.” <i>Wikimedia Commons</i>, 5 Jan. 2018,
                commons.wikimedia.org/wiki/File:Celeste_screenshot_02.png. Accessed 12 Mar. 2023.</p>
              <p>Matt Makes Games. “Celeste screenshot 08.png.” <i>Wikimedia Commons</i>, 5 Jan. 2018,
                commons.wikimedia.org/wiki/File:Celeste_screenshot_08.png. Accessed 12 Mar. 2023.</p>
              <p>Obsidian, Rob. “The Elder Scrolls V. Skyrim. Xbox 360.” <i>flickr</i>, 6 Apr. 2015,
                www.flickr.com/photos/65092514@N08/16863753930. Accessed 12 Mar. 2023.</p>
              <p><i>Portal 2 on Steam</i>, Valve, 18 Apr. 2011, store.steampowered.com/app/620/Portal_2/. Accessed 5 Mar.
                2023.</p>
              <p>Prism Game Studios Ltd. “Portal Stories Mel Overgrown 2.png.” <i>Wikimedia Commons</i>, 23 Jan. 2018,
                commons.wikimedia.org/wiki/File:Portal_Stories_Mel_Overgrown_2.png. Accessed 12 Mar. 2023.</p>
              <p><i>Risk of Rain 2 on Steam</i>, Gearbox Publishing, store.steampowered.com/app/632360/Risk_of_Rain_2/.
                Accessed 5 Mar. 2023.</p>
              <p><i>Terraria on Steam</i>, Re-Logic, store.steampowered.com/app/105600/Terraria/. Accessed 5 Mar. 2023.</p>
              <p><i>The Binding of Isaac: Rebirth on Steam</i>, Nicalis, Inc.,
                store.steampowered.com/app/250900/The_Binding_of_Isaac_Rebirth/. Accessed 5 Mar. 2023.</p>
              <p><i>The Elder Scrolls V: Skyrim Special Edition on Steam</i>, Bethesda Softworks,
                store.steampowered.com/app/489830/The_Elder_Scrolls_V_Skyrim_Special_Edition/.
                Accessed 5 Mar. 2023.</p>
            </div>
          </div>
        </div>}
        {<div id='topCart' style={{ display: showCart ? 'contents' : 'none' }}>
          {/* Shopping Cart Page */}
          <div id='top_cart'>
            <div>
              <button className='btn btn-success btn-lg' onClick={() => getAllProducts()}>Refresh Shopping Cart</button>
              <div className="py-1"></div>
              <div className="card shadow-lg p-2">
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
                          Products selected: {countCart()}
                        </div>
                      </div>
                    </div>
                    <div>{listItems}</div>
                  </div>
                  <div className="float-end">
                    <p className="mb-0 me-5 d-flex align-items-center">
                      <span className="small text-muted me-2">Cost of Cart:</span>
                      <span className="lead fw-normal">${Math.round(cartTotal * 100) / 100}</span>
                    </p>
                    <p className="mb-0 me-5 d-flex align-items-center">
                      <span className="small text-muted me-2">Tax:</span>
                      <span className="lead fw-normal">${Math.round((cartTotal * 0.07) * 100) / 100}</span>
                    </p>
                    <p className="mb-0 me-5 d-flex align-items-center">
                      <span className="small text-muted me-2">Order Total:</span>
                      <span className="lead fw-normal">${Math.round((cartTotal + cartTotal * 0.07) * 100) / 100}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-2"></div>
                <div className="col-8 mt-5 mb-5">
                  <h1>Order Checkout Form</h1>
                  <hr style={{ height: '5px', color: 'black', backgroundColor: 'black' }}></hr>
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
          <div style={{ width: '50%', marginLeft: '25%' }} className="pb-4">
            <div className="card shadow-lg p-3">
              <b>
                {/* Return Button */}
                <button className="px-3 py-1 btn btn-secondary pt-0 shadow-sm" onClick={() => handleShowHideConfirm(false)}><span style={{ fontSize: '15pt' }}>&#x2190;</span> Return to Cart</button>
              </b>
              <div className="card-body border mt-1 mb-2 border-black border-2">
                <h5 className="card-title">Order summary</h5>
                <p className="card-text">Here is a summary of your order:</p>
              </div>
              <div>{confirmItems}</div>
              <div className="float-end">
                <p className="mb-0 me-5 d-flex align-items-center">
                  <span className="small text-muted me-2">Cost of Cart:</span>
                  <span className="lead fw-normal">${Math.round(cartTotal * 100) / 100}</span>
                </p>
                <p className="mb-0 me-5 d-flex align-items-center">
                  <span className="small text-muted me-2">Tax:</span>
                  <span className="lead fw-normal">${Math.round((cartTotal * 0.07) * 100) / 100}</span>
                </p>
                <p className="mb-0 me-5 d-flex align-items-center">
                  <span className="small text-muted me-2">Order Total:</span>
                  <span className="lead fw-normal">${Math.round((cartTotal + cartTotal * 0.07) * 100) / 100}</span>
                </p>
              </div>
              <ul className="list-group list-group-flush mt-2 mb-2 border-0" style={{ listStyleType: 'none' }}>

              </ul>
              <button className="btn btn-outline-success shadow-sm" onClick={() => handleOrderSubmission()}>Confirm and Place Order</button>
            </div>
          </div>
        </div>
        {menu === 9 && <div>
          <div>
            <h1 className='text-center fs-1 fw-bold text-success fw-underline'><u>Manage Orders:</u></h1>
            <button className='btn btn-success btn-lg' onClick={() => getAllOrders()}>Refresh Orders</button>
            <hr></hr>
            <div><span className='fs-2'>Orders:</span><span className='row row-cols-auto pb-5'>{showAllOrders}</span></div>
          </div>
        </div>}
        {menu === 10 && <div>
          <h1 className='text-center fs-1 fw-bold text-success fw-underline'><u>Update Order {updateOrder._id}:</u></h1>
          <form style={{ maxWidth: `50%`, marginLeft: `25%` }}>
            <div className='row mb-3'>
              <label className='col-sm-2 col-form-label col-form-label-lg'>Name</label>
              <div className='col-sm-10'>
                <input type='text' className='form-control form-control-lg' placeholder={updateOrder.name} name='name' defaultValue={updateOrder.name} onChange={handleChange} />
              </div>
            </div>
            <div className='row mb-3'>
              <label className='col-sm-2 col-form-label col-form-label-lg'>Email</label>
              <div className='col-sm-10'>
                <input type='text' placeholder={updateOrder.email} className='form-control form-control-lg' name='email' defaultValue={updateOrder.email} onChange={handleChange} />
              </div>
            </div>
            <div className='row mb-3'>
              <label className='col-sm-2 col-form-label col-form-label-lg'>Card</label>
              <div className='col-sm-10'>
                <input type='text' placeholder={updateOrder.card} className='form-control form-control-lg' name='card' defaultValue={updateOrder.card} onChange={handleChange} />
              </div>
            </div>
            <div className='row mb-3'>
              <label className='col-sm-2 col-form-label col-form-label-lg'>City</label>
              <div className='col-sm-10'>
                <input type='text' placeholder={updateOrder.city} className='form-control form-control-lg' name='city' defaultValue={updateOrder.city} onChange={handleChange} />
              </div>
            </div>
            <div className='row mb-3'>
              <label className='col-sm-2 col-form-label col-form-label-lg'>Address</label>
              <div className='col-sm-10'>
                <input type='text' placeholder={updateOrder.address} className='form-control form-control-lg' name='address' defaultValue={updateOrder.address} onChange={handleChange} />
              </div>
            </div>
            <div className='row mb-3'>
              <label className='col-sm-2 col-form-label col-form-label-lg'>Secondary Address</label>
              <div className='col-sm-10'>
                <input type='text' placeholder={updateOrder.secondary_address} className='form-control form-control-lg' name='secondary_address' defaultValue={updateOrder.secondary_address} onChange={handleChange} />
              </div>
            </div>
            <div className='row mb-3'>
              <label className='col-sm-2 col-form-label col-form-label-lg'>Zip</label>
              <div className='col-sm-10'>
                <input type='number' placeholder={updateOrder.zip} className='form-control form-control-lg' name='zip' defaultValue={updateOrder.zip} onChange={handleChange} />
              </div>
            </div>
            <div className='row mb-3'>
              <label className='col-sm-2 col-form-label col-form-label-lg'>State</label>
              <div className='col-sm-10'>
                <input type='text' placeholder={updateOrder.state} className='form-control form-control-lg' name='state' defaultValue={updateOrder.state} onChange={handleChange} />
              </div>
            </div>
            <div className='row mb-3'>
              <button type='submit' onClick={handleOnSubmit} className='btn btn-success col-auto'>
                Update
              </button>
            </div>
          </form>
        </div>}
      </div>
    </div>
  );
} // App end
export default App