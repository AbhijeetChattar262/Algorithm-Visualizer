export const swapAnimation = (elementA, elementB) => {
    const leftA = elementA.getBoundingClientRect().left;
    const leftB = elementB.getBoundingClientRect().left;

    // Set positions for animation
    elementA.style.transition = "transform 0.2s ease";
    elementB.style.transition = "transform 0.2s ease";

    // Translate elements to each other's position
    elementA.style.transform = `translateX(${leftB - leftA}px)`;
    elementB.style.transform = `translateX(${leftA - leftB}px)`;

    // After the animation ends, swap heights and reset transform
    setTimeout(() => {
        const tempHeight = elementA.style.height;
        elementA.style.height = elementB.style.height;
        elementB.style.height = tempHeight;

        // Reset transform and transition
        elementA.style.transform = "translateX(0)";
        elementB.style.transform = "translateX(0)";
        elementA.style.transition = "none";
        elementB.style.transition = "none";
    }, 200); // Match this to your transition time
};
