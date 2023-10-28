import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EditProduk from './EditProduk';

// Mock untuk onUpdateProduct dan useParams
const mockOnUpdateProduct = jest.fn();
const mockUseParams = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: 'product_id', // Ganti dengan ID produk yang sesuai
  }),
}));

describe('EditProduk', () => {
  it('renders the EditProduk component', () => {
    render(<EditProduk products={[]} onUpdateProduct={mockOnUpdateProduct} />);
    const headingElement = screen.getByText('Edit Produk');
    expect(headingElement).toBeInTheDocument();
  });

  it('handles product update and navigation', () => {
    const products = [
      { id: 'product_id', name: 'Product 1', price: 10.99, image: 'image_url', stock: 50 },
    ];

    render(<EditProduk products={products} onUpdateProduct={mockOnUpdateProduct} />);
    
    // Verify that the form fields are pre-filled
    const nameInput = screen.getByLabelText('Nama Produk');
    const priceInput = screen.getByLabelText('Harga Produk');
    const imageInput = screen.getByLabelText('Gambar');
    const stockInput = screen.getByLabelText('Stock');

    expect(nameInput.value).toBe('Product 1');
    expect(priceInput.value).toBe('10.99');
    expect(imageInput.value).toBe('image_url');
    expect(stockInput.value).toBe('50');

    // Change form input values
    fireEvent.change(nameInput, { target: { value: 'Updated Product' } });
    fireEvent.change(priceInput, { target: { value: '12.99' } });
    fireEvent.change(imageInput, { target: { value: 'updated_image_url' } });
    fireEvent.change(stockInput, { target: { value: '60' } });

    // Click the "Simpan Perubahan" button
    const saveButton = screen.getByText('Simpan Perubahan');
    fireEvent.click(saveButton);

    // Verify that onUpdateProduct was called with the updated product
    expect(mockOnUpdateProduct).toHaveBeenCalledWith({
      id: 'product_id',
      name: 'Updated Product',
      price: 12.99,
      image: 'updated_image_url',
      stock: 60,
    });
  });
});
