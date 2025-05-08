document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const fileInput = document.getElementById('fileInput');
    const uploadArea = document.getElementById('uploadArea');
    const resultArea = document.getElementById('resultArea');
    const originalImage = document.getElementById('originalImage');
    const resultImage = document.getElementById('resultImage');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const downloadBtn = document.getElementById('downloadBtn');
    const shareBtn = document.getElementById('shareBtn');
    const tryAgainBtn = document.getElementById('tryAgainBtn');

    // Event Listeners
    uploadArea.addEventListener('click', function() {
        fileInput.click();
    });

    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', function() {
        uploadArea.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        
        if (e.dataTransfer.files.length) {
            fileInput.files = e.dataTransfer.files;
            handleFileUpload(e.dataTransfer.files[0]);
        }
    });

    fileInput.addEventListener('change', function() {
        if (fileInput.files.length) {
            handleFileUpload(fileInput.files[0]);
        }
    });

    tryAgainBtn.addEventListener('click', function() {
        resultArea.style.display = 'none';
        uploadArea.style.display = 'block';
    });

    downloadBtn.addEventListener('click', function() {
        // Create a temporary link element
        const link = document.createElement('a');
        link.href = resultImage.src;
        link.download = 'babified-image.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    shareBtn.addEventListener('click', function() {
        // Check if Web Share API is supported
        if (navigator.share) {
            fetch(resultImage.src)
                .then(res => res.blob())
                .then(blob => {
                    const file = new File([blob], 'babified-image.png', { type: 'image/png' });
                    navigator.share({
                        title: 'My Babified Image',
                        text: 'Check out my babified image!',
                        files: [file]
                    }).catch(err => {
                        alert('Error sharing: ' + err);
                    });
                });
        } else {
            // Fallback for browsers that don't support Web Share API
            alert('Copy this link to share: ' + window.location.href);
        }
    });

    // Functions
    function handleFileUpload(file) {
        // Check if file is an image
        if (!file.type.match('image.*')) {
            alert('Please upload an image file');
            return;
        }

        // Show the original image
        const reader = new FileReader();
        reader.onload = function(e) {
            originalImage.src = e.target.result;
            uploadArea.style.display = 'none';
            resultArea.style.display = 'block';
            loadingSpinner.style.display = 'block';
            resultImage.style.display = 'none';
            
            // Simulate API call with a timeout
            setTimeout(function() {
                babifyImage(e.target.result);
            }, 2000);
        };
        reader.readAsDataURL(file);
    }

    function babifyImage(imageDataUrl) {
        // In a real implementation, this would be an API call to OpenAI
        // For demo purposes, we're just simulating the API call
        
        // Simulation: Let's just use the original image but apply a filter
        resultImage.src = imageDataUrl;
        
        // Apply a CSS filter to simulate "babification"
        resultImage.style.filter = 'saturate(1.2) brightness(1.1) contrast(0.85) sepia(0.15)';
        
        // Show the result image and hide the loading spinner
        loadingSpinner.style.display = 'none';
        resultImage.style.display = 'block';
    }

    // The following is a commented out example of how the OpenAI API integration could work
    // This code would replace the babifyImage function above in a production environment
    /*
    async function babifyImage(imageDataUrl) {
        try {
            // Convert the data URL to a blob
            const response = await fetch(imageDataUrl);
            const blob = await response.blob();
            
            // Create a FormData object and append the image
            const formData = new FormData();
            formData.append('image', blob, 'image.png');
            formData.append('prompt', 'Can you take this photo but make it look like a baby version');
            
            // Make the API call to your server
            // Note: You should NOT call OpenAI directly from the client for security reasons
            // Instead, create a server endpoint that will call OpenAI API
            const apiResponse = await fetch('/api/babify', {
                method: 'POST',
                body: formData
            });
            
            if (!apiResponse.ok) {
                throw new Error('API request failed');
            }
            
            const result = await apiResponse.json();
            
            // Display the result image
            resultImage.src = result.image_url;
            loadingSpinner.style.display = 'none';
            resultImage.style.display = 'block';
        } catch (error) {
            console.error('Error babifying image:', error);
            alert('Sorry, there was an error processing your image. Please try again.');
            loadingSpinner.style.display = 'none';
            tryAgainBtn.click();
        }
    }
    */

    // Floating Elements Animation
    const floatElements = document.querySelectorAll('.float-element');
    floatElements.forEach(element => {
        // Randomize starting positions slightly
        const randomX = Math.random() * 20 - 10; // -10 to 10
        const randomY = Math.random() * 20 - 10; // -10 to 10
        element.style.transform = `translate(${randomX}px, ${randomY}px)`;
    });
}); 