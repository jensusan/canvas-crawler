const canvas = document.querySelector('#canvas');

const movementDisplay= document.querySelector('#movement');

const ctx = canvas.getContext('2d');

canvas.setAttribute('height', getComputedStyle(canvas)['height'])
canvas.setAttribute('width', getComputedStyle(canvas)['width'])

// ctx.fillStyle ='white'
// ctx.strokeStyle = 'red'
// ctx.lineWidth = 5
// ctx.fillRect(10, 10, 100, 100)
// ctx.strokeRect(20, 20, 100, 100)

const gameLoopInterval = setInterval(gameLoop, 60)

//classes
class Crawler {
    constructor(x, y, color, width, height) {
        this.x = x
        this.y = y
        this.color = color
        this.width = width
        this.height = height
        this.alive = true
    }

    render() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width,  this.height)
    }
}

//test crawler
// const testCrawler = new Crawler(100, 100, 'orange', 40, 40)
// testCrawler.render()

const hero = new Crawler(5, 5, 'hotpink', 30, 30)
const ranX = Math.floor(Math.random() * canvas.width)
const ranY = Math.floor(Math.random() * canvas.height)
const ogre = new Crawler(ranX, ranY, 'green', 75, 105)

// ogre.render()
// hero.render()

function drawBox(x, y, w, h, color) {
    ctx.fillStyle = color
    ctx.fillRect(x, y, w, h)
}

function movementHandler(e) {
    const speed = 10
    switch(e.key) {
        case('w'):
        hero.y = hero.y - speed
        break
        case('s'):
        hero.y = hero.y + speed
        break
        case('d'):
        hero.x = hero.x + speed
        break
        case('a'):
        hero.x = hero.x - speed
        break
    }
}

function detectHit() {
    const ogreLeft = hero.x + hero.width >= ogre.x
    const ogreRight = hero.x <= ogre.x + ogre.width
    const ogreTop = hero.y + hero.height >= ogre.y
    const ogreBottom = hero.y <= ogre.y + ogre.height

    if (hero.x + hero.width >= ogre.x &&
        hero.x <= ogre.x + ogre.width &&
        hero.y + hero.height >= ogre.y &&
        hero.y <= ogre.y + ogre.height
        ) {
            ogre.alive = false
            movementDisplay.innerText = 'You killed the ogre! Who\'s the monster now?'
        }

}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    detectHit()
    if(ogre.alive) {
        ogre.render()
    }
    hero.render()
}



//Event Listener
document.addEventListener('keydown', movementHandler)
canvas.addEventListener('click', e => {
    // const red = Math.floor(Math.random() * 256)
    // const blue = Math.floor(Math.random() * 256)
    // const green = Math.floor(Math.random() * 256)
    // const rgb = `rgb(${red}, ${green}, ${blue})`
    // drawBox(e.offsetX, e.offsetY, 30, 30, rgb)
    // ctx.clearRect(0, 0, canvas.width, canvas.height)
    // hero.x = e.offsetX
    // hero.y = e.offsetY
    // hero.render()
})

