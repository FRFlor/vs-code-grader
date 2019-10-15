import {scaffoldStore} from "undo-redo-vuex";
import {dummyCode} from "./fakeData";
// @ts-ignore
import {CheckState} from "@/components/CheckPill.vue";
import {focusOn} from "@/support";

const state = {
    hasUnsavedChanges: false,
    isPointingPosition: false,
    date: new Date(),
    loadsState: CheckState.None,
    compilesState: CheckState.None,
    runsState: CheckState.None,
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
            comments: [],
            fileName: "helloWorld.sln",
        },
    ],
    editingComment: "",
    currentTabIndex: 0,
};

const getters = {
    currentCodeSelected: (state) => {
        if (state.tabs[state.currentTabIndex] === undefined) {
            return "";
        }

        return state.tabs[state.currentTabIndex].codeSelected;
    },
    currentHighlightedLines: (state) => {
        if (state.tabs[state.currentTabIndex] === undefined) {
            return [];
        }
        return state.tabs[state.currentTabIndex].highlightedLines;
    },
    currentCommentsInView: (state) => {
        if (state.tabs[state.currentTabIndex] === undefined) {
            return [];
        }
        return state.tabs[state.currentTabIndex].comments;
    },
};

const actions = {
    pointToElement: ({commit}, id) => {
        commit("setIsPointingPosition", true);
        focusOn(id);
        setTimeout(() => commit("setIsPointingPosition", false), 1000);
    },
    editComment: async ({commit, state}, commentIndex) => {

        const {start, end, content} = state.tabs[state.currentTabIndex].comments[commentIndex];
        console.log({start, end, content});
        state.tabs[state.currentTabIndex].comments.splice(commentIndex, 1);
        commit("highlightLines", {start, end});
        commit("setEditingComment", content);

        commit("setIsPointingPosition", true);
        focusOn("write-comment");
        await new Promise((resolve) => setTimeout(() => {
            commit("setIsPointingPosition", false);
            return resolve;
        }, 1000));
    },
    saveComment: async ({commit, state}) => {
        const {start, end} = state.tabs[state.currentTabIndex].highlightedLines;
        if (start === -1 || end === -1) {
            return;
        }

        state.tabs[state.currentTabIndex].comments.push({
            start,
            end,
            content: state.editingComment,
        });

        state.tabs[state.currentTabIndex].highlightedLines = {start: -1, end: -1};

        await new Promise((resolve) => setTimeout(() => {
            commit("setEditingComment", "");
            return resolve;
        }, 150));

        commit("setTabs", [...state.tabs]);
    },
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
    setIsPointingPosition: (state, isPointingPosition) => {
        state.isPointingPosition = isPointingPosition;
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
    setTabs: (state, tabs) => {
        state.tabs = tabs;
    },
    addNewTab: (state, {codeSelected, fileName}) => {
        const newTab = {
            codeSelected,
            highlightedLines: {start: -1, end: -1},
            comments: [],
            fileName,
        };
        state.tabs = [...state.tabs, newTab];
    },
    switchToTab: (state, index) => {
        state.currentTabIndex = index;
    },
    addFakeTabs: (state) => {
        const newTab = {
            codeSelected: dummyCode,
            highlightedLines: {start: -1, end: -1},
            comments: [],
            fileName: "anotherFile.sln",
        };
        state.tabs = [...state.tabs, newTab];
    },
    highlightLines: (state, {start, end}) => {
        state.tabs[state.currentTabIndex].highlightedLines = {start, end};
        state.tabs = [...state.tabs];
    },
    setEditingComment: (state, comment) => {
        state.editingComment = comment;
    },
    deleteComment: (state) => {
        state.tabs[state.currentTabIndex].highlightedLines = {start: -1, end: -1};

        state.editingComment = "";
        state.tabs = [...state.tabs];
    },
    setLoadsState: (state, newState) => {
        state.loadsState = newState;
    },
    setCompilesState: (state, newState) => {
        state.compilesState = newState;
    },
    setRunsState: (state, newState) => {
        state.runsState = newState;
    },
    emptyState: (state) => {
        state.hasUnsavedChanges = false;
        state.isPointingPosition = false;
        state.loadsState = CheckState.None;
        state.compilesState = CheckState.None;
        state.runsState = CheckState.None;
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
                comments: [],
                fileName: "helloWorld.cpp",
            },
        ];
        state.editingComment = "";
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
