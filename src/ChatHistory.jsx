import React from 'react';

function ChatHistory({ history }) {
  return (
    <div className="chat-history">
      <h3>History</h3>
      {history.length === 0 ? (
        <p>No entries yet.</p>
      ) : (
        <ul>
          {history.map((entry, idx) => (
            <li key={idx} className="chat-entry">
              <div className="chat-word-pair">{entry.words.join(' ')}</div>
              <div className="chat-user-response">{entry.response}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ChatHistory;
