import React, { useState } from 'react';

function WritingInput({ onSubmit, disabled }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text.trim());
      setText('');
    }
  };

  return (
    <form className="writing-input" onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Write something using the word pair..."
        disabled={disabled}
        rows={3}
      />
      <button type="submit" disabled={disabled || !text.trim()}>
        Submit
      </button>
    </form>
  );
}

export default WritingInput;
