console.log("This is content-script.js!");
const modals = document.querySelectorAll(".modal, .vc-modal, .vc-modal-static");
chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(msg, sender, resp) {
    console.log(msg);
    if(msg.txt === "Find modals") {
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
    else if (msg.txt === "Show modal") {
        hideModals();
        showModal(msg.modalId);
    }
}


function hideModals() {
    modals.forEach((el) => {
        $(el).modal("hide");
    });
  }

function showModal(id) {
    $("#"+id).modal();
}
