/*
 Constants and Variables
*/
const gridSize = 16;
const drawMode = false;
const rainbowMode = false;

const mouseDown = false;

/*
 HTML Elements
*/
// Grid elements
const gridContainer = document.getElementById("grid-container");
const gridItems = [...document.getElementsByClassName("grid-item")];
// Settings elements
const colorSelected = document.getElementById("color-input");
const drawModeButton = document.getElementById("draw-mode-button");
const rainbowButton = document.getElementById("rainbow-mode-button");
const clearButton = document.getElementById("clear-button");
const gridSizeText = document.getElementById("grid-size-text");
const gridSizeInput = document.getElementById("grid-size-input");

/*
 Functions
*/
// Select a random rgb color
const randomRgbColor = () => {
    return `rgb(${Math.floor(Math.random() * 255)} ${Math.floor(Math.random() * 255)} ${Math.floor(Math.random() * 255)})`;
}

// Utility function to toggle a value (i made this in a function because is more visual)
const toggle = (booleanValue) => {
    return booleanValue = !booleanValue;
}

// Refreshes grid removing current childs and calling createGrid to repopulate
const refreshGrid = () => {
    gridContainer.textContent = '';
    createGrid(size);
}

// Generates a grid with the specified size
const createGrid = async () => {
    size = gridSize ** 2
    let newSizeString = ""

    for (let n = 0; n < Math.sqrt(size); n++) {
        newSizeString += "1fr ";
    }

    gridContainer.style.gridTemplateColumns = newSizeString;
    gridContainer.style.gridTemplateRows = newSizeString;

    // Add items to container
    for (n = 0; n < size; n++) {
        let item = document.createElement("div");
        item.classList.add("grid-item");

        // Add event listener to item
        attachItemListeners(item);

        // Append new element to grid container
        gridContainer.appendChild(item);
    }

}

// Add event listener to the item
const attachItemListeners = (element) => {
    element.addEventListener('mousedown', (e) => { mouseDown = true; e.preventDefault() },);
    element.addEventListener('mouseup', (e) => { mouseDown = false });
    element.addEventListener('mouseover', () => {
        if (mouseDown || !drawMode) {
            let color = rainbowMode ? randomRgbColor() : colorSelected.value;
            element.style.backgroundColor = color
        }
    });
}

/*
  Event listeners
*/
// Settings listeners
drawModeButton.addEventListener('click', (e) => {
    drawMode = toggle(drawMode);

    if (drawMode) {
        drawModeButton.classList.add("button--selected")
    } else {
        drawModeButton.classList.remove("button--selected")
    }
})
rainbowButton.addEventListener('click', () => {
    rainbowMode = toggle(rainbowMode);

    if (rainbowMode) {
        rainbowButton.classList.add("button--selected")
    } else {
        rainbowButton.classList.remove("button--selected")
    }
})
clearButton.addEventListener('click', () => {
    refreshGrid()
})
gridSizeInput.addEventListener('change', () => {
    // Change grid size
    gridSize = gridSizeInput.value;

    // Change grid size text
    gridSizeText.textContent = `${gridSizeInput.value} x ${gridSizeInput.value}`

    // Refresh size
    refreshGrid();
})

window.onload = () => {
    createGrid();
}