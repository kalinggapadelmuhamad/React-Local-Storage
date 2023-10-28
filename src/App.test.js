import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

// Mock untuk localStorage
const localStorageMock = (function() {
  let store = {};

  return {
    getItem: function(key) {
      return store[key] || null;
    },
    setItem: function(key, value) {
      store[key] = value.toString();
    },
    removeItem: function(key) {
      delete store[key];
    },
    clear: function() {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('App', () => {
  it('renders the App component', () => {
    render(<App />);
    const headingElement = screen.getByText('Daftar Produk');
    expect(headingElement).toBeInTheDocument();
  });

  it('handles adding a product to the cart', () => {
    render(<App />);
    const addToCartButton = screen.getByText('Add To Cart');
    fireEvent.click(addToCartButton);

    // Verify that the cart link in the navbar is updated
    const cartLink = screen.getByText('Keranjang (1)');
    expect(cartLink).toBeInTheDocument();
  });

  it('handles removing a product from the cart', () => {
    render(<App />);
    const addToCartButton = screen.getByText('Add To Cart');
    fireEvent.click(addToCartButton);

    // Verify that the cart link in the navbar is updated
    let cartLink = screen.getByText('Keranjang (1)');
    expect(cartLink).toBeInTheDocument();

    // Go to the cart page
    const cartPageLink = screen.getByText('Keranjang (1)');
    fireEvent.click(cartPageLink);

    // Verify that the product is in the cart
    const cartProduct = screen.getByText('Produk 1');
    expect(cartProduct).toBeInTheDocument();

    // Remove the product from the cart
    const removeFromCartButton = screen.getByText('Hapus');
    fireEvent.click(removeFromCartButton);

    // Verify that the product is removed from the cart
    cartProduct = screen.queryByText('Produk 1');
    expect(cartProduct).toBeNull();

    // Verify that the cart link in the navbar is updated
    cartLink = screen.getByText('Keranjang (0)');
    expect(cartLink).toBeInTheDocument();
  });

  it('handles checkout', () => {
    render(<App />);
    const addToCartButton = screen.getByText('Add To Cart');
    fireEvent.click(addToCartButton);

    // Go to the cart page
    const cartPageLink = screen.getByText('Keranjang (1)');
    fireEvent.click(cartPageLink);

    // Verify that the product is in the cart
    const cartProduct = screen.getByText('Produk 1');
    expect(cartProduct).toBeInTheDocument();

    // Perform checkout
    const checkoutButton = screen.getByText('Checkout');
    fireEvent.click(checkoutButton);

    // Verify that the success message is displayed
    const successMessage = screen.getByText('Checkout Berhasil');
    expect(successMessage).toBeInTheDocument();

    // Verify that the cart is empty
    const cartLink = screen.getByText('Keranjang (0)');
    expect(cartLink).toBeInTheDocument();
  });
});
