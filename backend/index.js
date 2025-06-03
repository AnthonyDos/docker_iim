const express = require('express');
const cors = require('cors');
const tasksRoutes = require('./routes/tasks');
require('dotenv').config();

const app = express();

app.use(cors()); 
app.use(express.json());

app.use("/api/tasks", tasksRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});