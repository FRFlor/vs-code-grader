import {app, Menu} from "electron";

app.setName("Visual Studio Grader");
const isDevelopment = process.env.NODE_ENV !== "production";
const isMac = process.platform === "darwin";

const macMenu = [
    {
        label: app.getName(),
        submenu: [
            {role: "about"},
            {type: "separator"},
            {role: "services"},
            {type: "separator"},
            {role: "hide"},
            {role: "hideothers"},
            {role: "unhide"},
            {type: "separator"},
            {role: "quit"},
        ],
    },
    {
        label: "File",
        submenu: [
            {role: "close"},
        ],
    },
    {
        label: "Edit",
        submenu: [
            {role: "undo"},
            {role: "redo"},
            {type: "separator"},
            {role: "cut"},
            {role: "copy"},
            {role: "paste"},
            {role: "pasteAndMatchStyle"},
            {role: "delete"},
            {role: "selectAll"},
            {type: "separator"},
            {
                label: "Speech",
                submenu: [
                    {role: "startspeaking"},
                    {role: "stopspeaking"},
                ],
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
];


const windowsMenu = [
    {
        label: "File",
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
            {role: "close"},
        ],
    },
    {
        label: "Edit",
        submenu: [
            {role: "undo"},
            {role: "redo"},
            {type: "separator"},
            {role: "cut"},
            {role: "copy"},
            {role: "paste"},
            {role: "delete"},
            {type: "separator"},
            {role: "selectAll"},
        ],
    },
    {
        label: "Help",
        submenu: [
            {label: "About VS Grader"},
            {label: "VS Grader Documentation"},
        ],
    },
];

const template = isMac ? macMenu : windowsMenu;

if (isDevelopment) {
    const debugMenu = {
        label: "View",
        submenu: [
            {role: "reload"},
            {role: "forcereload"},
            {role: "toggledevtools"},
            {type: "separator"},
            {role: "resetzoom"},
            {role: "zoomin"},
            {role: "zoomout"},
            {type: "separator"},
            {role: "togglefullscreen"},
        ],
    };
    template.push(debugMenu);
}

// @ts-ignore
const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
