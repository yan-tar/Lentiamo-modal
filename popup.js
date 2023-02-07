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
  ul.setAttribute("id", "modalsList");
  modalArr.forEach(element => {
    const li = document.createElement("li");
    elName = element.id !== "" ? "#" + element.id : "<span class='red'>No id</span>."+element.classList;
    elName += "<button>hide</button>";
    li.innerHTML = elName;
    ul.appendChild(li);
    li.setAttribute("id",element.id);
    li.setAttribute("class",element.classList);
    li.querySelector("button").addEventListener("click", askToHideModal);
    li.addEventListener("click", askToShowModal);
  });
  header.after(ul);
}

function askToShowModal(event) {
  document.querySelectorAll("#modalsList li").forEach((el) => {
    el.classList.remove("in");
  });

  msg.txt = "Show modal";
  msg.modalId = event.target.id;
  chrome.tabs.query(params, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, msg).then(function(value) {
      event.target.classList.add("in");
      console.log("response",value);
    });
  });

}

function askToHideModal(event) {
  console.log("hide modal", event.target.parentElement.id);

  msg.txt = "Hide modal";
  msg.modalId = event.target.parentElement.id;
  chrome.tabs.query(params, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, msg).then(function(value) {
      event.target.classList.remove("in");
    });
  });
  event.stopPropagation();
  return false;
}
// (async () => {
//   const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
//   const response = await chrome.tabs.sendMessage(tab.id, msg);
//   // do something with response here, not outside the function
//   console.log(response);
// })();
