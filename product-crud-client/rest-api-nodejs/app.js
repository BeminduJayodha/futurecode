const express = require('express');
const cors = require('cors');  
const dotenv = require('dotenv');
const { connectDB, sequelize } = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const User = require('./models/User');
const Product = require('./models/Product');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
// Serve static files from the "public" folder
app.use(express.static('public'));

connectDB();

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.get('/', (req, res) => {
  res.send('API is running. ');
});

sequelize.sync().then(() => {
    console.log("Tables created.");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
