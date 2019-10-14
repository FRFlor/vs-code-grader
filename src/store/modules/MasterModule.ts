import {scaffoldStore} from "undo-redo-vuex";
import {dummyCode} from "./fakeData";

const state = {
    hasUnsavedChanges: false,
    date: new Date(),
    projectComment: "",
    coveragePercent: null,
    commentAnalysisProgress: null,
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

const actions = {
    analyzeCoverage: ({commit, state}) => {
        const getRandomInt = (min, max) => {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        };
        let progress = 3;
        commit("setCommentAnalysisProgress", progress);
        setTimeout(() => {
            progress = 10;
            commit("setCommentAnalysisProgress", progress);
        }, 500);

        setTimeout(() => {
            progress = 35;
            commit("setCommentAnalysisProgress", progress);
        }, 1000);

        setTimeout(() => {
            progress = 75;
            commit("setCommentAnalysisProgress", progress);
        }, 1500);

        setTimeout(() => {
            progress = 95;
            commit("setCommentAnalysisProgress", progress);
        }, 1850);

        setTimeout(() => {
            commit("setCoveragePercent", getRandomInt(30, 100));
            if (state.students.length === 0) {
                commit("addStudent", "Jamie Hyneman - 7002340");
                commit("addStudent", "Adam Savage - 7002341");
            }

            if (state.projectName === "") {
                commit("setProjectName", "Assignment A2 - Data Structures");
            }

            commit("setCommentAnalysisProgress", null);

        }, 2000);
    },
};

const mutations = {
    changeBusyTo: (state, isBusy) => {
        state.isBusy = isBusy;
    },
    setDate: (state, date) => {
        state.hasUnsavedChanges = true;
        state.date = date;
    },
    setCoveragePercent: (state, amount) => {
        state.hasUnsavedChanges = true;
        state.coveragePercent = amount;
    },
    setCommentAnalysisProgress: (state, progress) => {
        state.commentAnalysisProgress = progress;
    },
    setProjectComment: (state, comment) => {
        state.hasUnsavedChanges = true;
        state.projectComment = comment;
    },
    setHasUnsavedChanges: (state, hasUnsavedChanges) => {
        state.hasUnsavedChanges = hasUnsavedChanges;
    },
    setProjectName: (state, name) => {
        state.hasUnsavedChanges = true;
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
        state.date = new Date();
        state.projectName = "";
        state.projectComment = "";
        state.coveragePercent = null;
        state.commentAnalysisProgress = null;
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
