import React from 'react';

function WordPairDisplay({ words, onGetNewWords, loading }) {
  return (
    <div className="word-pair-display">
      <h2 className="card-title">{words.join(' ')}</h2>
      <button className="button" onClick={onGetNewWords} disabled={loading}>
        {loading ? 'Getting words...' : 'Get New Words'}
      </button>
    </div>
  );
}

export default WordPairDisplay;
