export const dummyCode = getDummyCode();

export const initialState = {
    hasUnsavedChanges: false,
    isBusy: false,
    projectName: "",
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

function initializeHighlightedLines() {
    return Array.from({length: 300}, () => false);
};
