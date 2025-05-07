import React from 'react';

function ChatHistory({ history, onAnalyze, analysisResult, analyzing }) {
  return (
    <div className="chat-history">
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <h3 style={{margin: 0}}>History</h3>
        <button className="button" style={{margin: 0}} onClick={onAnalyze} disabled={history.length === 0 || analyzing}>
          {analyzing ? 'Analyzing...' : 'Analyze My Writing'}
        </button>
      </div>
      {analysisResult && (
        <div className="analysis-result analysis-result-spaced">
          {analysisResult
            .split(/\n\n|(?<=\.)\s{1,}/)
            .filter(p => p.trim().length > 0)
            .map((p, i) => (
              <p className="analysis-result-paragraph" key={i}>{p.trim()}</p>
            ))}
        </div>
      )}
      {history.length === 0 ? (
        <p>No entries yet.</p>
      ) : (
        <ul>
          {history.map((entry, idx) => {
            const entryNumber = history.length - idx;
            const date = entry.timestamp ? new Date(entry.timestamp) : null;
            const formattedDate = date ? date.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' }) : '';
            return (
              <li key={idx} className="chat-entry">
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.2em' }}>
                  <span className="chat-entry-number">#{entryNumber}</span>
                  {formattedDate && <span className="chat-entry-timestamp" style={{ marginLeft: '0.7em', color: '#888', fontSize: '0.98em', fontFamily: 'Georgia, serif' }}>{formattedDate}</span>}
                </div>
                <div className="chat-word-pair">{entry.words.join(' ')}</div>
                <div className="chat-user-response">{entry.response}</div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default ChatHistory;
