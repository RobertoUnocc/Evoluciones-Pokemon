import { TiArrowLeftOutline, TiArrowRightOutline } from "react-icons/ti";
import "./scss/App.scss";
import Button from "./components/Button";

import { useEffect, useState } from "react";
import Card from "./components/Card";

function App() {
  const [pokemonId, setPokemonId] = useState(1);
  const [pokemonEvolutions, setPokemonEvolutions] = useState([]);

  const handleClick = () => {
    pokemonId === 1 ? setPokemonId(1) : setPokemonId(pokemonId - 1);
  };

  const getEvolutions = async (pokeminID) => {
    const res = await fetch(
      `https://pokeapi.co/api/v2/evolution-chain/${pokeminID}/`
    );
    const data = await res.json();
    console.log(data);
    let pokemons = [];
    let pokemonLevel1NAME = data.chain.species.name;
    let pokemonLevel1IMG = await getPokemonImgs(pokemonLevel1NAME);
    pokemons.push([pokemonLevel1NAME, pokemonLevel1IMG]);

    if (data.chain.evolves_to.length !== 0) {
      let pokemonLevel2NAME = data.chain.evolves_to[0].species.name;
      let pokemonLevel2IMG = await getPokemonImgs(pokemonLevel2NAME);
      pokemons.push([pokemonLevel2NAME, pokemonLevel2IMG]);

      if (data.chain.evolves_to[0].evolves_to.length !== 0) {
        let pokemonLevel3NAME =
          data.chain.evolves_to[0].evolves_to[0].species.name;
        let pokemonLevel3IMG = await getPokemonImgs(pokemonLevel3NAME);
        pokemons.push([pokemonLevel3NAME, pokemonLevel3IMG]);
      }
    }

    setPokemonEvolutions(pokemons);
  };

  const getPokemonImgs = async (name) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);
    const data = await res.json();

    return data.sprites.other["official-artwork"].front_default;
  };

  useEffect(() => {
    getEvolutions(pokemonId);
  }, [pokemonId]);

  return (
    <div className="app">
      <div className={`cards card-${pokemonEvolutions.length}`}>
        {pokemonEvolutions.map((pokemon) => (
          <Card key={pokemon[0]} name={pokemon[0]} img={pokemon[1]} />
        ))}
      </div>
      <div className="buttons">
        <Button icon={<TiArrowLeftOutline />} handleClick={handleClick} />
        <img
          src="https://i.pinimg.com/originals/34/c1/e5/34c1e5d371d64a581b1902ec5c4509f4.png"
          alt=""
          className="logo"
        />
        <Button
          icon={<TiArrowRightOutline />}
          handleClick={() => {
            setPokemonId(pokemonId + 1);
          }}
        />
      </div>
    </div>
  );
}

export default App;
