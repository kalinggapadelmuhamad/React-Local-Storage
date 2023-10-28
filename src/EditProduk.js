import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditProduk({ products, onUpdateProduct }) {
  // Ambil parameter ID dari URL menggunakan "useParams" dan navigasi menggunakan "useNavigate"
  const { id } = useParams();
  const navigate = useNavigate();

  // Inisialisasi state produk yang akan diedit dengan data produk yang sesuai dengan ID
  const [product, setProduct] = useState(products.find(product => product.id === id) || null);

  // Gunakan "useEffect" untuk memastikan produk yang akan diedit selalu ter-update
  useEffect(() => {
    const productToEdit = products.find(product => product.id === id);
    if (productToEdit) {
      setProduct(productToEdit);
    }
  }, [products, id]);

  // Fungsi untuk menangani penyimpanan perubahan produk
  const handleSaveClick = () => {
    if (product) {
      onUpdateProduct(product); // Panggil onUpdateProduct dengan data produk yang diperbarui

      // Perbarui data produk di komponen EditProduk
      setProduct(product);

      // Simpan data produk yang diperbarui ke localStorage
      const updatedProducts = products.map(p => (p.id === product.id ? product : p));
      localStorage.setItem('products', JSON.stringify(updatedProducts));

      // Navigasi kembali ke halaman beranda setelah perubahan disimpan
      navigate('/');
    }
  };

  // Jika produk tidak ditemukan, tampilkan pesan
  if (!product) {
    return <div>Produk tidak ditemukan.</div>;
  }

  return (
    <div>
      <div className='container p-5'>
        <h1 className='mb-5'>Edit Produk</h1>
        <div className='row'>
          <div className='col-12'>
            {/* Form untuk mengedit data produk */}
            <div className="mb-3">
              <label for="namaProduk" class="form-label">Nama Produk</label>
              <input 
                type="text"
                value={product.name}
                onChange={(e) => setProduct({ ...product, name: e.target.value })}
                class="form-control" id="namaProduk"
                placeholder="Nama Produk"
              />
            </div>
            <div className="mb-3">
              <label for="Harga" class="form-label">Harga Produk</label>
              <input 
                type="number"
                value={product.price}
                onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value) })}
                class="form-control" id="Harga"
                placeholder="Harga Produk"
              />
            </div>
            <div className="mb-3">
              <label for="Gambar" class="form-label">Gambar</label>
              <input 
                type="text"
                value={product.image}
                onChange={(e) => setProduct({ ...product, image: e.target.value })}
                class="form-control" id="Gambar"
                placeholder="URL Gambar Produk"
              />
            </div>
            <div className="mb-3">
              <label for="Stock" class="form-label">Stock</label>
              <input 
                type="number"
                value={product.stock}
                onChange={(e) => setProduct({ ...product, stock: parseInt(e.target.value) })}
                class="form-control" id="Stock"
                placeholder="Stok Produk"
              />
            </div>
            <button onClick={handleSaveClick} className='btn btn-primary'>Simpan Perubahan</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProduk;
