# extension-chat
A simple extension that demonstrates how to send chat messages to a channel. See the relevant [API endpoint](https://dev.twitch.tv/docs/extensions/reference/#send-extension-chat-message) for more information. 

## What's in the sample
The component/panel extension allows a broadcaster to start and stop an arbitrary giveaway. For simplicity's sake, each individual "prize" is the Twitch user ID of that viewer. Each time a new giveaway is started, a chat message is sent to alert the viewers and direct them to claim their prize in the extension. This is especially useful when the extension is used as a component that exists in a minimized state.       

## Requirements
- A [Twitch Extension](https://dev.twitch.tv/console/extensions)
- (Optional) An HTTP server to host the front-end code. For example, you can install [http-server](https://www.npmjs.com/package/http-server) via NPM.
 

## Installation 
1. Create a new [extension](https://dev.twitch.tv/console/extensions/create). This sample supports `Panel` and `Video - Component` anchor types as well as a `Mobile` view.   
2. If you are testing locally, update the extension's `Testing Base URI` (see https://dev.twitch.tv/console/extensions/CLIENT_ID/0.0.1/asset-hosting) to `http://localhost:8080/` to avoid having to serve assets over HTTPS in development. 
3. If you would like to run the extension with the assets hosted by Twitch, you can upload a .zip of the project on the Extension Console under `Files`.
4. Update the extension's paths to `extension.html`. The Config Path should also be updated to `config.html`, and the Live Config Path should be updated to `live_config.html`.
5. Install and configure the extension on your channel (see https://dev.twitch.tv/console/extensions/CLIENT_ID/0.0.1/status) by clicking on the `View on Twitch and Install` button.

## Usage

1. Host the frontend files either locally, or upload the assets and move to [Hosted Test](https://dev.twitch.tv/docs/extensions/life-cycle/). If you're using `http-server` you need to run `http-server` from the the `src` directory to host the assets.
2. If the extension is a component, start streaming on your channel. 
3. In Local Test, browsers such as Chrome will not load mixed HTTP and HTTPS content. As such, you need to manually allow the execution of the extension. To do so, click the shield icon in the browser URL bar and then `Load Unsafe Scripts`.  
![Chrome Shield Logo](shield.png)
4. You can then start and stop giveaways from the extension's live configuration window found in the broadcaster's [live dashboard](https://www.twitch.tv/dashboard/live). 