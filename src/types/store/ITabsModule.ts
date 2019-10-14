export interface ITab {
    codeSelected: string;
    highlightedLines: Array<{ start: number, end: number }>;
    comments: IComment[];
    fileName: string;
}

export interface ITabsModule {
    tabs: ITab[];
    currentTabIndex: number;
}

export interface IComment {
    content: string;
    startLine: number;
    endLine: number;
}
