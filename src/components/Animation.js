import { BoardContext } from "../BoardContext"
import { useContext, useEffect, useRef } from "react"
function pause(ms) {
	return new Promise(resolve => setTimeout(resolve, ms))
}

export default function Animation() {
	const { animationSpeed, board } = useContext(BoardContext)
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
					//getting 
					const { left, width, top, height } = button.getBoundingClientRect()
				
					if (index > 0) { // Draw SVG line from previous position to current position
						const x = left + width / 2

			
						const y = Math.abs(top - document.querySelector(".board").getBoundingClientRect().top + height / 2)
						const previousButton = buttons.find(b => b.innerHTML === board[index - 1].name)
						if (previousButton === undefined) {
							return
						}
						//List of Number a way called is the order
						previousButton.innerHTML = index
						const previousClientRect = previousButton.getBoundingClientRect()
						const previous = {
							left: previousClientRect.left,
							width: previousClientRect.width,
							top: previousClientRect.top,
							height: previousClientRect.height,
						}
						const previousX = previous.left + width / 2
						const previousY = Math.abs(previous.top - document.querySelector(".board").getBoundingClientRect().top + height / 2)
						pathString += `M ${x} ${y} L ${previousX} ${previousY}`
					}
					const hue = Math.floor(index * (10 / board.length))
					

					button.classList.add("active")
					if (index > 0 && index < board.length - 1) {
						button.style.backgroundColor = `hsl(${hue}, 50%, 80%)`
						button.style.color = "black"
					} else {
						button.style.backgroundColor = " #ebecd0"
						button.style.color = "white"
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