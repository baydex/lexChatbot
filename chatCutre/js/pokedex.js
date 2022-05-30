window.onload = init;

var url = "http://localhost:3000/chatbot";
var sessionId = ""

function init() {
    axios.post(url + "/getSession")
    .then(function(res) {
        console.log("session Id:", res.data.message);
        sessionId = res.data.message
    }).catch(function(err) {
        console.log(err);
    })
}

var getElement = (id)=>{
    return document.getElementById(id)
}

chat = getElement("chat")
inputMessage = getElement("inputMessage")
sendButton = getElement("sendButton")

sendButton.addEventListener('click', pressSendButton)
inputMessage.addEventListener('keypress', (event)=>{
    if (event.keyCode === 13) {
        pressSendButton()
    }
})

function pressSendButton(){
    message = inputMessage.value
    inputMessage.value = ""
    chat.textContent += `\n User: ${message}`
    sendMessage(message)
}

function sendMessage(message){
    axios({
        method: 'post',
        url: url + "/message",
        data: {
            sessionId: sessionId,
            message: message,
        }
    }).then(
        (res) => {
            if(res.data.code === 200) {
                console.log(res);
                var response = res.data.message
                chat.textContent += `\n Bot: ${response}`
            }else {
                console.log("ERROR",res);
            }
        }
    ).catch(
        (err) => {
            console.log(err);
        }
    )
}