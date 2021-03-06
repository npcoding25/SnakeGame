import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection, onSnake } from './snake.js'
import { update as updateFood, draw as drawFood, score, block } from './food.js'
import { outsideGrid } from './grid.js'


let lastRenderTime = 0
export let gameOver = false
const gameBoard = document.getElementById('game-board')

function main(currentTime) {
    if (gameOver) {
        if (confirm(`You're score is ${score}. Get better son.`)) {
            window.location = '/SnakeGame/'
        }
        return
    }
    window.requestAnimationFrame(main)
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return
    
    console.log(secondsSinceLastRender)
    lastRenderTime = currentTime
    
    update()
    draw()
} 

window.requestAnimationFrame(main)

function update() {
    updateSnake()
    updateFood()
    checkDeath()
}

function draw() {
    gameBoard.innerHTML = ""
    drawSnake(gameBoard)
    drawFood(gameBoard)
}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection() || onSnake(block)
}