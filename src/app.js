const express = require('express');
const config = require('./config/config');
const logger = require('./middleware/logger');
const { errorHandler } = require('./middleware/errorHandler');
const settingsRoutes = require('./routes/settingsRoutes');

const app = express();


app.use(express.json());
app.use(logger);


app.use('/api/settings', settingsRoutes);

app.get('/', (req, res) => {
  res.json({ success: true, message: 'API is running ' });
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});


app.use(errorHandler);

const server = app.listen(config.port, () => {
  console.log(` Server running: http://localhost:${config.port}`);
});


process.on('SIGINT', () => {
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});