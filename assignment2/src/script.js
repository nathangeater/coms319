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

  //Used to update the cart's total cost
  useEffect(() =>{
    total();
  }, [cart]);

  //Function to calculate the total value of the cart
  const total = () => {
    let totalVal = 0;
    for(let i = 0; i < cart.length; i++){
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
    const results = ProductsCategory.filter(eachProduct => {
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
          <div class="row text-muted">{el.title}</div>
          <div class="row">{el.category}</div>
        </div>
        <div class="col">
          <button type="button" variant="light" onClick={() => removeFromCart(el)} > - </button>{" "}
          <button type="button" variant="light" onClick={() => addToCart(el)}> + </button>
        </div>
        <div class="col">
          ${el.price} <span class="close">&#10005;</span>{howManyofThis(el.id)}
        </div>
      </div>
    </div>
  ));

  //Returns the stuff to render
  return (
    <body>
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
               text-sm font-semibold text-gray-700 mr-2 mt-2" onClick={handleShowHideCart}>View Cart</button>
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
      </div>}
    </body>
  );
}

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
          <div className=" min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-60 lg:aspect-none">
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
        </div>
      ))}
    </div>
  </div>
}