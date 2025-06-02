const express = require('express');
const cors = require('cors');
const tasksRoutes = require('./routes/tasks');
require('dotenv').config();

const app = express();

app.use(cors()); // autorise toutes origines par défaut
app.use(express.json());

app.use("/api/tasks", tasksRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
