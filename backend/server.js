const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.post('/api/words', async (req, res) => {
  try {
    const response = await axios.post('https://api.anthropic.com/v1/messages', {
      model: 'claude-3-sonnet-20240229',
      max_tokens: 50,
      messages: [{
        role: 'user',
        content: 'Generate two familiar, concrete English words that are not commonly paired together. The pairing should be unusual and thought-provoking, but not nonsensical or fantastical. Return ONLY the two words, separated by a single space, with no other text.'
      }]
    }, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'anthropic-beta': 'messages-2023-12-15'
      }
    });
    console.log('LLM response:', response.data);
    const newWords = response.data.content[0].text.trim().toLowerCase().split(' ');
    res.json({ words: newWords });
  } catch (error) {
    console.error('Backend error:', error.message);
    res.status(500).json({ error: 'Failed to fetch words.' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
