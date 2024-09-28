import { WebSocketServer } from 'ws';
import express from 'express';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import compression from 'compression';
import { createClient } from 'redis';
import { readFile } from 'fs/promises';
import open from 'open'; // Import the open package

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const port = 3990;

// Redis setup
const redisClient = createClient();
redisClient.on('error', (err) => console.log('Redis Client Error', err));
await redisClient.connect();

// Enable gzip compression
app.use(compression());

// Serve static files with caching headers
app.use(express.static(path.join(__dirname, '../dist'), {
  maxAge: '1d',
  setHeaders: (res, path) => {
    if (path.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache');
    }
  }
}));

// Serve the config.json file with Redis caching
app.get('/config.json', async (req, res) => {
  try {
    const cachedConfig = await redisClient.get('config');
    if (cachedConfig) {
      res.json(JSON.parse(cachedConfig));
    } else {
      const configPath = path.join(__dirname, 'config.json');
      const config = await readFile(configPath, 'utf8');
      await redisClient.set('config', config, {
        EX: 3600 // 1 hour expiration
      });
      res.json(JSON.parse(config));
    }
  } catch (error) {
    console.error('Error serving config:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// WebSocket connection
wss.on('connection', (ws) => {
  console.log('Client connected to WebSocket.');

  ws.send(JSON.stringify({
    message: 'Welcome to CALI Logs!',
    time: new Date().toLocaleTimeString()
  }));

  ws.on('close', () => {
    console.log('Client disconnected from WebSocket.');
  });
});

// Broadcast logs to WebSocket clients
export const broadcastLog = (message) => {
  const logMessage = JSON.stringify({
    message,
    time: new Date().toLocaleTimeString()
  });

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(logMessage);
    }
  });
};

// Redirect all routes to Vue app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Start the server and open the browser
server.listen(port, async () => {
  console.log(`Server is running on http://localhost:${port}`);

  // Automatically open the browser to the app's URL
  try {
    await open(`http://localhost:${port}`);
    console.log('Browser opened successfully.');
  } catch (err) {
    console.error('Failed to open browser:', err);
  }
});

// Handle process termination gracefully
process.on('SIGINT', async () => {
  console.log('SIGINT received. Closing WebSocket and HTTP servers...');
  
  wss.close(() => {
    console.log('WebSocket server closed.');
  });

  server.close(() => {
    console.log('HTTP server closed.');
  });

  await redisClient.quit();
  console.log('Redis connection closed.');

  process.exit(0);
});
