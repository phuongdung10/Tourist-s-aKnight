import { BoardContext } from "../BoardContext"
import { Calculate } from "../Calculate"
import { useContext } from "react"
import styled from "styled-components"
// creating each cell of chessBoard
const BASE_URl = `${process.env.PUBLIC_URL}/assets/`;
let url = `${BASE_URl}knight_b.png`;

export default function Cell({ name, x, y }) {
	const {
		boardSize,
		setBoard,
	} = useContext(BoardContext)
	function disableAllButtonsAndCalculate() {
		//description each properties, Obj'size and position 
		document.querySelectorAll("svg").forEach(svg => `${svg.remove()}`)
		document.querySelectorAll(".board-button")
			.forEach(btn => { btn.removeAttribute("style") })
		const { history } = Calculate(x, y, boardSize)

		setBoard(history)
	}
	return (
		<SingleCell
			//creating a chessBoard for parallel color
			className={`board-button ${y % 2 === 0 ? 'add' : 'odd'}${x} `}
			onClick={disableAllButtonsAndCalculate}
		>

			{name}
		</SingleCell>
	)
}
const SingleCell = styled.button`
	background-color: seagreen;
	border: 1px solid #666;
	color: #ddd;
	cursor: pointer;
	display: inline;
	font-size: 1rem;
	padding-left: 0.5rem;
	padding-right: -0.5rem;
	text-align: start;
	transition: ease .1s all;
	
	&:hover {
		box-shadow: 10px 10px 10px 10px white;
	}
`