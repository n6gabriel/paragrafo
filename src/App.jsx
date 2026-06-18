import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [removeCount, setUnCount] = useState(40)
  const [inputValue, setInputValue] = useState("")
  const [formulario, setFormulario] = useState({
    nome: '',
    idade: '',
    turma: ''
  })
  const [cep, setCep] = useState('')
  const [endereco, setEndereco] = useState({
    logradouro: '',
    bairro: '',
    localidade: '',
    estado: '',
    uf: '',
    regiao: '',
    ibge: '',
    ddd: ''
  })

  const handleBlur = async () => {
    const cepValido = cep.replace(/\D/g, '')
    console.log('Cep valido ', cepValido)

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepValido}/json/`).then(res => res.json())

      if (!response.erro) {
        setEndereco({
          logradouro: response.logradouro,
          bairro: response.bairro,
          localidade: response.localidade,
          estado: response.estado,
          uf: response.uf,
          regiao: response.regiao,
          ibge: response.ibge,
          ddd: response.ddd
        })
      }
    } catch (error) {
      console.log('Erro buscando CEP: ', error)
    }
  }

  const [paragrafo, setParagrafo] = useState('')
  const [resultadoParagrafos, setResultadoParagrafos] = useState('')

  const handleBlur1 = async () => {
    const paragrafoValido = paragrafo.replace(/\D/g, '')
    console.log('Paragrafo valido ', paragrafoValido)

    if (!paragrafoValido) return

    try {
      const response = await fetch(`https://baconipsum.com/api/?type=all-meat&paras=${paragrafoValido}&start-with-lorem=1&format=json`)
        .then(res => res.json())

      if (Array.isArray(response)) {
        setResultadoParagrafos(response.join('\n\n'))
      }
    } catch (error) {
      console.log('Erro na busca: ', error)
    }
  }

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>

        <div>
          <label>PARÁGRAFOS</label>
          <input
            type="number"
            value={paragrafo}
            onChange={(e) => setParagrafo(e.target.value)}
            placeholder='Digite o número de parágrafos aqui'
            onBlur={handleBlur1}
          />
          <button
            type="button"
            className="confirmarParagrafo"
            onClick={() => handleBlur1()}
          >
            Confirmar
          </button>
        </div>

        <div className="paragrafos-container">
          <h3>Parágrafos:</h3>
          <p>{resultadoParagrafos}</p>
        </div>
        
        <br />

        <div>
          <label>CEP</label>
          <input
            type="text"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            placeholder='00000-000'
            onBlur={handleBlur}
          />
          <button
            type="button"
            className="confirmarCep"
            onClick={() => handleBlur()}
          >
            Confirmar
          </button>
        </div>

        <div>
          <p>Rua: {endereco.logradouro}</p>
          <p>Bairro: {endereco.bairro}</p>
          <p>Estado: {endereco.estado}</p>
          <p>Localidade: {endereco.localidade}</p>
          <p>UF: {endereco.uf}</p>
          <p>Região: {endereco.regiao}</p>
          <p>IBGE: {endereco.ibge}</p>
          <p>DDD: {endereco.ddd}</p>
        </div>

        <div>
          <h1>Nome: </h1> 
          <input
            type="text"
            value={formulario.nome}
            onChange={(e) => setFormulario({ ...formulario, nome: e.target.value })}
            placeholder='Digite seu nome aqui...'
          />
          <h1>Idade: </h1> 
          <input
            type="text"
            value={formulario.idade}
            onChange={(e) => setFormulario({ ...formulario, idade: e.target.value })}
            placeholder='Digite sua idade aqui...'
          />
          <h1>Turma: </h1> 
          <input
            type="text"
            value={formulario.turma}
            onChange={(e) => setFormulario({ ...formulario, turma: e.target.value })}
            placeholder='Digite sua turma aqui...'
          />
        </div>

        <div>
          <p>Seu nome é: {formulario.nome}</p>
          <p>Sua idade é: {formulario.idade}</p>
          <p>Sua turma é: {formulario.turma}</p>
        </div>

        <button
          type="button"
          className="counter"
          onClick={() => {
            setCount(0)
            setUnCount(40)
          }}
        >
          Resetar contadores v2
        </button>

        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder='Digite aqui sei lá o que...'
        />
        <p>Aqui você está digitando: {inputValue}</p>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank" rel="noreferrer">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank" rel="noreferrer">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank" rel="noreferrer">
                <svg className="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank" rel="noreferrer">
                <svg className="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank" rel="noreferrer">
                <svg className="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank" rel="noreferrer">
                <svg className="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App