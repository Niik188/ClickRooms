//code by Niik18!

//Данные|Info
const SPEED_OPACITY_COUNT = 700
const step_button = document.getElementById("step_button")
const count = document.getElementById("count")
const infoCount = document.getElementById("infoCount")
const health_score = document.getElementById("health_score")
const mini_game = document.getElementById("id_mini-game")
const exit_mini_game = document.getElementById("exit_mini_game")
const med = document.getElementById("med")
const anti_med = document.getElementById("anti-med")
const monster = document.getElementById("monster")
const monster_game = document.getElementById("id_monster-game")
const inventory_class = document.querySelectorAll("inventory_class")
const slot1_id = document.getElementById("slot1_id")
const slot2_id = document.getElementById("slot2_id")
const slot3_id = document.getElementById("slot3_id")
const slot1_size = document.getElementById("slot1_size")
const slot2_size = document.getElementById("slot2_size")
const slot3_size = document.getElementById("slot3_size")
const subtitle = document.getElementById("subtitle")
const boss = document.getElementById("boss_id")
const count_boss = document.getElementById("count_boss")
var slot1 = 0
var slot2 = 0
var slot3 = 0
var score_player = 0
var animate_bg = 100
var health = 100
var eventZone = false
var score_boss = 0
var events = false
var visibleMonster = false
var healthMonster = getRandomInt(2, 15)

//sounds|звуки
var sound_musicBackground = new Audio('../../sounds/background.mp3')
var sound_click= new Audio('../../sounds/click.mp3')
var sound_damage_monster= new Audio('../../sounds/damage_monster.mp3')
var sound_death_monster = new Audio('../../sounds/monster_death.mp3')
var sound_med = new Audio('../../sounds/medshot4.mp3')
var sound_anti_med= new Audio('../../sounds/wpn_select.mp3')
var sound_musicScreemer = new Audio('../../sounds/24c17d23d9a9f23.mp3')
var sound_select_item = new Audio('../../sounds/select_items.mp3')
sound_musicBackground.loop = true;
sound_musicBackground.play();


monster.style.left = `${getRandomInt(0, 100)}%`
monster.style.top = `${getRandomInt(0, 100)}%`
//Random effect after click|Случайный эффект после клика
function effects(number) {
    if (number < 5 && number > 3&& score_player > 1) {
        score_player-=1
        infoCount.innerHTML = "-1"
        count.style.color = 'red'
    }else if (visibleMonster) {
        health-=getRandomInt(10, 30)
        infoCount.color = 'red'
        infoCount.innerHTML = `-${100-health}`
        count.style.color = 'red'
        count.style.fontSize = '100px'
        monster.style.opacity = '0'
        monster.style.display = 'none'
        monster_game.style.filter = 'brightness(0%)'
        health_score.textContent = String(health)
        visibleMonster = false
    }else if (number == 9&&health!=0&&!eventZone) {
        monster_game.style.filter = 'brightness(80%)'
        visibleMonster = true
        monster.style.opacity = '100'
        monster.style.display = 'block'
        monster.style.width = `${healthMonster*10}px`
        monster.style.height = `${healthMonster*10}px`
    }else if (number == 1&&health!=0&&!eventZone) {
        health-=getRandomInt(1, 2)
        infoCount.color = 'red'
        count.style.color = 'red'
        count.style.fontSize = '100px'
        infoCount.innerHTML = `-${100-health}`
        health_score.textContent = String(health)
    }else if(number >= 8 && number <= 10){
        infoCount.style.color = 'green'
        count.style.color = 'green'
        infoCount.innerHTML = "+1"
        score_player+=1
    }else{
        infoCount.style.color = 'rgba(0, 0, 0, 0.600)'
        count.style.color = 'rgba(0, 0, 0, 0.600)'
        infoCount.innerHTML = "+0.5"
        score_player+=0.5
    }
    if (score_player >= 50) {
        document.body.style.backgroundImage = 'url("./level1-2.png")'
        boss.style.display = 'block'
        eventZone = true
    }
}

//Click monster|Нажатие на монстра
monster.addEventListener('click', ()=>{
    if (healthMonster <= 1) {
        visibleMonster = false
        monster.style.opacity = '0'
        monster.style.display = 'none'
        monster_game.style.filter = 'brightness(0%)'
        sound_death_monster.play()
        healthMonster = getRandomInt(2, 15)
        slot1 += getRandomInt(0, 2)
        slot2 += getRandomInt(0, 3)
        subtitle.innerText = "Монстр убит"
        monster.style.transition = '1300ms'
        slot1_size.textContent = String(slot1)
        slot2_size.textContent = String(slot2)
    }else{
        monster.style.left = `${getRandomInt(0, 100)}%`
        monster.style.top = `${getRandomInt(0, 100)}%`
        sound_damage_monster.pause();
        healthMonster--
        sound_damage_monster.play();
        monster.style.width = `${healthMonster*10}px`
        monster.style.height = `${healthMonster*10}px`
        monster.style.transition = `${healthMonster*getRandomInt(60, 130)}ms`
    }
})

