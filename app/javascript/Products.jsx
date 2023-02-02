import React, { useState, useEffect } from 'react';

import $ from "jquery";

import './Products.css';

export default function Products() {
  const products = ($('#app').data('products'))

  const newArr = [];
  if (!localStorage.getItem('cartItems')) {
    localStorage.setItem('cartItems', JSON.stringify(newArr))
  }

  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cartItems')));

  const handleAddToCart = async (product) => {
    localStorage.setItem('cartItems', JSON.stringify([...cartItems, {...product, count: 1}]))
    setCartItems([...cartItems, {...product, count: 1}]);
  }

  const handleRemove = (product) => {
    const index = cartItems.indexOf(product);
    const newCart = 
    [
      ...cartItems.slice(0, index),
      ...cartItems.slice(index + 1),
    ]

    setCartItems(newCart);
    localStorage.setItem('cartItems', JSON.stringify(newCart))
  }

  const handleIncrease = (product) => {
    const index = cartItems.indexOf(product);
    const newCart = 
    [
      ...cartItems.slice(0, index),
      { ...product, count: product.count + 1 },
      ...cartItems.slice(index + 1),
    ]

    setCartItems(newCart);
    localStorage.setItem('cartItems', JSON.stringify(newCart))
  }

  const handleDecrease = (product) => {
    const index = cartItems.indexOf(product);

    if (product.count === 1) {
      return handleRemove(product)
    }

    const newCart = 
    [
      ...cartItems.slice(0, index),
      { ...product, count: product.count - 1 },
      ...cartItems.slice(index + 1),
    ]

    setCartItems(newCart);
    localStorage.setItem('cartItems', JSON.stringify(newCart))
  }

  return (
    <div className="App">
      <div className="main-content">
        <div className="card">
            <div className="card-top"><img
                    src="/images/nike.png"
                    className="card-top-logo" /></div>
            <div className="card-title">Our Products</div>
            <div className="card-body">
                <div className="shop-items">
                  {products.map((product) => {
                    return (
                      <div className="shop-item">
                        <div className="shop-item-image" style={{backgroundColor: product.color}}><img
                                src={product.image} />
                        </div>
                        <div className="shop-item-name">{product.name}</div>
                        <div className="shop-item-description">{product.description}</div>
                        <div className="shop-item-bottom">
                            <div className="shop-item-price">{'$' + product.price}</div>
                            {
                              cartItems.filter((cartItem) => cartItem.id === product.id).length === 0 ?
                              <div className="shop-item-button" onClick={() => handleAddToCart(product)}>
                                <p>ADD TO CART</p>
                              </div>
                              :
                              <div className="shop-item-button inactive">
                                <div className="shop-item-button-cover">
                                    <div className="shop-item-button-cover-check-icon"></div>
                                </div>
                            </div>
                            }
                        </div>
                      </div>
                    )
                  })}
                </div>
            </div>
        </div>
        <div className="card">
          <div className="card-top"><img
                  src="/images/nike.png"
                  className="card-top-logo" /></div>
          <div className="card-title">Your cart<span className="card-title-amount">{'$' + cartItems.reduce((sum, item) => sum + item.price * item.count, 0).toFixed(2)}</span></div>
          <div className="card-body">
            {
              cartItems.length === 0 && 
              <div className="cart-empty">
                <p className="cart-empty-text">Your cart is empty.</p>
              </div>
            }
            
            {cartItems.map((product) => {
              return (
                <div className="cart-items">
                  <div>
                      <div className="cart-item">
                          <div className="cart-item-left">
                              <div className="cart-item-image" style={{backgroundColor: product.color}}>
                                  <div className="cart-item-image-block"><img
                                          src={product.image} />
                                  </div>
                              </div>
                          </div>
                          <div className="cart-item-right">
                              <div className="cart-item-name">{product.name}</div>
                              <div className="cart-item-price">{'$' + product.price}</div>
                              <div className="cart-item-actions">
                                  <div className="cart-item-count">
                                      <div className="cart-item-count-button" onClick={() => handleDecrease(product)}>-</div>
                                      <div className="cart-item-count-number">{product.count}</div>
                                      <div className="cart-item-count-button" onClick={() => handleIncrease(product)}>+</div>
                                  </div>
                                  <div className="cart-item-remove" onClick={() => handleRemove(product)}><img
                                          src="/images/trash.png"
                                          className="cart-item-remove-icon" /></div>
                              </div>
                          </div>
                      </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
};