/*
 * Copies a text to clipboard
 *
 * @param String input
 */
const copy = input => {
    let inputElem = document.createElement('input');
    inputElem.setAttribute('value', input);
    document.body.appendChild(inputElem);
    inputElem.select();
    const result = document.execCommand('copy');
    document.body.removeChild(inputElem);
    return result;
}

//OpenOlat spawns videos in an iframe
if (window != window.top) {
    let bodyElements = document.querySelectorAll('body > *');
    //ignore empty frames
    if (bodyElements.length !== 0) {
        for (let i = 0; i < bodyElements.length; i++) {
            /*
                A player looks like this:
                P > #olatFlashMovieViewer997235.olatFlashMovieViewer > [...] > mediaelementwrapper > video[] > source.src
            */
            if (bodyElements[i].tagName === 'P') {
                let elements = bodyElements[i].childNodes;
                if (elements.length === 1) {
                    if ((elements[0].tagName === 'SPAN') && (elements[0].className === 'olatFlashMovieViewer')) {
                        let mediaPlayer = elements[0].getElementsByTagName('mediaelementwrapper');
                        if (mediaPlayer.length === 1) {
                            let videoObjects = mediaPlayer[0].childNodes;
                            if (videoObjects.length !== 0) {
                                //Houston, we got it
                                let src = videoObjects[0].childNodes[0].src;
                                if ((src !== null) && (src !== "")) {
                                    //create div and button
                                    let div = document.createElement("DIV");
                                    div.style = 'text-align:right; width: 100%; padding-top:10px';
                                    let btn = document.createElement("BUTTON");
                                    btn.style = 'background-color: #1b599c; border: none; color: white; padding: 7px 16px; text-decoration: none; display: inline-block'
                                    btn.addEventListener("click", () => {
                                        copy(src);
                                        alert('Copied!')
                                    });
                                    var t = document.createTextNode("Copy m3u8 link");
                                    btn.appendChild(t);
                                    div.appendChild(btn);

                                    //insert it into the dom
                                    mediaPlayer[0].parentNode.parentNode.parentNode.after(div);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}