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
let createdTl = []; // Array to hold all created tabs
let windowsCount = 0; // Counter for the number of windows created
let foundIndex = -1; // Index of the found tab

ext.runtime.onExtensionClick.addListener(async () => {
  // Find index of a tab that is not created yet
  const foundIndex = createdTl.findIndex((tl) => !tl.isCreated);

  // If no such tab is found, increment windowsCount
  if (foundIndex === -1) {
    windowsCount++;
  }

  // Create a new window and assign it to myWindows variable
  myWindows = await ext.windows.create({
    title: `TLDraw #${foundIndex >= 0 ? foundIndex + 1 : windowsCount}`,
    icon: "icons/icon-1024.png",
    fullscreenable: true,
    vibrancy: false,
    frame: true,
  });
  // Create a new tab and assign it to myTab variable
  myTab = await ext.tabs.create({
    icon: "icons/icon-1024.png",
    text: `TLDraw #${foundIndex >= 0 ? foundIndex + 1 : windowsCount}`,
    muted: true,
    mutable: false,
    closable: true,
  });
  // Create a new websession and assign it to myWebsession variable
  myWebsession = await ext.websessions.create({
    partition: `TLDraw ${foundIndex >= 0 ? foundIndex + 1 : windowsCount}`,
    persistent: true,
    cache: true,
    global: false,
  });

  // Get the size of the window content and create a new webview with that size
  const size = await ext.windows.getContentSize(myWindows.id);

  myWebview = await ext.webviews.create({
    websession: myWebsession,
  });

  // Load URL in the webview and attach it to the window
  await ext.webviews.loadURL(myWebview.id, "https://www.tldraw.com");

  await ext.webviews.attach(myWebview.id, myWindows.id);

  await ext.webviews.setBounds(myWebview.id, {
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
  });

  await ext.webviews.setAutoResize(myWebview.id, { width: true, height: true });

  // Update or push the new tab into createdTl array
  if (foundIndex >= 0) {
    createdTl[foundIndex] = { tabObject: myTab, windowObject: myWindows, webviewObject: myWebview, isCreated: true };
  } else {
    createdTl.push({ tabObject: myTab, windowObject: myWindows, webviewObject: myWebview, isCreated: true });
  }
  foundIndex = -1;
});

// Event listener for tab click. It restores and focuses the clicked tab.
ext.tabs.onClicked.addListener(async (event) => {
  createdTl.forEach(async (props) => {
    if (props.tabObject.id == event.id) {
      await ext.windows.restore(props.windowObject.id);
      await ext.windows.focus(props.windowObject.id);
    }
  });
});

// Event listener for tab close click. It removes the clicked tab and its associated window and webview.
ext.tabs.onClickedClose.addListener(async (event) => {
  createdTl.forEach(async (props, idx) => {
    if (props.tabObject.id == event.id) {
      await ext.tabs.remove(props.tabObject.id);
      await ext.windows.remove(props.windowObject.id);
      await ext.webviews.remove(props.webviewObject.id);
      props.tabObject = null;
      props.windowObject = null;
      props.webviewObject = null;
      props.isCreated = false;
    }
  });
});

// Event listener for window close. It removes the closed window and its associated tab and webview.
ext.windows.onClosed.addListener(async (event) => {
  createdTl.forEach(async (props, idx) => {
    if (props.windowObject.id == event.id) {
      await ext.tabs.remove(props.tabObject.id);
      await ext.webviews.remove(props.webviewObject.id);
      props.tabObject = null;
      props.windowObject = null;
      props.webviewObject = null;
      props.isCreated = false;
    }
  });
});
