import logo from './logo.png';
import './App.css';
import React, { useState, useEffect } from "react";
import Products from './products.json';

//Declaring and Initialising the order object for submitting the order
var order = {
  Name: '',
  Email: '',
  Card: '',
  City: '',
  Address: '',
  Secondary_Address: '',
  Zip: '',
  State: ''
}

//Tests if the input is numeric
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export const App = () => {

  //All State Variables
  const Categories = ["Roguelike", "2D Platformer", "RPG", "Puzzle", "Sandbox"];
  const [ProductsCategory, setProductsCategory] = useState(Products);
  const [query, setQuery] = useState('');
  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);

  //Declaring and Initialising Variables used with the submission form
  let inputCard = document.querySelector('#inputCard');

  //Used to update the cart's total cost
  useEffect(() => {
    //Function to calculate the total value of the cart
    {
      let totalVal = 0;
      for (let i = 0; i < cart.length; i++) {
        totalVal += cart[i].price;
      }
      setCartTotal(totalVal);
    };
  }, [cart]);

  //Deals with handling the click functionality of the category buttons
  function handleClick(tag) {
    let filtered = Products.filter(cat => cat.category === tag);
    setProductsCategory(filtered);
  }

  //Deals with handling text changes with the search bar
  const handleChanges = (e) => {
    setQuery(e.target.value);
    const results = Products.filter(eachProduct => {
      if (e.target.value === "") return ProductsCategory;
      return eachProduct.title.toLowerCase().includes(e.target.value.toLowerCase())
    });
    setProductsCategory(results);
  }

  //Toggles between the catalog and cart view
  function handleShowHideCart() {
    setShowCart(!showCart);

    window.scrollTo(0, 0);

    if (!showCart) {
      document.body.style["overflow-y"] = 'visible';
    }
    else {
      document.body.style["overflow-y"] = 'hidden';
    }

    if (showConfirm) {
      setShowConfirm(false);
    }

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
      event.preventDefault()
      event.stopPropagation()
    }, false);

  }

  //Counts products in the cart of the same id
  function howManyofThis(id) {
    let hmot = cart.filter((cartItem) => cartItem.id === id);
    return hmot.length;
  }

  //Adds the product to the cart
  const addToCart = (el, v) => {

    for (let i = 0; i < v; i++) {
      let ev = structuredClone(el);
      setCart(cart => ([...cart, ev]));
    }

  };

  //Removes the product from the cart
  const removeFromCart = (el, v) => {

    let hardCopy = [...cart];

    for (let i = 0; i < v; i++) {
      for (let j = hardCopy.length - 1; j >= 0; --j) {
        if (hardCopy[j].title === el.title) {
          hardCopy.splice(j, 1);
          break;
        }
      }
    }


    //hardCopy = hardCopy.filter((cartItem) => cartItem.id !== el.id);
    setCart(hardCopy);
  }

  //Function used to check if at least one of a product is in the cart
  const checkCart = (product) => {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].title === product.title) {
        return true;
      }
    }
    return false;
  }

  //Function used to list the items on the cart screen
  const listItems = Products.map((el) => (
    // PRODUCT
    <div  key={el.id}>
      {checkCart(el) && <div className="row border-top border-bottom">
        <div className="row main align-items-center">
          <div className="col-2">
            <img className="img-fluid" src={el.image} alt={el.title} />
          </div>
          <div className="col">
            <div className="row">{el.title}</div>
            <div className="row text-muted">{el.category}</div>
          </div>
          <div className="col">
            <button className="btn btn-outline-secondary" type="button" onClick={() => removeFromCart(el, 1)} > - </button>{" "}
            <button className="btn btn-outline-secondary" type="button" onClick={() => addToCart(el, 1)}> + </button>
          </div>
          <div className="col">
            ${el.price} <span className="close">&#10005;</span>{howManyofThis(el.id)}
          </div>
        </div>
      </div>}
    </div>
  ));

  const confirmItems = Products.map((el) => (
    // PRODUCT
    <div  key={el.id}>
      {checkCart(el) && <div className="row border-top border-bottom">
        <div className="row main align-items-center">
          <div className="col-2">
            <img className="img-fluid" src={el.image} alt={el.title} />
          </div>
          <div className="col">
            <div className="row">{el.title}</div>
            <div className="row text-muted">{el.category}</div>
          </div>
          <div className="col">
            ${el.price} <span className="close">&#10005;</span>{howManyofThis(el.id)}
          </div>
        </div>
      </div>}
    </div>
  ));

  //Renders the products
  const render_products = (ProductsCategory) => {
    return <div className='category-section fixed'>
      <h2 className="text-3xl font-extrabold tracking-tight text-gray-600 category-title">Products ({ProductsCategory.length})</h2>
      <div className="m-6 p-3 mt-10 ml-0 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-6 xl:gap-x-10" style={{
        maxHeight: '800px', overflowY:
          'scroll'
      }}>
        {/* Loop Products */}
        {ProductsCategory.map((product, index) => (
          <div key={index}>
            <div key={index} className="group relative shadow-lg" >
              <div className="min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden lg:h-60 lg:aspect-none">
                <img
                  alt={product.title}
                  src={product.image}
                  className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                />
              </div>
              <div className="flex justify-between p-3">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      <span style={{ fontSize: '16px', fontWeight: '600' }}>{product.title}</span>
                    </a>
                    <p>Genre - {product.category}</p>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">Rating: {product.rating.rate}</p>
                </div>
                <p className="text-sm font-medium text-green-600">${product.price}</p>
              </div>
            </div>
            <div className='add-buttons'>
              <input id={index} type="text" className="form-control" defaultValue={1} placeholder="Quantity" />
              <button type="button" className='bg-lime-500 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded' onClick={() => removeFromCart(product, document.getElementById(index).value)} > - </button>{" "}
              <button type="button" className='bg-lime-500 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded' onClick={() => addToCart(product, document.getElementById(index).value)}> + </button>
            </div>
          </div>
        ))}
      </div>
    </div>
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
      order.Email = email.value
    }
    //Check Name
    if (name.value.length === 0) {
      name.setAttribute("class", "form-control is-invalid")
      val = false
    }
    else {
      name.setAttribute("class", "form-control is-valid");
      order.Name = name.value
    }
    //Check Credit Card
    if (!card.value.match(/^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/)) {
      card.setAttribute("class", "form-control is-invalid")
      val = false
    }
    else {
      card.setAttribute("class", "form-control is-valid");
      order.Card = card.value
    }
    //Check City
    if (city.value.length === 0) {
      city.setAttribute("class", "form-control is-invalid")
      val = false
    }
    else {
      city.setAttribute("class", "form-control is-valid");
      order.City = city.value
    }
    //Check Address
    if (address.value.length === 0) {
      address.setAttribute("class", "form-control is-invalid")
      val = false
    }
    else {
      address.setAttribute("class", "form-control is-valid");
      order.Address = address.value
    }
    //Zip Code
    if (zip.value.length === 5 && !isNaN(zip.value)) {
      zip.setAttribute("class", "form-control is-valid");
      order.Zip = zip.value
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
      order.State = state.value
    }
    //Checking Secondary Address
    if (address2.value.length > 0) {
      order.Secondary_Address = address2.value
    }

    if (val) {
      handleShowHideConfirm(true);
    }

    return val;
  }

  //Toggles between the catalog and cart view
  function handleShowHideConfirm(test) {
    setShowCart(!test);
    setShowConfirm(test);

    window.scrollTo(0, 0);

    if (test) {
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
  }

  const alert = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
      `<div className="alert alert-${type} alert-dismissible" role="alert">`,
      ` <div>${message}</div>`,
      ' <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label = "Close" ></button > ',
      '</div>'
    ].join('')

    document.getElementById('liveAlertPlaceholder').append(wrapper);
  }

  function handleShowAbout() {
    window.alert("Made by Team 49, which consists of Nathan Geater (nkgeater@iastate.edu) and Andrew Sand (asand@iastate.edu). \n\nThis website was created for Assignment02 for Iowa State University's SE/ComS 319 Course, Spring 2023. \n\nThe project was made exclusively for educational purposes. \n\nNothing on this website is actually for sale! Inputting user data and placing an \"order\" will NOT actually do anything!");
  }

  //Returns the stuff to render
  return (
    <div>
      {/* Product Page */}
      <div className="flex fixed flex-row" id='top_catalog' style={{ visibility: !showCart && !showConfirm ? 'visible' : 'hidden' }}>
        <div className="h-screen bg-slate-800 p-3 xl:basis-1/5" style={{ minWidth: '40%' }}>
          <img className="w-full" src={logo} alt="Logo" />
          <div className="px-6 py-4">
            <h1 className="text-3xl mb-2 font-bold text-white"> Fake Game Store: Product Catalog App </h1>
            <p className="text-gray-700 text-white">
              By: <b style={{ color: 'limegreen' }}>Nathan Geater and Andrew Sand</b>
            </p>

            <button className="inline-block bg-lime-600 rounded-full px-3 py-1
               text-sm font-semibold text-gray-700 mr-2 mt-2" onClick={handleShowAbout}>About</button>
            {/* Cart Button */}
            <button className="inline-block bg-lime-600 rounded-full px-3 py-1
               text-sm font-semibold text-gray-700 mr-2 mt-2" onClick={handleShowHideCart}>View Cart and Checkout</button>
            <div className="py-10">

              {/* Search Bar */}
              <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
            dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
            dark:focus:ring-blue-500 dark:focus:border-blue-500" type="search" value={query} onChange={handleChanges} placeholder="Search" />
              {/* Category Buttons */}
              {(Categories) ? <p className='text-white'>Genres : </p> : ''}
              {
                Categories.map(tag => <button key={tag} className="inline-block bg-lime-600 rounded-full px-3 py-1
               text-sm font-semibold text-gray-700 mr-2 mt-2" onClick={() => { handleClick(tag) }}>{tag}</button>)
              }
            </div>
          </div>
        </div>
        <div className="ml-5 p-10 xl:basis-4/5">
          {render_products(ProductsCategory)}
        </div>
      </div>
      {/* Shopping Cart Page */}
      <div id='top_cart' style={{ visibility: showCart ? 'visible' : 'hidden' }}>
        <div>
          <img src={logo} alt="Logo" style={{ maxWidth: '10%' }} />
          <b>
            {/* Return Button */}
            <button className="bg-lime-600 rounded-full px-3 py-1
               text-sm font-semibold text-gray-700 mr-2 mt-2" onClick={handleShowHideCart}>Return and Continue Shopping</button>
          </b>
          <div className="py-1"></div>
          <div className="card">
            <div className="row">
              {/* HERE, IT IS THE SHOPING CART */}
              <div className="col-md-8 cart">
                <div className="title">
                  <div className="row">
                    <div className="col">
                      <h4>
                        <b>Fake Game Store Shopping Card</b>
                      </h4>
                    </div>
                    <div className="col align-self-center text-right text-muted">
                      Products selected {cart.length}
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
                  <button type="submit" className="btn btn-outline-success"> <i className="bi-bag-check"></i> Proceed to Confirmation</button>
                </div>
              </form>
            </div>
            <div className="col-2"></div>
          </div>
        </div>
      </div>
      {/* Checkout Confirmation Page */}
      <div id='top_confirm' style={{ visibility: showConfirm ? 'visible' : 'hidden' }}>
        <div>
          <img src={logo} alt="Logo" style={{ maxWidth: '30%' }} />
          <b>
            {/* Return Button */}
            <button className="bg-lime-600 rounded-full px-3 py-1
               text-sm font-semibold text-gray-700 mr-2 mt-2" onClick={handleShowHideCart}>Return to Cart</button>
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
            <ul className="list-group list-group-flush">

            </ul>
            <button className="btn btn-secondary" onClick={window.location.reload.bind(window.location)}>Confirm and Place Order</button>
          </div>
        </div>
      </div>
    </div>
  );
}