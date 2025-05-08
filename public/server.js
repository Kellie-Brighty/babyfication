// This is a sample server implementation for integrating with OpenAI API
// You would need to install the following dependencies:
// npm install express cors multer dotenv openai

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { OpenAI } = require('openai');
require('dotenv').config();

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;

// Configure CORS
app.use(cors());

// Serve static files
app.use(express.static(path.join(__dirname, '.')));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  }
});

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// API endpoint for babifying an image
app.post('/api/babify', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file uploaded' });
    }

    // Get the prompt from the request or use a default
    const prompt = req.body.prompt || 'Can you take this photo but make it look like a baby version';

    // Get the uploaded file path
    const imagePath = req.file.path;

    // Create a readable stream of the file
    const imageFile = fs.createReadStream(imagePath);

    // Call OpenAI API
    const response = await openai.images.edit({
      image: imageFile,
      prompt: prompt,
      n: 1,
      size: '1024x1024',
    });

    // Get the generated image URL
    const generatedImageUrl = response.data[0].url;

    // In a production app, you would download the image, save it to your server,
    // and return a URL to your own server's file
    
    // For this example, we'll just return OpenAI's URL
    // Note: OpenAI's URLs are temporary and expire after a short period
    
    res.json({
      success: true,
      image_url: generatedImageUrl
    });

    // Clean up the uploaded file
    fs.unlinkSync(imagePath);
  } catch (error) {
    console.error('Error processing image:', error);
    res.status(500).json({ 
      error: 'Error processing image', 
      details: error.message 
    });
  }
});

// Default route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Open http://localhost:${port} in your browser`);
});

// Add this note to help people understand what they need to set up
console.log('NOTE: To use this server with OpenAI API, you need to:');
console.log('1. Create a .env file with your OPENAI_API_KEY');
console.log('2. Run: npm install express cors multer dotenv openai');
console.log('3. Start the server with: node server.js'); 