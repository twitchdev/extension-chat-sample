/**
 *    Copyright 2019 Amazon.com, Inc. or its affiliates
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */

var twitch = window.Twitch ? window.Twitch.ext : null;

(function () {
    var giveawayInProgress = false;
    var token = "";
    var channelId = "";
    var clientid = "";

    // The Twitch JavaScript Helper must be initialized
    if (!twitch) {
        return;
    }

    // Twitch onAuthorized callback
    // The JWT returned here will give us the broadcaster role, which is needed to post to chat
    // Reference: https://dev.twitch.tv/docs/extensions/reference/#onauthorized
    twitch.onAuthorized(function (auth) {
        log("onAuhorized() fired");

        token = auth.token;
        channelId = auth.channelId;
        clientid = auth.clientId

        log("token: " + token + "\nchannelId: " + channelId + "\nclientId: " + clientid);

        // Set up button handler
        document.getElementById("btn").addEventListener("click", btnClick)
    });

    // On button click, toggle the status of the giveaway and send an extension chat message
    btnClick = function () {
        giveawayInProgress = (giveawayInProgress ? false : true);
        
        // Send chat message to notify status of giveaway
        sendToChat();

        // Change UI based on status of giveaway
        document.getElementById("btn").innerHTML = (giveawayInProgress ? "Stop Giveaway!" : "Start Giveaway!")

        // Use PubSub to send status of giveaway
        // Reference: https://dev.twitch.tv/docs/extensions/reference#send
        twitch.send("broadcast", "application/json", giveawayInProgress)
        log("PubSub message sent, giveawayInProgress: " + giveawayInProgress);
    }

    // Prepare the HTML request to send extension chat message
    // Reference: https://dev.twitch.tv/docs/extensions/reference#send-extension-chat-message
    function sendToChat() {
        // Prepare the headers
        var headers = {
            "Client-ID": clientid,
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token // using the JWT from onAuthorized()
        };

        // Send extension chat message
        var url = "https://api.twitch.tv/extensions/" + clientid + "/0.0.1/channels/" + channelId + "/chat"
        log("url: " + url)

        // The message
        var message = (giveawayInProgress ? "A giveaway has begun! Check out the extension for your unique code!" : "The giveaway has ended! Congratulations to all that participated!")
        const body = JSON.stringify({text: message});
        fetch(url, {
            method: "POST",
            headers: headers,
            body: body
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject({ status: res.status, statusText: res.statusText });
                }
            })
            .then(res => log(res))
            .catch(err => log('Error, with message:', err.statusText));
    }
})()