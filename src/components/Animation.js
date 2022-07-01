import { BoardContext } from "../BoardContext"
import { useContext, useEffect, useRef, useState } from "react"


//setting time for to the knight can run to each elements in boardchess
function pause(ms) {
	return new Promise(resolve => setTimeout(resolve, ms))
}
export default function Animation() {

	//to receive data from premier component  
	const { animationSpeed, board } = useContext(BoardContext)

	//new position will be cteated when the change component
	useEffect(function animateSolution() {
		if (board.length >= 4) {
			const buttons = [...document.querySelectorAll("button")]
			document.querySelectorAll("svg").forEach(svg => svg.remove())
			async function colorizeButtons() {
				for (const [index, move] of board.entries()) {
					const button = buttons.find(function getCurrentButton(b) {
						return b.innerHTML === move.name
					})
					if (button === undefined) {
						return
					}
					// Initialize svg
					const ns = "http://www.w3.org/2000/svg"
					const svg = document.createElementNS(ns, 'svg')
					let pathString = ""
					//getting obj'  position and size 
					const { left, width, top, height } = button.getBoundingClientRect()
					if (index > 0) {
						// using PITAGO'principle for a rectangle'largest length
						//the present position of knight when have clicked and being set again
						const x = left + width / 2
						const y = Math.floor(Math.abs(top - document.querySelector(".board").getBoundingClientRect().top + height / 2))
						console.log("x,y>>>>>>>>>.", x, y)
						const previousButton = buttons.find(b => b.innerHTML === board[index - 1].name)
						if (previousButton === undefined) {
							return
						}
					}


					//set colour where the knight had acrossed on the chessboard sturation, lightness

					const hue = Math.floor(index * (10 / board.length))
					console.log(hue)
					button.classList.add("active")
					if (index > 0 && index < board.length - 1) {
						button.style.backgroundColor = `hsl(${hue}, 50%, 80%)`
						button.style.color = "black"

					} else {
						button.style.backgroundColor = " #ebecd0"
						button.style.color = "white"
						button.style.backgroundImage = "url('/assets/knight_b.png')"
						button.style.backgroundPosition = "center center"
						button.style.backgroundRepeat = "no repeat"
					
					}
					await pause(animationSpeed.current)
				}
			}
			colorizeButtons()
			//switched to run
		}
	}, [board, animationSpeed])
	return null
}