function game_over() {
    window.location.href='./game_over.html'
}

//Рандомизатор|Randomizator
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

//Нажатие кнопки "Ход(+1)"|Click button "Step(+1)"
step_button.addEventListener('click', ()=>{
    sound_click.play();
    count.style.opacity = 100
    step_button.style.backgroundColor = 'rgb(135, 135, 135);'
    infoCount.style.opacity = 100     
    var zoom = setInterval(() => {
        animate_bg+=20
        document.body.style.backgroundSize = `${animate_bg}%`
    }, 15);
    effects(getRandomInt(0, 10))
    count.innerHTML = String(score_player)
    step_button.disabled = true
    setTimeout(() => {
        if (!eventZone) {
            count.style.opacity = 0;
            infoCount.style.opacity = 0;
        }
        document.body.style.backgroundSize = "cover";
        animate_bg = 100
        clearInterval(zoom);
        count.style.fontSize = '50px'
        step_button.disabled = false
    }, SPEED_OPACITY_COUNT);
})

//Нажатие на первый слот|Click first slot 
slot1_id.addEventListener('click', () =>{
    if (health < 100&&slot1 > 0) {
        sound_select_item.play()
        slot1--
        slot1_size.textContent = String(slot1)
        mini_game.style.display = 'block'
        mini_game.style.opacity = '100' 
        monster_game.style.opacity = '0' 
        monster_game.style.display = 'none'
    }else if (slot1 == 0) {
        subtitle.innerText = "У вас нет этого предмета"
    }else if (health >= 100) {
        subtitle.innerText = "У вас максимальное здоровье"
    }
})

slot1_id.addEventListener('mouseenter', () =>{
    subtitle.innerText = "Аптечка"
})

exit_mini_game.addEventListener('click', () =>{
    if (health >= 100) {
        health = 100
        health_score.textContent = String(health)
        mini_game.style.opacity = '0' 
        mini_game.style.display = 'none'
        monster_game.style.opacity = '100' 
        monster_game.style.display = 'block'
    }
})

//Moving med and anti-med|Движение аптечки и анти-аптечки
setInterval(() => {
            med.style.left = `${getRandomInt(0, 100)}%`
            med.style.top = `${getRandomInt(20, 100)}%`
            anti_med.style.left = `${getRandomInt(0, 100)}%`
            anti_med.style.top = `${getRandomInt(20, 100)}%`
            if (health > 100) {
                health = 100
                health_score.textContent = String(health)
            }
}, 800);

//Click med|Нажатие на аптечку
med.addEventListener('click',()=>{
    health+=10
    health_score.textContent = String(health)
    sound_med.play()
})

//Click anti-med|Нажатие на анти-аптечку
anti_med.addEventListener('click',()=>{
    health-=10
    health_score.textContent = String(health)
    sound_anti_med.play()
})

//Нажатие на второй слот|Click second slot 
slot2_id.addEventListener('click', () =>{
    if (slot2 > 0) {
        sound_select_item.play()
        slot2--
        score_player+=10
        count.style.opacity = 100
        count.style.color = 'purple'
        infoCount.style.opacity = 100
        count.innerHTML = String(score_player)
        slot2_size.textContent = String(slot2)
    }else{
        subtitle.innerText = "У вас нет этого предмета"
    }
    if (score_player >= 50) {
        document.body.style.backgroundImage = 'url("./level1-2.png")'
        boss.style.display = 'block'
        eventZone = true
    }
})

slot2_id.addEventListener('mouseenter', () =>{
    subtitle.innerText = "+10 очков"
})

slot3_id.addEventListener('mouseenter', () =>{
    subtitle.innerText = "OMG! SAUL GOODMAN!"
})

setInterval(() => {
    if (score_boss >= score_player&&eventZone) {
        health-=1000000
        infoCount.color = 'red'
        count.style.color = 'red'
        count.style.fontSize = '100px'
        infoCount.innerHTML = `-${100-health}`
        health_score.textContent = String(health)
    }
    if(health <= 0){
        game_over()
    }
    if (slot1 > 0) {
        slot1_id.style.display = "block"
    }else{
        slot1_id.style.display = "none"
    }
    if (slot2 > 0) {
        slot2_id.style.display = "block"
    }else{
        slot2_id.style.display = "none"
    }
}, 1);

setInterval(() => {
    if (eventZone) {
        score_boss += 1
        count_boss.textContent = String(score_boss)
    }
    if (subtitle.innerText != "") {
        subtitle.innerText = ""
    }
}, 1000);