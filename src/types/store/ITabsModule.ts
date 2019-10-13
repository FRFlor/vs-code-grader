export interface ITab {
    codeSelected: string;
    highlightedLines: boolean[];
    fileName: string;
}

export interface ITabsModule {
    tabs: ITab[];
    currentTabIndex: number;
}
