console.log("This is content-script.js!");
// const modals = document.getElementsByClassName("modal");
const modals = document.querySelectorAll(".modal, .vc-modal, .vc-modal-static");
chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(msg, sender, resp) {
    console.log(msg);
    if(msg.txt === "Find modals") {
        const response = makeModalsObj();
        console.log(response);
        resp(response);
    }
    else if (msg.txt === "Show modal") {
        hideModals();
        showModal(msg.modalId);
    }
    else if (msg.txt === "Hide modal") {
        hideModal(msg.modalId);
    }
}

function makeModalsObj() {
    const response = {
        count: modals.length,
        modals: []
    };
    // Array.prototype.forEach.call(modals, (el) => {
    modals.forEach((el) => {
        response.modals.push({id: el.id, classList: el.classList.value})
    });
    return response;
}

function hideModals() {
    // Array.prototype.forEach.call(modals,(el) => {
    modals.forEach((el) => {
        $(el).modal("hide");
    });
}

function hideModal(id) {
    $("#"+id).modal("hide");
}

function showModal(id) {
    $("#"+id).modal();
}
