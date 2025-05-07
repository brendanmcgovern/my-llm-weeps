import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import WordPairDisplay from './WordPairDisplay';
import WritingInput from './WritingInput';
import ChatHistory from './ChatHistory';

function App() {
  const [words, setWords] = useState(['gently', 'weeps']);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const getNewWords = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5001/api/words');
      setWords(response.data.words);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (response) => {
    setHistory([
      { words, response },
      ...history,
    ]);
    getNewWords();
  };

  return (
    <div className="app">
      <div className="subheader">
        George Harrison wrote <em>While My Guitar Gently Weeps</em> after randomly opening a book and seeing the words "gently weeps." That chance pairing sparked an iconic song—This app invites you to do the same—receive two unexpected words, and turn them into something new. Write a sentence, explore your creativity, and let randomness lead the way.
      </div>
      <div className="card">
        <WordPairDisplay words={words} onGetNewWords={getNewWords} loading={loading} />
        <WritingInput onSubmit={handleSubmit} disabled={loading} />
      </div>
      <ChatHistory history={history} />
    </div>
  );
}

export default App;
