document.addEventListener('mouseup', () => {
  const selection = window.getSelection();
  if (selection && selection.rangeCount > 0) {
    const selectedText = selection.toString().trim();
    if (selectedText.length > 0) {
      showPopup(selectedText);
    }
  }
});

function showPopup(text: string) {
  // Remove any existing popup
  const oldPopup = document.getElementById('highlight-vault-popup');
  if (oldPopup) oldPopup.remove();

  let popup = document.createElement('div');
  popup.id = 'highlight-vault-popup';
  popup.innerText = 'Save Highlight?';
  popup.style.position = 'absolute';
  popup.style.background = '#fff';
  popup.style.border = '1px solid #ccc';
  popup.style.padding = '5px';
  popup.style.cursor = 'pointer';
  popup.style.zIndex = '9999';

  const selection = window.getSelection();
  if (selection && selection.rangeCount > 0) {
    const rect = selection.getRangeAt(0).getBoundingClientRect();
    popup.style.top = `${rect.bottom + window.scrollY}px`;
    popup.style.left = `${rect.left + window.scrollX}px`;
  }

  document.body.appendChild(popup);

  popup.onclick = () => {
    chrome.runtime.sendMessage({ action: 'saveHighlight', text });
    popup.remove();
  };
}