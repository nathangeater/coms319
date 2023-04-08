import logo from './logo.png';
import './App.css';
import React, {useState} from "react";
import {Products} from "./Products";
import {Categories} from "./Categories";


export const App = () => {
  console.log("Step 1 : After reading file :");

  const [ProductsCategory, setProductsCategory] = useState(Products);

  return <div>
    {ProductsCategory.map((product, index) => (
      <div key={index} >
        <img alt="Product Image" src={product.image} />
      </div>
    ))}

  </div>
}