export const loseFocus = () => {
    if (!document.activeElement) {
        return;
    }

    if (document.activeElement.toString() === "[object HTMLButtonElement]") {
        (document.activeElement as HTMLButtonElement).blur();
    }
};

export const focusOn = (id: string) => {
    const element = document.getElementById(id);
    if (!element) {
        return;
    }

    element.focus();
};
