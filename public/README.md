# BabyficationWebsite

A single-page website showcasing the "Babification" trend - transforming photos into baby versions.

## Overview

This website allows users to:

- Learn about the Babyficationtrend
- See examples of transformed images
- Upload their own images for transformation (simulated in the demo)
- Download and share their babified images

## Technology Stack

- HTML5
- CSS3 (with modern features like CSS variables, flexbox, gradients)
- Vanilla JavaScript
- Optional: Node.js server for OpenAI API integration

## Features

- Responsive design that works on all devices
- Modern, futuristic UI with animations
- Drag and drop file uploads
- Image processing demonstration
- Download and share capabilities

## Project Structure

- `index.html` - Main HTML structure
- `styles.css` - All styling for the website
- `script.js` - JavaScript functionality
- `server.js` - Optional Node.js server for OpenAI API integration
- `package.json` - Node.js dependencies for the server

## How to Run Locally (Static Website Only)

1. Clone this repository
2. Open `index.html` in a web browser

## How to Run with OpenAI Integration

1. Create a `.env` file with your OpenAI API key:

   ```
   OPENAI_API_KEY=your_openai_api_key_here
   PORT=3000
   ```

2. Install the required dependencies:

   ```
   npm install
   ```

3. Start the server:

   ```
   npm start
   ```

4. Open `http://localhost:3000` in your browser

## Deployment

- Static website: Can be hosted on any web server or static hosting platform like GitHub Pages, Netlify, or Vercel.
- With server: Can be deployed to platforms like Heroku, Render, or any Node.js hosting service.

## Future Improvements

- Integration with OpenAI API for actual image transformation
- User authentication
- Gallery of user-generated babified images
- Advanced sharing options

## About Babification

Babyficationis a trending image transformation technique where photos are altered to make subjects appear as baby versions of themselves. The trend gained popularity on social media platforms and was mentioned by Theo Von in his content.
