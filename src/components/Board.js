import { BoardContext } from "../BoardContext"
import Cell from "./Cell"
import { motion } from "framer-motion"
import { useContext, useEffect } from "react"
import { v4 as uuidv4 } from 'uuid'
import styled from "styled-components"
function Board() {
	const {
		boardSize,
		variants
	} = useContext(BoardContext)
	const board = []
	for (let x = 0; x < boardSize; x++) {
		const row = []
		console.log("rowww>?>>>", row)
		for (let y = 0; y < boardSize; y++) {
			const letter = "ABCDEFGH"[boardSize - y - 1]
			// to have could use a string structe each compatibility item with each value.
			row.push(
				<Cell
					name={`${letter}${x + 1}`}
					{...{
						x, y,
					
					}}

					key={uuidv4()}
				/>
			)
		}
		board.push(row)

	}
	return (
		<BoardContainer className="board" {...{ boardSize, variants }}>
			{board.map(function drawBoard(row) {
				return (
					<div className="row">
						{row.map(cell => cell)}
					</div>
				)
			})}
		</BoardContainer>
	)
}
export default Board;
const BoardContainer = styled(motion.div).attrs(({ variants }) => ({
	initial: variants.out,
	animate: variants.in ,
	exit: variants.out,
}))`
	background: yellow;
	bottom: 0;
	color: yellow;		
	display: flex;
	height: 100%;
	left: 0;
	margin-top: 1rem;
	position: absolute;

	.row {
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		width: 100px;
	}
	button {
		display: inline-block;
		flex-direction: wrap;
		height: 100%;
	}
`