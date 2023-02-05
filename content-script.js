console.log("This is console.js!");

chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(msg, sender, resp) {
    console.log(msg);
    if(msg === "Find modals") {
        const modals = document.querySelectorAll(".modal, .vc-modal, .vc-modal-static");
        const response = {
            count: modals.length,
            modals: []
        };
        // Array.prototype.forEach.call(arrayLike, (el) => {        });
        modals.forEach((el) => {
            response.modals.push(el.id)
        });
        console.log(response);
        resp(response);
    }
}
