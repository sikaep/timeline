const blanks = document.querySelectorAll('.blank');
const tiles = document.querySelectorAll('.tile');

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

    if (e.target.classList.contains('blank') && e.target.childElementCount === 0) {
        e.target.appendChild(draggable);
    }
}
