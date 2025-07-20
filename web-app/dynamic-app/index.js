// Example application for deployment strategies
// To use blue/green configurations, K8s pod must have a label named "version"
// Values for version could be 'blue', 'green', 'red'
// Configure related deployments ans services accordingly
const express = require('express');
const app = express();
const port = 80;

// Serve static files (if needed)
app.use(express.static('public'));

// Route to serve the dynamic HTML page
app.get('/', (req, res) => {
    const podName = process.env.POD_NAME || 'Local Deployment';
    const podIP = process.env.POD_IP || 'Local Deployment';
    const podVersion = process.env.VERSION || 'default';

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Dynamic Color Page</title>
            <style>
                body {
                    color: white;
                    font-family: Arial, sans-serif;
                    text-align: center;
                    padding: 50px;
                }
            </style>
        </head>
        <body>
            <h1>Welcome to my dynamic color page!</h1>
            <p><strong>Pod Name:</strong> <span id="pod-name">${podName}</span></p>
            <p><strong>Pod IP:</strong> <span id="pod-ip">${podIP}</span><p/>
            <p><strong>Pod Version:</strong> <span id="pod-version">${podVersion}</span><p/>

            <script>
                const podVersion = '${podVersion}';

                // Function to set dynamic colors based on pod version
                function setDynamicColors() {
                    let backgroundColor;

                    // Example logic to determine colors based on pod version label
                    switch (podVersion) {
                        case 'blue':
                            backgroundColor = 'blue';
                            textColor = 'white';
                            break;
                        case 'green':
                            backgroundColor = 'green';
                            textColor = 'white';
                            break;
                        case 'red':
                            backgroundColor = 'red';
                            textColor = 'white';
                            break;
                        default:
                            backgroundColor = 'white';
                            textColor = 'black';
                    }

                    // Apply the colors to the body
                    document.body.style.backgroundColor = backgroundColor;
                    document.body.style.color = textColor;
                }

                // Call the function to set colors
                setDynamicColors();
            </script>
        </body>
        </html>
    `);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});
