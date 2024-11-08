import { Cell, Maze, Point } from '../structures/maze'

export function aStar(maze: { current: Maze }) {
  const manhattanDistance = (a: Point, b: Point) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y)
  const heuristic = (cell: Cell) => manhattanDistance(cell, maze.current.end)

  const currentCell = maze.current.start
  currentCell.data.g = 0
  currentCell.data.h = heuristic(currentCell)

  const set = new Set<Cell>()
  set.add(currentCell)

  while (set.size) {
    let current = [...set].reduce((a, b) => a.f < b.f ? a : b)
    current.visit()

    if (current === maze.current.end) {
      maze.current.start.data.g = 0
      maze.current.start.previous = null
      current.markPath()
      return current
    }

    set.delete(current)
    current.neighbors.forEach(neighbor => {
      if (!neighbor.isVisitable) return
      const tempG = current.data.g + 1
      if (!neighbor.data.g) neighbor.data.g = Infinity
      
      if (tempG < neighbor.data.g) {
        neighbor.previous = current
        neighbor.data.g = tempG
        neighbor.data.h = heuristic(neighbor)
        if (!set.has(neighbor)) {
          set.add(neighbor)
        }
      }
    })
  }

  return null
}
