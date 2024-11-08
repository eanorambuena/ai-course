import { load, html } from 'emmy-dom'
import './components/mazeTable'

export function App({ el }) {
  el.className = 'flex flex-col justify-center items-center gap-4 p-6 text-center size-full text-white'

  return html`
    <h1 class='text-3xl font-bold'>Maze Solver</h1>
    <p class='text-xl'>
      Choose an algorithm to visualize
    </p>
    <MazeTable />
  `
}

load(App, 'App')
