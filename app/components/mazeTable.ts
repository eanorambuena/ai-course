import { FunctionalComponent, load, useRef } from 'emmy-dom'
import { aStar } from '../algorithms/aStar'
import { Maze } from '../structures/maze'
import { genetic } from '../algorithms/genetic'

const html = (strings, ...values) => {
  let htmlString = ''
  strings.forEach((string, i) => {
    const isIterable = typeof values[i] === 'object' && values[i] !== null
    const value = isIterable ? values[i].join('') : values[i]
    htmlString += string + (value || '')
  })
  return htmlString
}

export function mazeTable({ el } : { el: FunctionalComponent }) {
  el.className = 'flex flex-row-reverse gap-6 justify-center items-center space-y-3'
  const size = 12
  const maze = useRef<Maze>(new Maze(size))
  
  el.useEffect(() => {
    el.querySelector('#a-star')?.addEventListener('click', () => {
      aStar(maze)
    })
    el.querySelector('#genetic')?.addEventListener('click', () => {
      genetic()
    })
  }, [])

  return () => html`
    <nav class='flex flex-col gap-4 justify-center items-center space-x-3'>
      <legend class='text-xl'>Choose an algorithm to visualize</legend>
      <button id='a-star' class='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
        A*
      </button>
      <button id='genetic' class='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
        Genetic (see console)
      </button>
    </nav>
    <table class='border-collapse border-2 border-gray-700'>
      <tr class='border-collapse border-2 border-gray-700'>
        ${maze.current.grid.map(row => html`
          <tr class='border-collapse border-2 border-gray-700'>
            ${row.map(cell => html`
              <td class='border-collapse border-2 border-gray-700 size-11'>
                <div class='w-full h-full text-xs flex flex-col justify-center items-center' style='background-color:${maze.current.getColorOfCell(cell)}'>
                  ${!!cell.data.h && `${cell.data.g}+${cell.data.h}`}
                </div>
              </td>
            `)}
          </tr>
        `)}
      </tr>
    </table>
  `
}

load(mazeTable, 'MazeTable')
