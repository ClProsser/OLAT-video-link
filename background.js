//Check if we use chrome or firefox
const engine = (typeof InstallTrigger !== 'undefined') ? browser : chrome;

//Setup a listener and pass event to content script
engine.tabs.onUpdated.addListener((tabId, changeInfo) => {
    //detect title changes aswell, sometimes the url is not modified
    if (changeInfo.url || changeInfo.title) {
        engine.tabs.sendMessage(tabId, {
            message: 'url-changed',
            url: changeInfo.url
        })
    }
});
