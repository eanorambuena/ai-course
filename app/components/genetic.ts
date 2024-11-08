import { FunctionalComponent, load } from 'emmy-dom'
import { geneticAlgorithm } from '../algorithms/genetic'

const html = (strings, ...values) => {
  let htmlString = ''
  strings.forEach((string, i) => {
    const isIterable = typeof values[i] === 'object' && values[i] !== null
    const value = isIterable ? values[i].join('') : values[i]
    htmlString += string + (value || '')
  })
  return htmlString
}

function genetic({ el } : { el: FunctionalComponent }) {
  el.useEffect(() => {
    el.querySelector('#genetic')?.addEventListener('click', () => {
      geneticAlgorithm()
    })
  }, [])

  return () => html`
    <button id='genetic' class='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
      Genetic (see console)
    </button>
  `
}

load(genetic, 'Genetic')
