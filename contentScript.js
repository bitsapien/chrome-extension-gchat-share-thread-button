

function addShareButton(chatThreadDiv) {
  var threadId = chatThreadDiv.getAttribute("data-local-topic-id")
  console.log(threadId)
  var actualDiv = chatThreadDiv.getElementsByTagName("div")[1]
  console.log(actualDiv)
  var followButtonDiv = actualDiv.childNodes[0]
  console.log(followButtonDiv)
  var followButtonClassName = followButtonDiv.getElementsByTagName("div")[0].getElementsByTagName("span")[2].getElementsByTagName("div")[0].className
  console.log(followButtonClassName)
  var shareButton = document.createElement("div");
  shareButton.className = followButtonClassName
  shareButton.style.right = "100px"
  shareButton.style.top = "12px"
  shareButton.style.position = "absolute"
  shareButton.style.zIndex = "2"
  shareButton.style.cursor = "pointer"

  var shareLink = document.createElement("a")
  var roomURL = window.location.href + "/" + threadId
  shareLink.innerText = "Share"
  shareButton.appendChild(shareLink)

  shareLink.addEventListener("click", function(event) {
    console.log(event)
    const url = event.target.parentNode.getAttribute("data-link")
    console.log(url)
    openModal(url);
  })
  shareButton.setAttribute("data-link", roomURL)
  actualDiv.insertBefore(shareButton, followButtonDiv)
  chatThreadDiv.setAttribute("data-gchat-share-button-created", "true")
}

function openModal(url) {
  var modal = document.createElement("div")
  modal.className = "gchat-share-thread-url-modal"
  modal.id = "gchat-share-thread-url-modal"

  var modalCloseBtn = document.createElement("div")
  modalCloseBtn.className = "gchat-share-thread-url-modal-close-btn"
  modalCloseBtn.innerText = "Close"
  modalCloseBtn.onclick = modalClose


  var textBox = document.createElement("pre")
  textBox.className = "gchat-share-thread-url-modal-text"
  textBox.style.boderRadius = "12px"
  textBox.innerText = url
  modal.appendChild(textBox)
  modal.appendChild(modalCloseBtn)
  document.getElementsByTagName("html")[0].appendChild(modal)

}
function modalClose() {
  var element = document.getElementById("gchat-share-thread-url-modal");
  element.parentNode.removeChild(element);
}

addShareButtons() {
  var list = Array.from(document.getElementsByTagName("c-wiz"));
  var threadList = list.filter(function(elem) { return (elem.hasAttribute("data-local-topic-id") && elem.hasAttribute("data-is-user-topic")) && !elem.hasAttribute("data-gchat-share-button-created")  })

  threadList.forEach(addShareButton)
}

// on load
addShareButtons()
// on scrolll
mainChatDiv = list.filter(function(elem) { return elem.getAttribute("role") == "main"})[0]

