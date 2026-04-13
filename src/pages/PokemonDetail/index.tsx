import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { PokemonType } from "../../types/PokemonType";
import styles from "./styles.module.scss";

interface IProps {
  fetchPokemonDetail: (id: number) => Promise<PokemonType>;
}

export default function pokemondetail({ fetchPokemonDetail }: IProps) {
  const params = useParams();
  const [error, setError] = useState("");
  const [pokemon, setPokemon] = useState<PokemonType>({
    id: 0,
    name: "",
    image: "",
    type: "",
  });
  useEffect(() => {
    (async () => {
      if (!params.id || params.id == "0") {
        setError("O id não é válido");
        return;
      }
      const data = await fetchPokemonDetail(parseInt(params.id));
      setPokemon(data);
    })();
  }, []);
  return (
    <div className={styles.container}>
      <div>
        <h1>{pokemon.name}</h1>
        <img src={pokemon.image} alt={pokemon.name} />
        <strong>{pokemon.type}</strong>
      </div>
      <Link to="/dashboard">Voltar</Link>
      {error && <strong>{error}</strong>}
    </div>
  );
}
