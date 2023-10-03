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
  // Create a new tab and assign it to myTab variable
  myTab = await ext.tabs.create({
    icon: "icons/icon-1024.png",
    text: `TLDraw #`,
    muted: true,
    mutable: false,
    closable: true,
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
