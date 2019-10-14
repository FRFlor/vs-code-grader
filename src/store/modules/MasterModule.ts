import {scaffoldStore} from "undo-redo-vuex";
import {dummyCode} from "./fakeData";

const state = {
    hasUnsavedChanges: false,
    isBusy: false,
    students: [],
    projectName: "",
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
    setProjectName: (state, name) => {
        state.projectName = name;
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
        state.projectName = "";
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
}
