# Quick Start Guide

## Option 1: Static Website (No OpenAI Integration)

### What You'll Get

- A fully functional website with simulated babification
- No API keys or server setup required
- Image uploads with visual effects to simulate babification

### Steps

1. Clone or download this repository
2. Open `index.html` in any modern web browser
3. That's it! The site is ready to use

## Option 2: With OpenAI API Integration

### What You'll Get

- Full website with actual AI-powered image transformation
- Real Babyficationusing OpenAI's image generation capabilities
- Backend server to handle API calls securely

### Prerequisites

- Node.js installed (v14 or later)
- OpenAI API key (get one at https://platform.openai.com/api-keys)

### Steps

1. Clone or download this repository
2. Create a file named `.env` in the root directory with:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```
3. Open a terminal in the project directory and run:
   ```
   npm install
   npm start
   ```
4. Open `http://localhost:3000` in your browser

## Troubleshooting

### Static Version Issues

- Make sure you're using a modern browser (Chrome, Firefox, Edge, Safari)
- If images don't load, check your internet connection
- If styling looks off, try clearing your browser cache

### Server Version Issues

- If you get an error about modules not found, run `npm install` again
- If the server won't start, check your `.env` file format
- If image processing fails, verify your OpenAI API key is valid and has sufficient credits

## Need Help?

Refer to the full README.md file for more details or open an issue on GitHub.
