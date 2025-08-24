chrome.runtime.onMessage.addListener((message) => {
    if (message.action === 'saveHighlight' && message.text) {
        console.log(message);
        chrome.storage.local.get({ highlights: [] }, (result) => {
            const highlights = result.highlights;
            highlights.push(message.text);
            chrome.storage.local.set({ highlights });
        });
    }
});