import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import AddProduk from './AddProduk';
import React, { useEffect, useState } from 'react';
import EditProduk from './EditProduk';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';

function App() {
  // Inisialisasi state untuk produk, keranjang belanja, dan total harga
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  let totalHarga = 0;

  // Inisialisasi total harga dengan nilai awal 0
  // Iterasi melalui setiap item dalam keranjang dan menambahkan harganya ke totalHarga
  cart.forEach((item) => {
    totalHarga += item.price * item.quantity;
  });

  // Fungsi untuk menambahkan produk ke keranjang
  const addToCart = (product) => {
    // Cari indeks produk yang sudah ada dalam keranjang
    const existingProductIndex = cart.findIndex((item) => item.id === product.id);

    if (existingProductIndex !== -1) {
      // Jika produk sudah ada di keranjang, tambahkan jumlahnya
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += 1;
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } else {
      // Jika produk belum ada di keranjang, tambahkan sebagai item baru
      const updatedCart = [...cart, { ...product, quantity: 1 }];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setCart(updatedCart);
    }

    // Tampilkan pesan sukses dengan SweetAlert
    Swal.fire({
      title: 'Produk Ditambahkan Ke Keranjang',
      icon: 'success',
      confirmButtonText: 'Ok'
    });
  };

  // Fungsi untuk menghapus produk dari keranjang
  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart(updatedCart);

    // Tampilkan pesan sukses dengan SweetAlert
    Swal.fire({
      title: 'Produk Di Hapus Dari Keranjang',
      icon: 'success',
      confirmButtonText: 'Ok'
    });
  };

  // Fungsi untuk menangani proses checkout
  const handleCheckout = () => {
    // Salin produk yang ada ke variabel sementara
    const updatedProducts = [...products];
    let totalHarga = 0;

    // Iterasi melalui keranjang belanja
    cart.forEach((cartItem) => {
      const product = updatedProducts.find((p) => p.id === cartItem.id);
      if (product) {
        if (product.stock >= cartItem.quantity) {
          product.stock -= cartItem.quantity;
          totalHarga += cartItem.quantity * product.price;
        }
      }
    });

    // Simpan produk yang telah diperbarui ke local storage
    localStorage.setItem('products', JSON.stringify(updatedProducts));

    // Bersihkan keranjang
    localStorage.removeItem('cart');
    setCart([]);

    // Tampilkan pesan sukses dengan SweetAlert
    Swal.fire({
      title: 'Checkout Berhasil',
      text: `Total Harga: ${formatRupiah(totalHarga)}`,
      icon: 'success',
      confirmButtonText: 'Ok'
    });
  };

  // Fungsi untuk menambahkan produk baru ke daftar produk
  const addProduct = (newProduct) => {
    const updatedProducts = [...products, newProduct];
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    setProducts(updatedProducts);

    // Tampilkan pesan sukses dengan SweetAlert
    Swal.fire({
      title: 'Berhasil Tambah Produk',
      icon: 'success',
      confirmButtonText: 'Ok'
    });
  };

  // Fungsi untuk menghapus produk dari daftar produk
  const deleteProduct = (productId) => {
    const updatedProducts = products.filter(product => product.id !== productId);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    setProducts(updatedProducts);

    // Tampilkan pesan sukses dengan SweetAlert
    Swal.fire({
      title: 'Berhasil Hapus Produk',
      icon: 'success',
      confirmButtonText: 'Ok'
    });
  };

  // Fungsi untuk mengupdate produk yang ada
  const handleUpdateProduct = (updatedProduct) => {
    // Ambil produk yang tersimpan dari local storage
    const storedProducts = JSON.parse(localStorage.getItem('products'));

    // Temukan produk yang sesuai dengan ID
    const updatedProducts = storedProducts.map((product) => {
      if (product.id === updatedProduct.id) {
        return updatedProduct;
      }
      return product;
    });

    // Simpan kembali data produk yang telah diperbarui ke local storage
    localStorage.setItem('products', JSON.stringify(updatedProducts));

    // Perbarui state produk di komponen App
    setProducts(updatedProducts);

    // Tampilkan pesan sukses dengan SweetAlert
    Swal.fire({
      title: 'Berhasil Edit Produk',
      icon: 'success',
      confirmButtonText: 'Ok'
    });
  };

  // Fungsi untuk memformat angka menjadi mata uang Rupiah
  function formatRupiah(angka) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(angka);
  }

  // Menggunakan useEffect untuk menginisialisasi produk dan keranjang belanja
  useEffect(() => {
    // Ambil produk dari local storage jika ada
    const storedProducts = JSON.parse(localStorage.getItem('products'));

    if (!storedProducts) {
      // Jika tidak ada produk di local storage, inisialisasi dengan produk awal
      const initialProducts = [
        { id: 1, name: 'Produk 1', price: 10.0, image: 'product1.jpg', stock: 10 },
        { id: 2, name: 'Produk 2', price: 15.0, image: 'product2.jpg', stock: 5 },
        { id: 3, name: 'Produk 3', price: 20.0, image: 'product3.jpg', stock: 20 },
      ];
      localStorage.setItem('products', JSON.stringify(initialProducts));
      setProducts(initialProducts);
    } else {
      // Jika ada produk di local storage, gunakan data tersebut
      setProducts(storedProducts);
    }

    // Ambil keranjang belanja dari local storage jika ada
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    if (storedCart) {
      setCart(storedCart);
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        {/* Navigasi dan menu di atas */}
        <nav className="navbar p-4 navbar-expand-lg bg-light">
          <div className="container">
            <Link to="/" className="nav-link">Beranda</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="d-flex collapse justify-content-end navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <Link to="/add-produk" className="nav-link">Tambah Produk</Link>
                <Link to="/cart" className="nav-link">Keranjang ({cart.length})</Link>
              </div>
            </div>
          </div>
        </nav>
        
        {/* Routing untuk halaman aplikasi */}
        <Routes>
          <Route path="/add-produk" element={<AddProduk onAdd={addProduct} />} />
          <Route
            path="/edit-produk/:id"
            element={<EditProduk products={products} onUpdateProduct={handleUpdateProduct} />}
          />
          <Route path="/" element={
            <div>
              <div className='container p-5'>
                <h1 className='mb-5'>Daftar Produk</h1>
                <div className='row'>
                  {/* Menampilkan daftar produk */}
                  {products.map((product) => (
                    <div className='col-3'>
                      <div className="card">
                        <img src={product.image} alt={product.name} />
                        <div className="card-body">
                          <h1 className="d-block">{product.name}</h1>
                          <div className="">{formatRupiah(product.price)}</div>
                          <span className="d-block mb-3">
                            <span className="font-weight-light">Stock: </span>
                            <span className="text-success">{product.stock}</span>
                          </span>
                          <button className="btn btn-sm btn-danger m-1" onClick={() => deleteProduct(product.id)}>Hapus</button>
                          <Link to={`/edit-produk/${product.id}`} className="btn btn-sm btn-warning m-1">Edit</Link>
                          <button className="btn btn-sm btn-primary m-1" onClick={() => addToCart(product)}>Add To Cart</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          } />
          <Route path="/cart" element={
            <div>
              <div className='container p-5'>
                <h1 className='mb-5'>Keranjang Belanja</h1>
                <div className='row'>
                  {/* Menampilkan keranjang belanja */}
                  {cart.map((item) => (
                    <div className='col-3'>
                      <div className="card">
                        <img src={item.image} alt={item.name} />
                        <div className="card-body">
                          <h1 className="d-block">{item.name}</h1>
                          <div className="">{formatRupiah(item.price)}</div>
                          <span className="d-block mb-3">
                            <span className="font-weight-light">Qty: </span>
                            <span className="text-success">{item.quantity}</span>
                          </span>
                          <button className="btn btn-sm btn-danger" onClick={() => removeFromCart(item.id)}>Hapus</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {cart.length > 0 && (
                  <div>
                    <div className='mt-5 d-flex justify-content-end'>
                      <div>
                        <h5 className='d-block'>Total : {formatRupiah(totalHarga)}</h5>
                      </div>
                    </div>
                    <div className='d-flex justify-content-end'>
                      <div>
                        <button className="btn btn-primary d-grid" onClick={handleCheckout}>Checkout</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
