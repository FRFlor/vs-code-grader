import {app, Menu} from "electron";

app.setName("Visual Studio Grader");

const menu = Menu.buildFromTemplate([
    {
        label: app.getName(),
        submenu: [
            {
                label: "New",
                accelerator: "CmdOrCtrl+Shift+N",
            },
            {
                label: "Open",
                accelerator: "CmdOrCtrl+O",
            },
            {
                label: "Save",
                accelerator: "CmdOrCtrl+S",
            },
            {
                label: "Save As",
                accelerator: "CmdOrCtrl+Shift+S",
            },
            {type: "separator"},
            {label: "Print"},
            {type: "separator"},
            {
                label: "Exit",
                click() {
                    app.quit();
                },
            },
        ],
    },
    {
        label: "Edit",
        submenu: [
            {
                label: "Undo",
                accelerator: "CmdOrCtrl+Z",
            },
            {
                label: "Redo",
                accelerator: "CmdOrCtrl+Y",
            },
            {
                label: "Cut",
                accelerator: "CmdOrCtrl+X",
            },
            {
                label: "Copy",
                accelerator: "CmdOrCtrl+C",
            },
            {
                label: "Paste",
                accelerator: "CmdOrCtrl+V",
            },
            {type: "separator"},
            {
                label: "Settings",
            },
        ],
    },
    {
        label: "Help",
        submenu: [
            {label: "About VS Grader"},
            {label: "VS Grader Documentation"},
        ],
    },
]);

Menu.setApplicationMenu(menu);
