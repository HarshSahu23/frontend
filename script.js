document.getElementById('submitBtn').addEventListener('click', function () {
    const jsonInput = document.getElementById('jsonInput').value;
    const errorElement = document.getElementById('error');
    const dropdownSection = document.getElementById('dropdownSection');
    const responseDisplay = document.getElementById('responseDisplay');
    
    // Reset error and response display
    errorElement.textContent = '';
    responseDisplay.innerHTML = '';

    // Validate JSON
    let parsedJson;
    try {
        parsedJson = JSON.parse(jsonInput);

        if (!Array.isArray(parsedJson.data)) {
            throw new Error("JSON must contain an array under 'data' key");
        }
    } catch (e) {
        errorElement.textContent = `Invalid JSON: ${e.message}`;
        return;
    }

    // If JSON is valid, call the REST API
    fetch('http://localhost:8080/bfhl', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(parsedJson)
    })
    .then(response => response.json())
    .then(data => {
        // Save the response data to a variable
        window.responseData = data;

        // Show the dropdown section
        dropdownSection.classList.remove('hidden');
    })
    .catch(error => {
        errorElement.textContent = `Error: ${error.message}`;
    });
});

document.getElementById('showResponseBtn').addEventListener('click', function () {
    const selectedOptions = Array.from(document.getElementById('responseOptions').selectedOptions)
                                 .map(option => option.value);
    const responseDisplay = document.getElementById('responseDisplay');
    const responseData = window.responseData;

    responseDisplay.innerHTML = '';

    // Render response based on selected options
    selectedOptions.forEach(option => {
        const value = responseData[option];
        if (value) {
            const p = document.createElement('p');
            p.textContent = `${option.charAt(0).toUpperCase() + option.slice(1)}: ${Array.isArray(value) ? value.join(', ') : value}`;
            responseDisplay.appendChild(p);
        }
    });
});
