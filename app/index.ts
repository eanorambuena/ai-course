import { load, html } from 'emmy-dom'
import './components/mazeTable'
import './components/genetic'

export function App({ el }) {
  el.className = 'flex flex-col justify-center items-center gap-6 p-6 text-center size-full text-white'

  return html`
  <h1 class='text-4xl font-bold'>AI Algorithms</h1>
  <section class='flex flex-col gap-4 justify-center items-center space-y-3'>
    <h2 class='text-3xl font-bold'>Maze Solver</h2>
    <MazeTable />
  </section>
  <section class='flex flex-col gap-4 justify-center items-center space-y-3'>
    <h2 class='text-3xl font-bold'>Genetic Algorithm</h2>
    <Genetic />
  </section>
  `
}

load(App, 'App')
