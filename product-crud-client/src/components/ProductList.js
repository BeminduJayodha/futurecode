import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ProductList() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data);
    } catch (error) {
      console.error('Failed to load products:', error);
    }
  };

  const deleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      fetchProducts();
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const containerStyle = {
    maxWidth: '900px',
    margin: '40px auto',
    padding: '20px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
  };

  const addButtonStyle = {
    padding: '10px 16px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    textDecoration: 'none',
    fontWeight: '500',
  };

  const cardStyle = {
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
    padding: '20px',
    marginBottom: '20px',
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const productInfo = {
    flex: 1,
  };

  const actionGroup = {
    display: 'flex',
    gap: '10px',
  };

  const actionButton = {
    padding: '8px 12px',
    fontSize: '14px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
  };

  const editButton = {
    ...actionButton,
    backgroundColor: '#007bff',
    color: 'white',
    textDecoration: 'none',
  };

  const deleteButton = {
    ...actionButton,
    backgroundColor: '#dc3545',
    color: 'white',
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h2>Product List</h2>
        <Link to="/add" style={addButtonStyle}>+ Add Product</Link>
      </div>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        products.map((prod) => (
          <div key={prod.id} style={cardStyle}>
            <div style={productInfo}>
              <h4>{prod.name}</h4>
              <p> ${prod.price} &nbsp; | &nbsp;  Quantity: {prod.quantity}</p>
            </div>
            <div style={actionGroup}>
              <Link to={`/edit/${prod.id}`} style={editButton}> Edit</Link>
              <button onClick={() => deleteProduct(prod.id)} style={deleteButton}>
                 Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ProductList;
