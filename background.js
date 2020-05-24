//Setup a listener and pass event to content script
chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
    //detect title changes aswell, sometimes the url is not modified
    if (changeInfo.url || changeInfo.title) {
        chrome.tabs.sendMessage(tabId, {
            message: 'url-changed',
            url: changeInfo.url
        })
    }
});
