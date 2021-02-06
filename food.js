import { onSnake, expandSnake, SNAKE_SPEED, speedUpSnake, slowDownSnake } from './snake.js'
import { randomGridPosition } from './grid.js'

let food = getRandomFoodPosition()
let speedFood = getRandomFoodPosition()
let timer = 3
export let score = 0
const EXPANSION_RATE = 5

export function update() {
    if (onSnake(food)) {
        expandSnake(EXPANSION_RATE)
        score = (score + 5)
        food = getRandomFoodPosition()
    }

    if (onSnake(speedFood)) {
        let timeInterval = setTimeout(slowDownSnake, 3000)
        
        speedUpSnake()
        speedFood = getRandomFoodPosition()
        score = (score + 2)
       
        console.log(timeInterval)
    }
}

export function draw(gameBoard) {
    const foodElement = document.createElement('div')
    foodElement.style.gridRowStart = food.y
    foodElement.style.gridColumnStart = food.x
    foodElement.classList.add('food')
    gameBoard.appendChild(foodElement)

    const speedElement = document.createElement('div')
    speedElement.style.gridRowStart = speedFood.y
    speedElement.style.gridColumnStart = speedFood.x
    speedElement.classList.add('food-speed')
    gameBoard.appendChild(speedElement)

    console.log('draw food')
}

function getRandomFoodPosition() {
    let newFoodPosition

    while (newFoodPosition == null || onSnake(newFoodPosition)) {
        newFoodPosition = randomGridPosition()
    }
    return newFoodPosition
}