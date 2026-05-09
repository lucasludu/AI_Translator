const fetch = require('node-fetch');

async function test() {
  try {
    const response = await fetch('http://localhost:3000/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: 'Hello', sourceLang: 'en', targetLang: 'es' })
    });
    const data = await response.json();
    console.log('Response:', data);
  } catch (error) {
    console.error('Test failed:', error);
  }
}

test();
