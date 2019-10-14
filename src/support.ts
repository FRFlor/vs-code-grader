export const loseFocus = () => {
    if (!document.activeElement) {
        return;
    }

    if (document.activeElement.toString() === "[object HTMLButtonElement]") {
        (document.activeElement as HTMLButtonElement).blur();
    }
};
