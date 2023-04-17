const backGround = document.getElementById("backGround")
const button_getUp = document.getElementById("button_getUp")
const goUp = document.getElementById("goUp")
const useButton = document.getElementById("useButton")
const goLeft = document.getElementById("goLeft")
const goRight = document.getElementById("goRight")
const text = document.getElementById("text")
const text_more = document.getElementById("text_more")
var text_size = 1
var point = 0
var rotate = 1
var start = false
var key = false

var sound_room = new Audio("../../sounds/room.mp3")
sound_room.loop = true;
sound_room.play();

text_more.addEventListener(`click`, ()=>{
    if (text_size > 0) {
        text_size-=1
    }else{
        text_more.style.display = "none"
        button_getUp.style.display = "block"
    }
})
button_getUp.addEventListener(`click`, ()=>{
    button_getUp.style.display = "none"
    setTimeout(() => {
    start = true
    backGround.src = "./level0-11.png"
    goUp.style.display = 'block'
    goLeft.style.display = 'block'
    goRight.style.display = "block"
    point+=1
    }, 200);
})

goLeft.addEventListener(`click`, ()=>{
    if (rotate < 5) {
        rotate += 1
    }
})

goRight.addEventListener(`click`, ()=>{
    if (rotate > 0) {
        rotate -= 1
    }
})

goUp.addEventListener(`click`, ()=>{
    if (point == 1&&rotate == 1) {
        point = 4
    }
    if (point == 1&&rotate == 2) {
        point += 1
    }
    if (point == 2&&rotate == 4) {
        point -= 1
    }
    if (point == 2&&rotate == 3) {
        point += 1
    }
    if (point == 3&&rotate == 1) {
        point -= 1
    }
    if (point == 4&&rotate == 3) {
        point = 1
    }
    if (point == 4&&rotate == 4) {
        point += 1
    }
    if (point == 5&&rotate == 2) {
        point -= 1
    }
    if (point == 5&&rotate == 3) {
        point += 1
    }
    if (point == 6&&rotate == 1) {
        point -= 1
    }
    if (point == 7&&rotate == 3) {
        window.location.href = "../level1/level1.html"
    }
})

useButton.addEventListener(`click`, ()=>{
    if (point == 3&&rotate == 3&&!key) {
        key = !key
        goUp.style.display = "none"
    }
    if (point == 6&&rotate == 3&&key) {
        point += 1
    }
})

setInterval(() => {
    if(rotate > 4) {
        rotate = 1
    }
    if(rotate <= 0) {
        rotate = 4
    }
    if (point == 1&&rotate > 0&&rotate < 3) {
        goUp.style.display = "block"
        goUp.src = "./Up.png"
    }else if (point == 2&&rotate > 2&&rotate < 5) {
        goUp.style.display = "block"
        goUp.src = "./Up.png"
    }else if (point == 3&&rotate == 1) {
        goUp.style.display = "block"
        goUp.src = "./Up.png"
    }else if (point == 4&&rotate > 2&&rotate < 5) {
        goUp.style.display = "block"
        goUp.src = "./Up.png"
    }else if (point == 5&&rotate > 1&&rotate < 4) {
        goUp.style.display = "block"
        goUp.src = "./Up.png"
    }else if (point == 6&&rotate == 1) {
        goUp.style.display = "block"
        goUp.src = "./Up.png"
    }else if (point == 7&&rotate == 3) {
        goUp.style.display = "block"
        goUp.src = "./Up.png"
    }else{
        goUp.style.display = "none"
    }
    if (point == 6&&rotate == 3&&!key) {
        useButton.style.display = "block"
        useButton.src = "./Up_lock.png"
    }else if (point == 6&&rotate == 3&&key) {
        useButton.style.display = "block"
    }else if (point == 3&&rotate == 3&&!key) {
        useButton.style.display = "block"
        useButton.src = "./Use.png"
    }else{
        useButton.style.display = "none"
        useButton.src = "./Up.png"
    }
    if (start) {
        backGround.src = `./level0-${point}${rotate}.png`
    }
    if (point==3&&rotate==3&&!key) {
        backGround.src = `./level0-${point}${rotate}.png`
    }else if (point==3&&rotate==3&&key) {
        backGround.src = `./level0-${point}_on_key.png`
    }
    
    
}, 300);