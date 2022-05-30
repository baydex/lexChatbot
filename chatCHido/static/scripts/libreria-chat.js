const url = "http://localhost:3000/chatbot"; //ruta de la api


// Collapsible
var coll = document.getElementsByClassName("collapsible");

for (let i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        this.classList.toggle("active");

        var content = this.nextElementSibling;

        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }

    });
}

function getTime() {
    let today = new Date();
    hours = today.getHours();
    minutes = today.getMinutes();

    if (hours < 10) {
        hours = "0" + hours;
    }

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    let time = hours + ":" + minutes;
    return time;
}

// Gets the first message
function firstBotMessage() {
    // let firstMessage = ""
    // document.getElementById("botStarterMessage").innerHTML = '<p class="botText"><span>' + firstMessage + '</span></p>';

    let time = getTime();

    $("#chat-timestamp").append(time);
    document.getElementById("userInput").scrollIntoView(false);
}

function clearChat(){
    let chatbox = document.getElementById("chatbox")
    chatbox.innerHTML = '<h5 id="chat-timestamp"></h5>'

    let time = getTime();
    $("#chat-timestamp").append(time);
    document.getElementById("userInput").scrollIntoView(false);
}


firstBotMessage();

// Retrieves the response
function getHardResponse(userText) {
    getBotResponse(userText);
    
}

//Gets the text text from the input box and processes it
function getResponse() {
    let userText = $("#textInput").val();

    if (userText == "") {
        userText = "Mensaje enviado";
    }

    let userHtml = '<p class="userText"><span>' + userText + '</span></p>';

    $("#textInput").val("");
    $("#chatbox").append(userHtml);
    document.getElementById("chat-bar-bottom").scrollIntoView(true);

    setTimeout(() => {
        getHardResponse(userText);
    }, 1000)

}

// Handles sending text via button clicks
function buttonSendText(sampleText) {
    let userHtml = '<p class="userText"><span>' + sampleText + '</span></p>';

    $("#textInput").val("");
    $("#chatbox").append(userHtml);
    document.getElementById("chat-bar-bottom").scrollIntoView(true);

    //Uncomment this if you want the bot to respond to this buttonSendText event
    // setTimeout(() => {
    //     getHardResponse(sampleText);
    // }, 1000)
}

function sendButton() {
    getResponse();
}

function heartButton() {
    buttonSendText("Heart clicked!")
}

// Press enter to send a message
$("#textInput").keypress(function (e) {
    if (e.which == 13) {
        getResponse();
    }
});




var sessionId = null

function getBotResponse(message) {
    axios({
        method: 'post',
        url: url + "/message",
        data: {
            sessionId: sessionId,
            message: message,
        }
    }).then(
        (res) => {
            var response = res.data.message
            if(res.data.code === 200) {
                let botHtml = '<p class="botText"><span>' + response + '</span></p>';
                $("#chatbox").append(botHtml);
                document.getElementById("chat-bar-bottom").scrollIntoView(true);
            }else {
                console.log(res)
            }
        }
    ).catch(
        () => {
            console.log("ya valio esto")
        }
    )
}


function getSessionId() {
    axios.post(url + "/getSession")
    .then(function(res) {
        console.log("session Id:", res.data.message);
        sessionId = res.data.message
    }).catch(function(err) {
        console.log(err);
    })
}




function collapse(){
    if(sessionId == null){
        getSessionId();
        waitSessionId();
    }
    else{
        sessionId = null
        clearChat()
    }
}
function waitSessionId(){
    setTimeout(
        ()=>{
            if(sessionId != null){
                getBotResponse("inicio")
            }
            else{
                waitSessionId()
            }
        }
    ,200
    );
}