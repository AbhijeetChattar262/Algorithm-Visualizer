export function handleCopyClick(event) {
  const button = event.target;
  const codeBlock = button.closest("pre").querySelector("code");

  if (codeBlock) {
    navigator.clipboard
      .writeText(codeBlock.textContent)
      .then(() => {
        // Change button text temporarily to indicate success
        const originalText = button.textContent;
        button.textContent = "Copied!";
        button.style.backgroundColor = "#28a745";

        // Reset button after 2 seconds
        setTimeout(() => {
          button.textContent = originalText;
          button.style.backgroundColor = "";
        }, 2000);
      })
      .catch((err) => console.error("Failed to copy: ", err));
  }
}

export function addCopyButtonListeners() {
  const copyButtons = document.getElementsByClassName("copy-btn");
  Array.from(copyButtons).forEach((button) => {
    // Remove existing listener to prevent duplicates
    button.removeEventListener("click", handleCopyClick);
    // Add new listener
    button.addEventListener("click", handleCopyClick);
  });

  return () => {
    Array.from(copyButtons).forEach((button) => {
      button.removeEventListener("click", handleCopyClick);
    });
  };
}
