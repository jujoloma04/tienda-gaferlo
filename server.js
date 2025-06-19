const express = require('express');
const mysql = require('mysql2/promise');
const nodemailer = require('nodemailer');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(cors({ origin: 'http://localhost:8080' }));
app.use(express.json());

// Configurar conexión a MySQL (XAMPP)
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Configurar Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Rutas CRUD para sellos estándar
app.get('/api/seals', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM seals');
    res.json(rows);
  } catch (err) {
    console.error('Error al obtener sellos:', err);
    res.status(500).json({ message: 'Error al obtener sellos' });
  }
});

app.post('/api/seals', async (req, res) => {
  try {
    const { id, name, material, price, description } = req.body;
    await pool.query(
      'INSERT INTO seals (id, name, material, price, description) VALUES (?, ?, ?, ?, ?)',
      [id, name, material, price, description]
    );
    res.json({ id, name, material, price, description });
  } catch (err) {
    console.error('Error al crear sello:', err);
    res.status(500).json({ message: 'Error al crear sello' });
  }
});

app.put('/api/seals/:id', async (req, res) => {
  try {
    const { name, material, price, description } = req.body;
    const [result] = await pool.query(
      'UPDATE seals SET name = ?, material = ?, price = ?, description = ? WHERE id = ?',
      [name, material, price, description, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Sello no encontrado' });
    }
    res.json({ id: req.params.id, name, material, price, description });
  } catch (err) {
    console.error('Error al actualizar sello:', err);
    res.status(500).json({ message: 'Error al actualizar sello' });
  }
});

app.delete('/api/seals/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM seals WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Sello no encontrado' });
    }
    res.json({ message: 'Sello eliminado' });
  } catch (err) {
    console.error('Error al eliminar sello:', err);
    res.status(500).json({ message: 'Error al eliminar sello' });
  }
});

// Ruta para autenticación de administrador
app.post('/api/admin/login', (req, res) => {
  const { email, password } = req.body;
  if (email === 'gaferlo1972@gmail.com' && password === '75069418gaferlo') {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: 'Correo o contraseña incorrectos' });
  }
});

// Ruta para solicitudes de cotización
app.post('/api/quote', async (req, res) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'gaferlo1972@gmail.com',
    subject: 'Solicitud de Cotización - GFLM Sellos Industriales',
    text: JSON.stringify(req.body, null, 2)
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar correo:', error);
      res.status(500).json({ message: 'Error al enviar la solicitud' });
    } else {
      console.log('Correo enviado:', info.response);
      res.json({ message: 'Solicitud enviada' });
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
  try {
    const [rows] = await pool.query('SELECT 1');
    console.log('Conectado a MySQL en XAMPP');
  } catch (err) {
    console.error('Error al conectar a MySQL:', err);
  }
});