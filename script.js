const blanks = document.querySelectorAll('.blank');
const tiles = document.querySelectorAll('.tile');
const tilesContainer = document.querySelector('.tiles-container');

tiles.forEach(tile => {
    tile.addEventListener('dragstart', dragStart);
});

blanks.forEach(blank => {
    blank.addEventListener('dragover', dragOver);
    blank.addEventListener('dragenter', dragEnter);
    blank.addEventListener('dragleave', dragLeave);
    blank.addEventListener('drop', drop);
});

function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
    e.target.classList.add('hovered');
}

function dragLeave(e) {
    e.target.classList.remove('hovered');
}

function drop(e) {
    e.target.classList.remove('hovered');
    const id = e.dataTransfer.getData('text/plain');
    const draggable = document.getElementById(id);

    if (e.target.classList.contains('blank')) {
        if (e.target.childElementCount > 0) {
            // Move the existing tile back to the tiles container
            const existingTile = e.target.firstElementChild;
            tilesContainer.appendChild(existingTile);
        }
        // Place the dragged tile into the blank
        e.target.appendChild(draggable);
    } else if (e.target.classList.contains('tiles-container')) {
        // Allow the tile to be returned to the pile
        tilesContainer.appendChild(draggable);
    }
}

function shuffleTiles() {
    // Convert NodeList to an array
    const tilesArray = Array.from(tilesContainer.children);

    // Shuffle the array using sort and Math.random
    tilesArray.sort(() => Math.random() - 0.5);

    // Clear the tiles container and append the shuffled tiles
    tilesContainer.innerHTML = '';
    tilesArray.forEach(tile => {
        tilesContainer.appendChild(tile);
    });
}

// Shuffle tiles when the page loads
shuffleTiles();
