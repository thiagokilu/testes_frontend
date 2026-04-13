import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import { PokemonType } from "../../types/PokemonType";
import { fetchPokemonList } from "../../services/PokemonService";
import { useNavigate } from "react-router-dom";

type DashboardProps = {
  fetchPokemonList?: () => Promise<PokemonType[]>;
};

export default function Dashboard({
  fetchPokemonList: loadPokemonList = fetchPokemonList,
}: DashboardProps) {
  const navigate = useNavigate();
  const [pokemons, setPokemons] = useState<PokemonType[]>([]);

  function handleNavigate(id: number) {
    navigate(`/pokemon-detail/${id}`);
  }

  useEffect(() => {
    (async () => {
      const data = await loadPokemonList();
      setPokemons(data);
    })();
  }, [loadPokemonList]);
  return (
    <div className={styles.container}>
      <h1>Dashboard</h1>
      <ul className={styles["container-pokemons"]}>
        {pokemons.map((pokemon) => (
          <li key={pokemon.id} onClick={() => handleNavigate(pokemon.id)}>
            <h1>{pokemon.name}</h1>
            <img src={pokemon.image} alt={pokemon.name} />
            <strong>{pokemon.type}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}
