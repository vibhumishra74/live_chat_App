let sockets = io();
let textarea = document.getElementById("textarea");
let messagearea = document.querySelector(".message__area");
let names;

do {
  names = prompt("please enter your name: ");
} while (!names);

textarea.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    if (textarea.value != null) {
      sendMessage(e.target.value);
    }
  }
});

function sendMessage(message) {
  let msg = {
    user: names,
    message: message.trim(),
  };

  // Append message

  appendMessage(msg, "outgoing");
  textarea.value = "";
  scrollToBottom();
  //send to server
  sockets.emit("message", msg);
}

function appendMessage(msg, type) {
  let div = document.createElement("div");
  let classname = type;
  div.classList.add("message", classname);

  let markup = `
        <h4> ${msg.user} </h4>
        <p> ${msg.message}</p>
    `;
  div.innerHTML = markup;

  messagearea.appendChild(div);
  scrollToBottom();
}

// receive message

sockets.on("message", (msg) => {
  appendMessage(msg, "incomming");
});

// scroll
function scrollToBottom() {
  messagearea.scrollTop = messagearea.scrollHeight;
}
