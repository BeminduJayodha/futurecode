import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function ProductForm() {
  const [form, setForm] = useState({ name: '', price: '', quantity: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  const loadProduct = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:5000/api/products/${id}`);
      setForm(res.data);
    } catch (error) {
      setMessage('❌ Failed to load product.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) loadProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      if (id) {
        await axios.put(`http://localhost:5000/api/products/${id}`, form);
        setMessage('✅ Product updated successfully!');
      } else {
        await axios.post('http://localhost:5000/api/products', form);
        setMessage('✅ Product added successfully!');
        setForm({ name: '', price: '', quantity: '' }); // clear form after add
      }
      setTimeout(() => navigate('/'), 1000);
    } catch (error) {
      setMessage('❌ Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 15px',
    margin: '8px 0 20px 0',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px',
    boxSizing: 'border-box',
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '8px',
    color: 'white',
    fontSize: '18px',
    cursor: 'pointer',
    fontWeight: '600',
  };

  const formContainer = {
    maxWidth: '400px',
    margin: '60px auto',
    padding: '30px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
    borderRadius: '12px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#fff',
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '30px',
    color: '#333',
  };

  const messageStyle = {
    textAlign: 'center',
    marginBottom: '20px',
    color: message.startsWith('✅') ? 'green' : 'red',
    fontWeight: '600',
  };

  return (
    <div style={formContainer}>
      <h2 style={headerStyle}>{id ? 'Edit' : 'Add'} Product</h2>
      {message && <div style={messageStyle}>{message}</div>}
      <form onSubmit={handleSubmit}>
        <input
          style={inputStyle}
          placeholder="Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
          disabled={loading}
        />
        <input
          style={inputStyle}
          placeholder="Price"
          type="number"
          value={form.price}
          onChange={e => setForm({ ...form, price: e.target.value })}
          required
          min="0"
          step="0.01"
          disabled={loading}
        />
        <input
          style={inputStyle}
          placeholder="Quantity"
          type="number"
          value={form.quantity}
          onChange={e => setForm({ ...form, quantity: e.target.value })}
          required
          min="0"
          disabled={loading}
        />
        <button style={buttonStyle} type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}

export default ProductForm;
