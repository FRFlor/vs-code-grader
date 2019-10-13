import {Action, getModule, Module, Mutation, VuexModule} from "vuex-module-decorators";
import store from "@/store";
import {ITab, ITabsModule} from "@/types";

const initializeHighlightedLines = (): boolean[] => {
    return Array.from({length: 300}, () => false);
};

const dummyCode: string = `
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

@Module({dynamic: true, name: "tabs", store})
class TabsModuleCore extends VuexModule implements ITabsModule {
    public tabs: ITab[] = [
        {
            codeSelected: `${dummyCode}\n\n${dummyCode}\n\n${dummyCode}`,
            highlightedLines: initializeHighlightedLines(),
            fileName: "helloWorld.cpp",
        },
    ];
    public currentTabIndex: number = 0;

    public get currentCodeSelected(): string {
        return this.tabs[this.currentTabIndex].codeSelected;
    }

    public get currentHighlightedLines(): boolean[] {
        return this.tabs[this.currentTabIndex].highlightedLines;
    }

    @Action
    public addNewTab(codeSelected: string, fileName: string) {
        const newTab: ITab = {
            codeSelected,
            highlightedLines: initializeHighlightedLines(),
            fileName,
        };

        this.context.commit("SET_TABS", [...this.tabs, newTab]);
    }

    @Action
    public highlightLines({start, end} : {start: number, end: number}) {
        console.log({start}, {end});
        for (let lineIndex = start; lineIndex <= end; lineIndex++) {
            this.tabs[this.currentTabIndex].highlightedLines[lineIndex] =
                !this.tabs[this.currentTabIndex].highlightedLines[lineIndex];
        }
        this.context.commit("SET_TABS", [...this.tabs]);
    }

    @Mutation
    private SET_TABS(newTabs: ITab[]): void {
        this.tabs = newTabs;
    }
}

export const TabsModule = getModule(TabsModuleCore);
