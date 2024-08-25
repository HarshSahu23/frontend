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

            // Process the JSON data to generate a simulated response
            const data = parsedJson.data;
            const numbers = data.filter(item => !isNaN(item));
            const alphabets = data.filter(item => isNaN(item));
            const highestLowercaseAlphabet = alphabets.filter(item => item === item.toLowerCase());

            // Simulated response
            window.responseData = {
                is_success: true,
                user_id: "harsh_sahu_04052003",
                email: "harsh.sahu2021@vitbhopal.ac.in",
                roll_number: "21BSA10129",
                numbers: numbers,
                alphabets: alphabets,
                highest_lowercase_alphabet: highestLowercaseAlphabet
            };

            // Show the dropdown section
            dropdownSection.classList.remove('hidden');
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
                    p.textContent = `${option.replace(/_/g, ' ').toUpperCase()}: ${Array.isArray(value) ? value.join(', ') : value}`;
                    responseDisplay.appendChild(p);
                }
            });
        });
