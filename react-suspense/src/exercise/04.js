// Cache resources
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import {
  fetchPokemon,
  PokemonInfoFallback,
  PokemonForm,
  PokemonDataView,
  PokemonErrorBoundary,
} from '../pokemon'
import {createResource} from '../utils'

function PokemonInfo({pokemonResource}) {
  const pokemon = pokemonResource.read()
  return (
    <div>
      <div className="pokemon-info__img-wrapper">
        <img src={pokemon.image} alt={pokemon.name} />
      </div>
      <PokemonDataView pokemon={pokemon} />
    </div>
  )
}

const SUSPENSE_CONFIG = {
  timeoutMs: 4000,
  busyDelayMs: 300,
  busyMinDurationMs: 700,
}

const pokemonResourceContext = React.createContext()

function PokemonResourceProvider({children, cacheTime}) {
  const cache = React.useRef({})
  const expirations = React.useRef({})
  const getPokemonResource = React.useCallback(
    name => {
      const lowerName = name.toLowerCase()
      let result = cache.current[lowerName]
      if (!result) {
        result = createPokemonResource(lowerName)
        cache.current[lowerName] = result
        expirations.current[lowerName] = Date.now() + cacheTime
      }
      return result
    },
    [cache, cacheTime],
  )

  React.useEffect(() => {
    const interval = setInterval(() => {
      for(const [name, time] of Object.entries(expirations.current)) {
        if (time < Date.now()) {
          delete cache.current[name]
          delete expirations.current[name]
        }
      }
    }, 1000);
    return () => clearInterval(interval)
  }, [])

  return (
    <pokemonResourceContext.Provider value={getPokemonResource}>
      {children}
    </pokemonResourceContext.Provider>
  )
}

function usePokemonResource() {
  return React.useContext(pokemonResourceContext)
}

function createPokemonResource(pokemonName) {
  return createResource(fetchPokemon(pokemonName))
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')
  const [startTransition, isPending] = React.useTransition(SUSPENSE_CONFIG)
  const [pokemonResource, setPokemonResource] = React.useState(null)
  const getPokemonResource = usePokemonResource()
  React.useEffect(() => {
    if (!pokemonName) {
      setPokemonResource(null)
      return
    }
    startTransition(() => {
      setPokemonResource(getPokemonResource(pokemonName))
    })
  }, [pokemonName, startTransition, getPokemonResource])

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  function handleReset() {
    setPokemonName('')
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className={`pokemon-info ${isPending ? 'pokemon-loading' : ''}`}>
        {pokemonResource ? (
          <PokemonErrorBoundary
            onReset={handleReset}
            resetKeys={[pokemonResource]}
          >
            <React.Suspense
              fallback={<PokemonInfoFallback name={pokemonName} />}
            >
              <PokemonInfo pokemonResource={pokemonResource} />
            </React.Suspense>
          </PokemonErrorBoundary>
        ) : (
          'Submit a pokemon'
        )}
      </div>
    </div>
  )
}

function AppWithProvider() {
  return (
    <PokemonResourceProvider cacheTime={5000}>
      <App />
    </PokemonResourceProvider>
  )
}

export default AppWithProvider
