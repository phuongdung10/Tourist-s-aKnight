import "./App.css"
import { BoardProvider } from "./BoardContext"
import Board from "./components/Board";
import Animation from "./components/Animation";



function App() {
	return (
		<BoardProvider>
			<div className="App">
				<Board />
				<Animation />
			</div>
		</BoardProvider>
	)
}

export default App
