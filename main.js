let duration = 1000;
let blocksContainer = document.querySelector(".game-block-container");
let blocks = Array.from(blocksContainer.children);
let allFlippedBlocks;

function startTheGame() {
    document.querySelector(".game-control span").onclick = function() {
        let userName = prompt("Type Your Name ?");
        document.querySelector(".game-info .name span").innerHTML = (userName === "" || userName === null)?"Unknown" : userName;
        this.parentElement.remove();
    }
}
function reorderTheBlocks() {
    let orderRange = Array.from(Array(blocks.length).keys());
    shuffleArray(orderRange);

    blocks.forEach((block,index) => {
        block.style.order = orderRange[index];

        block.addEventListener("click",() => {
            clickOnBlock(block);
        })
    })
}
function shuffleArray(array) {
    let current = blocks.length,
        temp,
        random;

    while(current > 0) {
        random = Math.floor(Math.random() * current);
        current--;
        temp = array[current];
        array[current] = array[random];
        array[random] = temp;
    }    
    return array;
}
function clickOnBlock(clickedBlock) {
    clickedBlock.classList.add("flipped");

    allFlippedBlocks = blocks.filter(block => block.classList.contains("flipped"));

    if(allFlippedBlocks.length === 2)
    {
        stopClicking();
        checkOnFlippedBlocks();
    }
}
function checkOnFlippedBlocks() {
    let tries = document.querySelector(".tries span");
    if(allFlippedBlocks[0].dataset.tech === allFlippedBlocks[1].dataset.tech)
    {
        addOrRemoveClassName("flipped");
        addOrRemoveClassName("checked");
        document.getElementById("success").play();
    }
    else 
    {
        setTimeout(() => {
            addOrRemoveClassName("flipped");
            tries.innerHTML = parseInt(tries.innerHTML) + 1;
        },duration);
        document.getElementById("fail").play();
    }
}
function addOrRemoveClassName(className) {
    allFlippedBlocks[0].classList.toggle(className);
    allFlippedBlocks[1].classList.toggle(className);
}
function stopClicking() {
    blocksContainer.classList.add("stop-clicking");
    setTimeout(() => {
        blocksContainer.classList.remove("stop-clicking");
    }, duration);
}
//The start of the game
startTheGame();
reorderTheBlocks();