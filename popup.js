const header = document.querySelector('#modal-count');
const msg = {
  txt: "Find modals"
}
const params = {
  active : true,
  currentWindow: true,
  lastFocusedWindow: true
}
chrome.tabs.query(params, gotTabs);


function gotTabs(tabs) {
  let modalCount;
  const response = chrome.tabs.sendMessage(tabs[0].id, msg);
  response.then(function(value) {
    // Handle the resolved value
    console.log("response",value);
    modalCount = value.count;
    header.innerHTML = `${modalCount} modals found`;
    showModalList(value.modals);
  });

}

function showModalList(modalArr) {
  const ul = document.createElement("ul");
  modalArr.forEach(element => {
    const li = document.createElement("li");
    li.innerHTML = "#" + element;
    ul.appendChild(li);
    li.setAttribute("id",element);
    li.addEventListener("click", askToShowModal);
  });
  header.after(ul);
}

function askToShowModal(event) {
  console.log("we're asking to show modal", event.target.id);
  msg.txt = "Show modal";
  msg.modalId = event.target.id;
  chrome.tabs.query(params, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, msg).then(function(value) {
      console.log("response",value);
    });
  });

}
// (async () => {
//   const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
//   const response = await chrome.tabs.sendMessage(tab.id, msg);
//   // do something with response here, not outside the function
//   console.log(response);
// })();
