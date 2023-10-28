import React from 'react';
import ReactDOM from 'react-dom';
import AddProduk from './AddProduk';

it('renders the AddProduk component', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddProduk />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('validates and adds a new product', () => {
  const mockOnAdd = jest.fn();
  const div = document.createElement('div');
  ReactDOM.render(<AddProduk onAdd={mockOnAdd} />, div);

  // Isi field formulir
  const productNameInput = div.querySelector('input[id="namaProduk"]');
  productNameInput.value = 'Product 1';

  const productPriceInput = div.querySelector('input[id="Harga"]');
  productPriceInput.value = '10.99';

  const productImageInput = div.querySelector('input[id="Gambar"]');
  productImageInput.value = 'https://example.com/image.jpg';

  const productStockInput = div.querySelector('input[id="Stock"]');
  productStockInput.value = '50';

  // Klik tombol "Tambah Produk"
  const addButton = div.querySelector('button');
  addButton.click();

  // Memastikan bahwa fungsi onAdd dipanggil dengan data yang benar
  expect(mockOnAdd).toHaveBeenCalledWith({
    id: expect.any(String),
    name: 'Product 1',
    price: 10.99,
    image: 'https://example.com/image.jpg',
    stock: 50,
  });

  ReactDOM.unmountComponentAtNode(div);
});
