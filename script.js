
document.getElementById('submit').addEventListener('click', async function() {
    const article = document.getElementById('article').value;
    const query = document.getElementById('query').value;

    if (!article || !query) {
        alert("Please enter both the article and your question.");
        return;
    }

    const responseDiv = document.getElementById('response');
    responseDiv.innerHTML = 'Loading...';

    try {
        // Dynamically build the fetch URL
        const fetchUrl = `${window.location.origin}/chat`;  // Adjusts based on the current origin

        const response = await fetch(fetchUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ article, query }),
        });

        const data = await response.json();
        if (response.ok) {
            responseDiv.innerHTML = `
                <h2>Response</h2>
                <p><strong>Headlines:</strong> ${data.headlines.join(', ')}</p>
                <p><strong>Tone:</strong> ${data.tone}</p>
                <p><strong>Summary:</strong> ${data.summary}</p>
                <p><strong>Dynamic Response:</strong> ${data.dynamic_response}</p>
            `;
        } else {
            responseDiv.innerHTML = '<p>Error: ' + data.error + '</p>';
        }
    } catch (error) {
        responseDiv.innerHTML = '<p>Error: ' + error.message + '</p>';
    }
});
