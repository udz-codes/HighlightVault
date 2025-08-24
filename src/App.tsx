import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [highlights, setHighlights] = useState<string[]>(
    []
  );

  useEffect(() => {
    if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
      chrome.storage.local.get({ highlights: [] }, (result) => {
        setHighlights(result.highlights);
      });
    }
  }, []);

  const deleteHighlight = (index: number) => {
    const updatedHighlights = highlights.filter((_, idx) => idx !== index);
    setHighlights(updatedHighlights);
    if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
      chrome.storage.local.set({ highlights: updatedHighlights });
    }
  };

  return (
    <div className="flex-col p-4 w-80 h-96">
      <h2 className="font-bold mb-2">Saved Highlights</h2>
      <div className="flex flex-col gap-2 overflow-y-auto max-h-72">
        {highlights.length === 0 ? (
          <p className="text-gray-400 text-sm">No highlights saved yet.</p>
        ) : (
          highlights.map((text, id) => (
        <div key={id} className="flex justify-between gap-2 items-center p-2 border-2 text-sm">
          <span
            className="flex-1 overflow-x-auto whitespace-nowrap max-w-xs pr-2"
            style={{
          display: 'block',
          scrollbarWidth: 'none', // Firefox
          msOverflowStyle: 'none', // IE/Edge
            }}
          >
            <style>
          {`
            .hide-scrollbar::-webkit-scrollbar {
              display: none;
            }
          `}
            </style>
            <span className="hide-scrollbar">{text}</span>
          </span>
          <button
            className="ml-2"
            onClick={() => deleteHighlight(id)}
          >
            ❌
          </button>
        </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App
