// Class definition for CreatedTL
class CreatedTL {
  // Constructor for the CreatedTL class
  constructor(myWindowObj, myTabObj, myWebviewObj, isCreated) {
    // Assigning the passed parameters to the class properties
    this.windowObject = myWindowObj;
    this.tabObject = myTabObj;
    this.webviewObject = myWebviewObj;
    this.isCreated = isCreated;
  }
}

// Variables initialization
let myTab = null; // Variable to hold the tab object
let myWindows = null; // Variable to hold the windows object
let myWebview = null; // Variable to hold the webview object
let myWebsession = null; // Variable to hold the websession object

ext.runtime.onExtensionClick.addListener(async () => {

  // Create a new window and assign it to myWindows variable
  myWindows = await ext.windows.create({
    title: `TLDraw #`,
    icon: "icons/icon-1024.png",
    fullscreenable: true,
    vibrancy: false,
    frame: true,
  });
  // Create a new tab and assign it to myTab variable
  myTab = await ext.tabs.create({
    icon: "icons/icon-1024.png",
    text: `TLDraw #`,
    muted: true,
    mutable: false,
    closable: true,
    });
   // Create a new websession and assign it to myWebsession variable
  myWebsession = await ext.websessions.create({
    partition: `TLDraw `,
    persistent: true,
    cache: true,
    global: false,
  });
  
});

ext.tabs.onClicked.addListener(async () => {
  console.log("Tab is clicked");
});

ext.tabs.onClickedClose.addListener(async () => {
  console.log("Tab was closed");
});

ext.windows.onClosed.addListener(async (event) => {
  console.log("Window is Closed");
});
