"use strict";
import "./background/menu";
import {app, BrowserWindow, dialog, ipcMain, IpcMainEvent, protocol, shell} from "electron";
import {createProtocol, installVueDevtools} from "vue-cli-plugin-electron-builder/lib";

const isDevelopment = process.env.NODE_ENV !== "production";

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win: BrowserWindow | null;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{scheme: "app", privileges: {secure: true, standard: true}}]);
const sendEvent = (channel: string, ...args: any[]) => {
    if (win === null) {
        return;
    }
    win.webContents.send(channel, args);
};

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 1350,
        height: 800,
        minWidth: 1350,
        minHeight: 800,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    const webContents = win.webContents;
    webContents.on("did-finish-load", () => {
        webContents.setZoomFactor(1);
        webContents.setVisualZoomLevelLimits(1, 1);
        webContents.setLayoutZoomLevelLimits(0, 0);
        sendEvent("zoom-removed");
    });

    if (process.env.WEBPACK_DEV_SERVER_URL) {
        // Load the url of the dev server if in development mode
        win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string);
        if (!process.env.IS_TEST) {
            win.webContents.openDevTools();
        }
    } else {
        createProtocol("app");
        // Load the index.html when not in development
        win.loadURL("app://./index.html");
    }

    win.on("closed", () => {
        win = null;
    });
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow();
    }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
    if (isDevelopment && !process.env.IS_TEST) {
        // Install Vue Devtools
        // Devtools extensions are broken in Electron 6.0.0 and greater
        // See https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/378 for more info
        // Electron will not launch with Devtools extensions installed on Windows 10 with dark mode
        // If you are not using Windows 10 dark mode, you may uncomment these lines
        // In addition, if the linked issue is closed, you can upgrade electron and uncomment these lines
        try {
            await installVueDevtools();
        } catch (e) {
            console.error("Vue Devtools failed to install:", e.toString());
        }

    }
    createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
    if (process.platform === "win32") {
        process.on("message", (data) => {
            if (data === "graceful-exit") {
                app.quit();
            }
        });
    } else {
        process.on("SIGTERM", () => {
            app.quit();
        });
    }
}

const fileFilterVsGrade = {name: "VS Grader Document", extensions: ["vsgrade"]};
const fileFilterSolution = {name: "Visual Studio Solution", extensions: ["sln"]};

ipcMain.on("open-solution-file", async (event: IpcMainEvent) => {
    const filePaths: string[] | undefined = dialog.showOpenDialogSync({
        filters: [fileFilterSolution],
        properties: ["openFile", "openDirectory", "multiSelections"],
    });
    if (filePaths === undefined) {
        event.sender.send("solutions-loaded", "");
        return;
    }
    event.sender.send("solutions-loaded", filePaths[0]);
});

ipcMain.on("open-vsgrade-file", async (event: IpcMainEvent) => {
    const filePaths: string[] | undefined = dialog.showOpenDialogSync({
        filters: [fileFilterVsGrade],
        properties: ["openFile"],
    });
    if (filePaths === undefined) {
        event.sender.send("file-loaded", "");
        return;
    }
    event.sender.send("file-loaded", filePaths[0]);
});

ipcMain.on("save-file", async (event: IpcMainEvent) => {
    dialog.showSaveDialogSync({filters: [fileFilterVsGrade]});
    event.sender.send("file-saved");
});

ipcMain.on("open-google", () => {
    shell.openExternal("https://www.google.com?q=the+code+that+was+selected+here");
});
