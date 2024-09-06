const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY || 'YOUR_API_KEY_HERE';

async function fetchClaudeResponse(prompt) {
    try {
        const response = await fetch('https://api.anthropic.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': CLAUDE_API_KEY
            },
            body: JSON.stringify({
                prompt: prompt,
                model: 'claude-v1',
                max_tokens_to_sample: 300
            })
        });

        if (!response.ok) {
            throw new Error('Failed to fetch response from Claude API');
        }

        const data = await response.json();
        return data.completion;
    } catch (error) {
        console.error('Error fetching Claude response:', error);
        return 'Sorry, I encountered an error while processing your request.';
    }
}

// Example usage:
// fetchClaudeResponse("Tell me more about TechCorp").then(response => {
//     console.log(response);
// });