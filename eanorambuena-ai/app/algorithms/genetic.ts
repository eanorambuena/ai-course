export function genetic() {
  const possibleCharacters = 'abcdefghijklmnopqrstuvwxyz'
  const adam = 'adam'
  const eve = 'even'
  const goal = 'nate'
  const maximumPopulation = 100
  const maximumGeneration = 100
  const reproductionsPerGeneration = maximumPopulation / 2

  let generation = 0
  let population = [adam, eve]
  let newPopulation: string[]
  let fitness: number[] = []

  const getFitness = (individual) => {
    let score = 0
    for (let i = 0; i < individual.length; i++) {
      if (individual[i] === goal[i]) {
        score++
      }
    }
    return score
  }

  const mutate = (individual) => {
    const mutationIndex = Math.floor(Math.random() * goal.length)
    const mutationCharacter = possibleCharacters[Math.floor(Math.random() * possibleCharacters.length)]
    return individual.slice(0, mutationIndex) + mutationCharacter + individual.slice(mutationIndex + 1)
  }

  const getRoullete = (fitness) => {
    const totalFitness = fitness.reduce((a, b) => a + b)
    const roulette = Math.floor(Math.random() * totalFitness)
    let sum = 0
    let parentIndex = 0
    while (sum < roulette) {
      sum += fitness[parentIndex]
      parentIndex++
    }
    return parentIndex % fitness.length
  }

  while (generation < maximumGeneration) {
    console.log(`Generation: ${generation} - Population: ${population.join(', ')}`)
    fitness = population.map(individual => getFitness(individual))
    newPopulation = population
    for (let i = 0; i < reproductionsPerGeneration; i++) {
      const parentA = population[getRoullete(fitness)]
      const parentB = population[getRoullete(fitness)]
      const split = Math.floor(Math.random() * goal.length)
      let child1 = parentA.slice(0, split) + parentB.slice(split)
      let child2 = parentB.slice(0, split) + parentA.slice(split)
      newPopulation.push(mutate(child1))
      newPopulation.push(mutate(child2))
    }

    const populationLimit = newPopulation.length < maximumPopulation ? newPopulation.length : maximumPopulation
    population = newPopulation.sort((a, b) => getFitness(b) - getFitness(a)).slice(0, populationLimit)
    generation++
  }
  console.log(`Percentage of the goal reached: ~${population.filter(individual => individual === goal).length / population.length * 100}%`)
}
