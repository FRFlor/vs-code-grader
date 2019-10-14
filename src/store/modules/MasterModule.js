import {scaffoldStore} from "undo-redo-vuex";

const dummyCode = getDummyCode();

const state = {
    hasUnsavedChanges: false,
    isBusy: false,
    students: [],
    tabs: [
        {
            codeSelected: `${dummyCode}\n\n${dummyCode}\n\n${dummyCode}`,
            highlightedLines: initializeHighlightedLines(),
            fileName: "helloWorld.cpp",
        },
    ],
    currentTabIndex: 0,
};

const getters = {
    currentCodeSelected: (state) => {
        return state.tabs[state.currentTabIndex].codeSelected;
    },
    currentHighlightedLines: (state) => {
        return state.tabs[state.currentTabIndex].highlightedLines;
    },
};

const actions = {};

const mutations = {
    changeBusyTo: (state, isBusy) => {
        state.isBusy = isBusy;
    },
    setHasUnsavedChanges: (state, hasUnsavedChanges) => {
        state.hasUnsavedChanges = hasUnsavedChanges;
    },
    addStudent: (state, name) => {
        state.hasUnsavedChanges = true;
        state.students = [...state.students, name];
    },
    deleteStudent: (state, id) => {
        state.hasUnsavedChanges = true;
        state.students.splice(id, 1);
        state.students = [...state.students];
    },
    editStudent: (state, {id, name}) => {
        state.hasUnsavedChanges = true;
        state.students[id] = name;
        state.students = [...state.students];
    },
    addNewTab: (state, {codeSelected, fileName}) => {
        const newTab = {
            codeSelected,
            highlightedLines: initializeHighlightedLines(),
            fileName,
        };
        state.tabs = [...state.tabs, newTab];
    },
    highlightLines: (state, {start, end}) => {
        state.hasUnsavedChanges = true;
        for (let lineIndex = start; lineIndex <= end; lineIndex++) {
            state.tabs[state.currentTabIndex].highlightedLines[lineIndex] =
                !state.tabs[state.currentTabIndex].highlightedLines[lineIndex];
        }

        state.tabs = [...state.tabs];
    },
    emptyState: (state) => {
        state.hasUnsavedChanges = false;
        state.students = [];
        state.isBusy = false;
        state.tabs = [
            {
                codeSelected: `${dummyCode}\n\n${dummyCode}\n\n${dummyCode}`,
                highlightedLines: initializeHighlightedLines(),
                fileName: "helloWorld.cpp",
            },
        ];
        state.currentTabIndex = 0;
    },
};

const masterModule = scaffoldStore({
    state,
    actions,
    getters,
    mutations,
});

export default masterModule;

function initializeHighlightedLines() {
    return Array.from({length: 300}, () => false);
};

function getDummyCode() {
    return `
/*
Name: UTCToLocal()

Description: Converts the Greenwich Time to Local Time

Parameters:
- int UTCTime: UTC time in the format HHMM or HMM (only numbers)
- UTCValue: The corresponding UTC timezone, for example, EST has an UTC value of -5.
Returns:
- time in the Local TimeZone

*/
int UTCtoLocal(int UTCtime, int UTCvalue)
{
\tint hour = 0, minute = 0;

\thour = UTCtime / 100;  // Obtain Hours by removing 2 digits from the right
\tminute = UTCtime - hour * 100;  // Obtain Minutes by removing digits from the left
\t
\tif (hour + UTCvalue >= 24)
\t{
\t\thour -= 24;
\t}
\telse if (hour + UTCvalue < 0)
\t{
\t\thour += 24;
\t}
\thour += UTCvalue;
\treturn hour * 100 + minute;
}`;
};
