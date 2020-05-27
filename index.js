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

/*
 * Adds buttons to the DOM
 */
const addButtons = () => {
    let bodyElements = document.querySelectorAll('body > *');
    //ignore empty frames
    if (bodyElements.length !== 0) {
        //delete existing buttons
        document.querySelectorAll('.MAGIC-LINK-DIV').forEach(elem => elem.remove());
        /*
            A player looks like this:
            [...] > mediaelementwrapper > video[] > source.src
        */
        let mediaPlayer = document.getElementsByTagName('mediaelementwrapper');
        for(let i = 0; i < mediaPlayer.length; i++) {
            let videoObjects = mediaPlayer[i].childNodes;
            if (videoObjects.length !== 0) {
                //Houston, we got it
                let elements = videoObjects[0].childNodes;
                for(let y = 0; y < elements.length; y++){
                    if(elements[y].tagName === 'SOURCE') {
                        //create div and button
                        let div = document.createElement("DIV");
                        div.className = 'MAGIC-LINK-DIV';
                        div.style = 'text-align:right; width: 100%; padding-top:10px';
                        let btn = document.createElement("BUTTON");
                        btn.style = 'background-color: #1b599c; border: none; color: white; padding: 7px 16px; text-decoration: none; display: inline-block'
                        btn.addEventListener("click", () => {
                            copy(elements[y].src);
                            alert('Copied!')
                        });
                        var t = document.createTextNode("Copy video link");
                        btn.appendChild(t);
                        div.appendChild(btn);

                        //insert it into the dom
                        mediaPlayer[i].parentNode.parentNode.parentNode.after(div);
                        break;
                    }
                }
            }
        }
    }
}

//Check if we use chrome or firefox
const engine = (typeof InstallTrigger !== 'undefined') ? browser : chrome;

//Initialise our script
if(document.cookie.indexOf('OLAT-UI-TIMESTAMP') !== -1) {
	 engine.runtime.onMessage.addListener(request => {
        if(request.message === 'url-changed') {
    		addButtons();
        }
	});
    addButtons();
}
