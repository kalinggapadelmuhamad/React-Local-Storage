import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function AddProduk({ onAdd }) {
  const navigate = useNavigate();
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState('');
  const [productStock, setProductStock] = useState('');

  const [errors, setErrors] = useState({});

  const handleAddClick = () => {
    // Validasi input
    const validationErrors = {};

    const productId = uuidv4();

    // Validasi Nama Produk
    if (!productName) {
      validationErrors.name = 'Nama Produk harus diisi';
    }

    // Validasi Harga Produk
    if (productPrice === '' || isNaN(parseFloat(productPrice)) || parseFloat(productPrice) <= 0) {
      validationErrors.price = 'Harga harus angka positif';
    }

    // Validasi Nama File Gambar
    if (!productImage) {
      validationErrors.image = 'Nama file gambar harus diisi';
    }

    // Validasi Stok Produk
    if (productStock === '' || isNaN(parseInt(productStock)) || parseInt(productStock) < 0) {
      validationErrors.stock = 'Stok harus angka positif atau nol';
    }

    if (Object.keys(validationErrors).length === 0) {
      const newProduct = {
        id: productId, // Menyertakan ID unik dalam objek produk
        name: productName,
        price: parseFloat(productPrice),
        image: productImage,
        stock: parseInt(productStock),
      };
      onAdd(newProduct);
      navigate('/'); // Navigasi kembali ke halaman awal setelah menambah produk
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div>
       <div className='container p-5'>
          <h1 className='mb-5'>Tambah Produk Baru</h1>
          <div className='row'>
            <div className='col-12'>
              <div class="mb-3">
                <label for="namaProduk" class="form-label">Nama Produk</label>
                <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} class="form-control" id="namaProduk" placeholder />
                {errors.name && <span>{errors.name}</span>}
              </div>
              <div class="mb-3">
                <label for="Harga" class="form-label">Harga Produk</label>
                <input type="number" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} class="form-control" id="Harga" placeholder />
                {errors.price && <span>{errors.price}</span>}
              </div>
              <div class="mb-3">
                <label for="Gambar" class="form-label">Gambar (URL)</label>
                <input type="text" value={productImage} onChange={(e) => setProductImage(e.target.value)} class="form-control" id="Gambar" placeholder />
                {errors.image && <span>{errors.image}</span>}
              </div>
              <div class="mb-3">
                <label for="Stock" class="form-label">Stock</label>
                <input type="number" value={productStock} onChange={(e) => setProductStock(e.target.value)} class="form-control" id="Stock" placeholder />
                {errors.stock && <span>{errors.stock}</span>}
              </div>
              <button onClick={handleAddClick} className='btn btn-primary'>Tambah Produk</button>
            </div>
          </div>
        </div>
      <div>
    </div>
  </div>
  );
}

export default AddProduk;
