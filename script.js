const hour = document.getElementById('hour')
const minute = document.getElementById('minute')
const second = document.getElementById('second')

setInterval(() => {
    const date = new Date()
    hour.style.transform = `rotate(${date.getHours() * 30 - 90}deg)`
    minute.style.transform = `rotate(${date.getMinutes() * 6 - 90}deg)`
    second.style.transform = `rotate(${date.getSeconds() * 6 - 90}deg)`
}, 1000)

// 花瓣來源 https://github.com/DoggyYao/css-html-demo/tree/main/2.%E6%A8%B1%E8%8A%B1%E9%A3%9E%E8%88%9E
const canvas = document.querySelector('canvas')

canvas.width = window.innerWidth
canvas.height = window.innerHeight


const ctx = canvas.getContext('2d')


const SAKURA_SUM = 60

const sakuraArray = []


class Sakura {

    constructor() {

        this.x = Math.random() * canvas.width
        this.y = (Math.random() * canvas.height * 2) - canvas.height

        this.width = Math.random() * 15 + 25
        this.height = Math.random() * 12 + 20

        this.opacity = this.w / 50

        this.rotate = Math.random()

        this.xSpeed = Math.random() * 2 + 1
        this.ySpeed = Math.random() + 1.5
        this.rotateSpeed = Math.random() * 0.02
    }


    draw() {

        if (this.x > canvas.width || this.y > canvas.height) {
            this.x = -sakuraImg.width;
            this.y = (Math.random() * canvas.height * 2) - canvas.height
            this.rotate = Math.random()
            this.rotateSpeed = Math.random() * 0.02
            this.xSpeed = Math.random() * 2 + 0.5
            this.ySpeed = Math.random() + 1
        }

        ctx.globalAlpha = this.opacity;
        ctx.drawImage(
            sakuraImg,
            this.x,
            this.y,
            this.width * (0.6 + (Math.abs(Math.cos(this.rotate)) / 3)),
            this.height * (0.8 + (Math.abs(Math.sin(this.rotate)) / 5))
        )
    }

    animate() {
        this.x += this.xSpeed + mouseX * 2
        this.y += this.ySpeed + mouseX * 2
        this.rotate += this.rotateSpeed
        this.draw()
    }
}


function render() {

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    sakuraArray.forEach(sakura => sakura.animate())

    window.requestAnimationFrame(render)
}


const sakuraImg = new Image()
sakuraImg.src = './image/sakura.png'

sakuraImg.addEventListener('load', () => {
    for (let i = 0; i < SAKURA_SUM; i++) {
        sakuraArray.push(new Sakura())
    }
    render()
});


window.addEventListener('resize', () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
});

let mouseX = 0;
function touchHandler(e) {
    mouseX = (e.clientX || e.touches[0].clientX) / window.innerWidth
}

window.addEventListener('mousemove', touchHandler)
// window.addEventListener('touchmove', touchHandler)
