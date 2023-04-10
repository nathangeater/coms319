import logo from './logo.png';
import './App.css';
import React, { useState, useEffect } from "react";
import Products from './products.json';

export const App = () => {
  console.log("Step 1 : After reading file :");

  //All State Variables
  const Categories = ["electronics", "jewelery", "men's clothing", "women's clothing"];
  const [ProductsCategory, setProductsCategory] = useState(Products);
  const [query, setQuery] = useState('');
  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  //Declaring and Initialising Variables used with the submission form
  const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
  const form = document.getElementById('checkout-form');
  const inputCard = document.querySelector('#inputCard');
  const alertTrigger = document.getElementById('submit-btn');
  const summaryCard = document.querySelector('.card');
  const summaryList = document.querySelector('.card > ul');

  //Declaring and Initialising the order object for submitting the order
  var order = {
    name: '',
    email: '',
    card: ''
  }

  //Used to update the cart's total cost
  useEffect(() => {
    total();
  }, [cart]);

  //Function to calculate the total value of the cart
  const total = () => {
    let totalVal = 0;
    for (let i = 0; i < cart.length; i++) {
      totalVal += cart[i].price;
    }
    setCartTotal(totalVal);
  };

  //Deals with handling the click functionality of the category buttons
  function handleClick(tag) {
    let filtered = Products.filter(cat => cat.category === tag);
    setProductsCategory(filtered);
    console.log("Step 2: STATISTICS", Products.length, ProductsCategory.length);
  }

  //Deals with handling text changes with the search bar
  const handleChanges = (e) => {
    setQuery(e.target.value);
    console.log("Step 6 : in handleChange, Target Value :", e.target.value, " Query Value :", query);
    const results = Products.filter(eachProduct => {
      if (e.target.value === "") return ProductsCategory;
      return eachProduct.title.toLowerCase().includes(e.target.value.toLowerCase())
    });
    setProductsCategory(results);
  }

  //Hides the catalog and goes to the cart page
  function handleShowHideCart() {
    setShowCart(!showCart);
  }

  //Counts products in the cart of the same id
  function howManyofThis(id) {
    let hmot = cart.filter((cartItem) => cartItem.id === id);
    return hmot.length;
  }

  //Adds the product to the cart
  const addToCart = (el) => {
    setCart([...cart, el]);
  };

  //Removes the product from the cart
  const removeFromCart = (el) => {
    let hardCopy = [...cart];
    hardCopy = hardCopy.filter((cartItem) => cartItem.id !== el.id);
    setCart(hardCopy);
  }

  //Function used to list the items on the cart screen
  const listItems = Products.map((el) => (
    // PRODUCT
    <div class="row border-top border-bottom" key={el.id}>
      <div class="row main align-items-center">
        <div class="col-2">
          <img class="img-fluid" src={el.image} />
        </div>
        <div class="col">
          <div class="row">{el.title}</div>
          <div class="row text-muted">{el.category}</div>
        </div>
        <div class="col">
          <button class="btn btn-outline-secondary" type="button" onClick={() => removeFromCart(el)} > - </button>{" "}
          <button class="btn btn-outline-secondary" type="button" onClick={() => addToCart(el)}> + </button>
        </div>
        <div class="col">
          ${el.price} <span class="close">&#10005;</span>{howManyofThis(el.id)}
        </div>
      </div>
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
          <div key={index} className="group relative shadow-lg" >
            <div className=" min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden lg:h-60 lg:aspect-none">
              <img
                alt="Product Image"
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
                  <p>Tag - {product.category}</p>
                </h3>
                <p className="mt-1 text-sm text-gray-500">Rating: {product.rating.rate}</p>
              </div>
              <p className="text-sm font-medium text-green-600">${product.price}</p>
            </div>
            <button type="button" onClick={() => removeFromCart(product)} > - </button>{" "}
            <button type="button" onClick={() => addToCart(product)}> + </button>
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
    if (!email.value.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{ 1, 3}\.[0 - 9]{ 1, 3}\.[0 - 9]{ 1, 3}\.[0 - 9]{ 1, 3}\]) | (([a - zA - Z\-0 - 9] +\.) +[a - zA - Z]{ 2,})) $ /)) {
      email.setAttribute("class", "form-control is-invalid");
      val = false;
    }
    else {
      email.setAttribute("class", "form-control is-valid");
      order.email = email.value
    }
    if (name.value.length == 0) {
      name.setAttribute("class", "form-control is-invalid")
      val = false
    }
    else {
      name.setAttribute("class", "form-control is-valid");
      order.name = name.value
    }
    if (!card.value.match(/^[0-9]{4}\-[0-9]{4}\-[0-9]{4}\-[0-9]{4}$/)) {
      card.setAttribute("class", "form-control is-invalid")
      val = false
    }
    else {
      card.setAttribute("class", "form-control is-valid");
      order.card = card.value
    }
    if (val) {
      form.classList.add("collapse")
      for (const [key, value] of Object.entries(order)) {
        summaryList.innerHTML += '<li class="list-group-item"> <b>' + `${key}` +
          ': </b>' + `${value}` + '</li>'
      }
      summaryCard.classList.remove("collapse")
      alertPlaceholder.innerHTML = ""
      alert('<i class="bi-cart-check-fill"></i> You have made an order!',
        'success')
    }
    return val;
  }

  const alert = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
      ` <div>${message}</div>`,
      ' <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label = "Close" ></button > ',
      '</div>'
    ].join('')

    alertPlaceholder.append(wrapper)
  }

  function isNumeric (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  /*
  inputCard.addEventListener('input', event => {
    if(!inputCard.value) {
      return event.preventDefault();
    }
    else{
      inputCard.value = inputCard.value.replace(/-/g, '');
      let newVal = '';
      for(var i = 0, nums = 0; i < inputCard.value.length; i++){
        if(nums != 0 && nums % 4 == 0){
          newVal += '-';
        }

        newVal += inputCard.value[i];
        if(isNumeric(inputCard.value[i])){
          nums++;
        }
      }
      inputCard.value = newVal;
    }
  });
  */

  /*
  form.addEventListener('submit', event => {
    //if (!form.checkValidity()) {
    if (!validate()) {
    alertPlaceholder.innerHTML = ''
    alert('<i class="bi-exclamation-circle"></i> Something went wrong!','danger')
    }
    event.preventDefault()
    event.stopPropagation()
    //form.classList.add('was-validated')
    }, false );
    */


  //Returns the stuff to render
  return (
    <div>
      {/* Product Page */}
      {!showCart && <div className="flex fixed flex-row" id='top_catalog'>
        <div className="h-screen bg-slate-800 p-3 xl:basis-1/5" style={{ minWidth: '65%' }}>
          <img className="w-full" src={logo} alt="Sunset in the mountains" />
          <div className="px-6 py-4">
            <h1 className="text-3xl mb-2 font-bold text-white"> Product Catalog App </h1>
            <p className="text-gray-700 text-white">
              by - <b style={{ color: 'orange' }}>Nathan Geater and Andrew Sand</b>
            </p>
            <div className="py-10">
              {/* Cart Button */}
              <button className="inline-block bg-amber-600 rounded-full px-3 py-1
               text-sm font-semibold text-gray-700 mr-2 mt-2" onClick={handleShowHideCart}>View Cart and Checkout</button>
              {/* Search Bar */}
              <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
            dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
            dark:focus:ring-blue-500 dark:focus:border-blue-500" type="search" value={query} onChange={handleChanges} />
              {/* Category Buttons */}
              {(Categories) ? <p className='text-white'>Tags : </p> : ''}
              {
                Categories.map(tag => <button key={tag} className="inline-block bg-amber-600 rounded-full px-3 py-1
               text-sm font-semibold text-gray-700 mr-2 mt-2" onClick={() => { handleClick(tag) }}>{tag}</button>)
              }
            </div>
          </div>
        </div>
        <div className="ml-5 p-10 xl:basis-4/5">
          {console.log("Before render :", Products.length, ProductsCategory.length)}
          {render_products(ProductsCategory)}
        </div>
      </div>}
      {/* Shopping Cart Page */}
      {showCart && <div id='top_cart'>
        <div>
          STORE SE/ComS319
          <b>
            {/* Cart Button */}
            <button className="bg-amber-600 rounded-full px-3 py-1
               text-sm font-semibold text-gray-700 mr-2 mt-2" onClick={handleShowHideCart}>Return and Continue Shopping</button>
          </b>
          <div class="card">
            <div class="row">
              {/* HERE, IT IS THE SHOPING CART */}
              <div class="col-md-8 cart">
                <div class="title">
                  <div class="row">
                    <div class="col">
                      <h4>
                        <b>319 Shopping Cart</b>
                      </h4>
                    </div>
                    <div class="col align-self-center text-right text-muted">
                      Products selected {cart.length}
                    </div>
                  </div>
                </div>
                <div>{listItems}</div>
              </div>
              <div class="float-end">
                <p class="mb-0 me-5 d-flex align-items-center">
                  <span class="small text-muted me-2">Order total:</span>
                  <span class="lead fw-normal">${cartTotal}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-2"></div>
            <div class="col-8">
              <h1>Order Form</h1>
              <div id="liveAlertPlaceholder"></div>
              <form class="row g-3" id="checkout-form">

                {/* Full Name */}
                <div class="col-md-6">
                  <label for="inputName" class="form-label">Full Name</label>
                  <input type="text" class="form-control" id="inputName" />
                  <div class="valid-feedback">
                    Looks good!
                  </div>
                  <div class="invalid-feedback">
                    Must be like, "John Doe"
                  </div>
                </div>

                {/* Email */}
                <div class="col-md-6">
                  <label for="inputEmail4" class="form-label">Email</label>
                  <input type="email" class="form-control" id="inputEmail4" />
                  <div class="valid-feedback">
                    Looks good!
                  </div>
                  <div class="invalid-feedback">
                    Must be like, "abc@xyz.efg"
                  </div>
                </div>

                {/* Credit Card */}
                <div class="col-12">
                  <label for="inputCard" class="form-label">Card</label>
                  <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1"><i class="bi-credit-card-fill"></i></span>
                    <input type="text" id="inputCard" class="form-control" placeholder="XXXX-XXXX-XXXX-XXXX"
                      aria-label="Username" aria-describedby="basic-addon1" />
                    <div class="valid-feedback">
                      Looks good!
                    </div>
                    <div class="invalid-feedback">
                      Must be like, "7777-7777-7777-7777"
                    </div>
                  </div>
                </div>

                <div class="col-12">
                  <label for="inputAddress" class="form-label">Address</label>
                  <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St" />
                </div>
                <div class="col-12">
                  <label for="inputAddress2" class="form-label">Address 2</label>
                  <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
                </div>
                <div class="col-md-6">
                  <label for="inputCity" class="form-label">City</label>
                  <input type="text" class="form-control" id="inputCity" />
                </div>
                <div class="col-md-4">
                  <label for="inputState" class="form-label">State</label>
                  <select id="inputState" class="form-select">
                    <option selected>Choose...</option>
                  </select>
                </div>
                <div class="col-md-2">
                  <label for="inputZip" class="form-label">Zip</label>
                  <input type="text" class="form-control" id="inputZip" />
                </div>
                <div class="col-12">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="gridCheck" />
                    <label class="form-check-label" for="gridCheck">
                      Check me out
                    </label>
                  </div>
                </div>
                <div class="col-12">
                  <button type="submit" class="btn btn-outline-success"> <i class="bi-bag-check"></i> Order</button>
                </div>
              </form>

              <div class="card collapse" style={{ width: '18rem' }}>
                <div class="card-body">
                  <h5 class="card-title">Order summary</h5>
                  <p class="card-text">Here is a summary of your order.</p>
                </div>
                <ul class="list-group list-group-flush">

                </ul>
                <a href="" onClick="location.reload()" class="btn btn-secondary"> <i class="bi-arrow-left-circle"></i>
                  Return</a>
              </div>

              <footer class="bd-footer py-4 py-md-5 mt-5 bg-light">
                <div class="container py-4 py-md-5 px-4 px-md-3">
                  <div class="row">
                    <div class="col-lg-12 mb-3">
                      <b>SE/Com-S 319</b> Javascript form validation.
                    </div>

                  </div>
                </div>
              </footer>
            </div>
            <div class="col-2"></div>
          </div>
        </div>
      </div>}
    </div>
  );
}