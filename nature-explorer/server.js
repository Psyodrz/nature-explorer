require('dotenv').config();
const express = require('express');
const path = require('path');
const os = require('os');
const app = express();
const PORT = process.env.PORT || 3000;

// Get the local IP address
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      // Skip over non-IPv4 and internal (loopback) addresses
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', message: 'Nature Explorer API is running' });
});

// Serve static files from the React build
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

const localIP = getLocalIP();

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🌿 Nature Explorer server is running on port ${PORT}`);
  console.log(`🌎 Local access: http://localhost:${PORT}`);
  console.log(`🔗 Network access: http://${localIP}:${PORT}`);
  console.log(`\nShare the app with other devices on your network using the Network URL`);
}); 