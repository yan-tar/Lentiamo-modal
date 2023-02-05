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
        console.log("we should show modal", msg.modalId);
    }
}


function hideModals() {
    document.querySelector("body").classList.remove("modal-open");
    modals.forEach((el) => {
        el.classList.remove("in");
        el.style.display = "none";
    });
  }

function showModal(id) {
    document.querySelector("body").classList.add("modal-open");
    document.getElementById(id).classList.add("in");
    document.getElementById(id).style.display = "block";
}
