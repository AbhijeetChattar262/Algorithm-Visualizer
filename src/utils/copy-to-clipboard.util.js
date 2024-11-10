export function handleCopyClick(event) {
    const codeBlock = event.target.closest("pre").querySelector("code");
    if (codeBlock) {
        navigator.clipboard.writeText(codeBlock.textContent)
            .then(() => alert("Code copied to clipboard!"))
            .catch((err) => console.error("Failed to copy: ", err));
    }
}

export function addCopyButtonListeners() {
    const copyButtons = document.getElementsByClassName("copy-btn");
    Array.from(copyButtons).forEach((button) => {
        button.addEventListener("click", handleCopyClick);
    });

    return () => {
        Array.from(copyButtons).forEach((button) => {
            button.removeEventListener("click", handleCopyClick);
        });
    };
}
