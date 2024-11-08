const sigmoid = (x) => {
  return 1 / (1 + Math.exp(-x))
}

// --------------------------------------------
const c = (a, target) => (a - target) ** 2 / 2
const Dc_a = (a, target) => a - target

const a = sigmoid
const aInverse = (y) => Math.log(y / (1 - y))
const Da_z = (z) => sigmoid(z) * (1 - sigmoid(z))

const learningRate = 20
const jobs = 8
const epochs = 5
// --------------------------------------------

const dot = (X, Y) => {
  return X.reduce((sum, x, i) => sum + x * Y[i], 0)
}

class Neuron {
  constructor({ bias, weights, inputCount }) {
    this.b = bias ?? Math.random() * 2 - 1
    this.W = weights ?? Array.from({ length: inputCount }, () => Math.random() * 2 - 1)
  }

  feedForward(X) {
    let z = this.b + dot(this.W, X)
    return a(z)
  }
}

const neuron = new Neuron({ inputCount: 2 })

const trainingData = [
  { input: [0, 0], output: 0 },
  { input: [0, 1], output: 0 },
  { input: [1, 0], output: 0 },
  { input: [1, 1], output: 1 },
]

const getOutput = (X) => neuron.feedForward(X)

const Dz_W = (X) => X
const Dz_b = () => 1 

const Dc_z = (a, target) => Dc_a(a, target) * Da_z(aInverse(a))

const Dc_W = (a, target, X) => Dc_z(a, target) * Dz_W(X)
const Dc_b = (a, target) => Dc_z(a, target) * Dz_b()

const train = (data) => {
  for (let i = 0; i < jobs; i++) {
    const { input, output: target } = data[Math.floor(Math.random() * data.length)]

    for (let j = 0; j < epochs; j++) {
      const output = getOutput(input)

      console.log(input, output, target, c(output, target))

      //update weights
      neuron.W = neuron.W.map((weight, i) => {
        const newInput = i === 0 ? 1 : input[i - 1]
        console.log(`Weight: ${weight}\tGradient: ${- learningRate * Dc_W(output, target, newInput)}`)
        return weight - learningRate * Dc_W(output, target, newInput)
      })

      //update bias
      neuron.b = neuron.b - learningRate * Dc_b(output, target)
      console.log(`Bias: ${neuron.b}\tGradient: ${- learningRate * Dc_b(output, target)}`)
    }
  }
  
  //evaluate
  data.forEach(({ input, output }) => {
    const result = getOutput(input)
    console.log(`Input: ${input[0]}+${input[1]} Output: ${Number.parseFloat(result).toFixed(2)} Target: ${Number.parseFloat(output).toFixed(2)}`)
  })
}

console.log(`Initial Weights: ${neuron.W} Initial Bias: ${neuron.b}`)
train(trainingData)
