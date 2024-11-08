export interface Point {
  x: number
  y: number
}

export class Cell implements Point {
  x: number
  y: number
  g: number
  h: number
  visited: boolean
  isPartOfPath: boolean
  isVisitable: boolean
  neighbors: Cell[]
  previous: Cell | null
  data: { g: number; h: number }

  constructor(point: Point) {
    this.x = point.x
    this.y = point.y
    this.g = 0
    this.h = 0
    this.visited = false
    this.isPartOfPath = false
    this.isVisitable = true
    this.neighbors = []
    this.previous = null
    this.data = {
      g: 0,
      h: 0
    }
  }

  get f() {
    return this.data.g + this.data.h
  }

  visit() {
    this.visited = true
  }

  markPath() {
    let current: Cell | null = this
    while (current) {
      current.isPartOfPath = true
      if (current === current.previous) return
      current = current.previous
    }
  }
}

export class Maze {
  size: number
  grid: Cell[][]
  start: Cell
  end: Cell

  constructor(size: number) {
    this.size = size
    this.grid = Array.from({ length: size }, (_, i) => Array.from({ length: size }, (_, j) => new Cell({ x: i, y: j })))
    this.addNeighbors()
    this.addObstacles()
    this.addStartAndEnd()
  }

  addNeighbors() {
    this.grid.forEach(row => {
      row.forEach(cell => {
        const { x, y } = cell
        if (x > 0) cell.neighbors.push(this.grid[x - 1][y])
        if (x < this.size - 1) cell.neighbors.push(this.grid[x + 1][y])
        if (y > 0) cell.neighbors.push(this.grid[x][y - 1])
        if (y < this.size - 1) cell.neighbors.push(this.grid[x][y + 1])
      })
    })
  }

  addObstacles() {
    this.grid.forEach(row => {
      row.forEach(cell => {
        cell.isVisitable = Math.random() < 0.8
      })
    })
  }

  addStartAndEnd() {
    this.grid[0][0].isVisitable = true
    this.grid[this.size - 1][this.size - 1].isVisitable = true
    this.start = this.grid[0][0]
    this.end = this.grid[this.size - 1][this.size - 1]
  }

  getColorOfCell(cell: Cell) {
    if (cell === this.start) return cell.visited ? '#4ade80' : '#22c55e'
    if (cell === this.end) return cell.visited ? '#f87171' : '#ef4444'
    if (!cell.isVisitable) return '#2d3748'
    if (cell.isPartOfPath) return '#fbbf24'
    return cell.visited ? '#64748b' : '#2b6cb0'
  }
}
