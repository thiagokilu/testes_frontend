import { faker } from "@faker-js/faker";
import { PokemonType } from "../types/PokemonType";
import { fetchPokemonDetail, fetchPokemonList } from "./PokemonService";
import { vi, type Mock } from "vitest";

global.fetch = vi.fn();
const fetchMock = global.fetch as unknown as Mock;

function createFetchResponse(data: any) {
  return { json: () => new Promise((resolve) => resolve(data)) } as Response;
}

describe("Testa o service PokemonService", () => {
  test("Verifica se foi feito um get detail para url correta", async () => {
    const pokemonListResponse: PokemonType[] = [
      {
        id: 1,
        image: faker.image.urlPlaceholder(),
        name: faker.animal.bear.name,
        type: faker.animal.type(),
      },
      {
        id: 2,
        image: faker.image.urlPlaceholder(),
        name: faker.animal.bear.name,
        type: faker.animal.type(),
      },
    ];

    fetchMock.mockResolvedValue(createFetchResponse(pokemonListResponse));

    const pokemonList = await fetchPokemonList();
    expect(fetch).toHaveBeenCalledWith("http://localhost:3000/pokemon");
    expect(pokemonList).toStrictEqual(pokemonListResponse);
  });

  test("Verifica se foi feito um get detail para url correta", async () => {
    const pokemonDetailResponse: PokemonType = {
      id: 1,
      image: faker.image.urlPlaceholder(),
      name: faker.animal.bear.name,
      type: faker.animal.type(),
    };

    fetchMock.mockResolvedValue(createFetchResponse(pokemonDetailResponse));

    const pokemon = await fetchPokemonDetail(1);

    expect(fetch).toHaveBeenCalledWith("http://localhost:3000/pokemon/1");
    expect(pokemon).toStrictEqual(pokemonDetailResponse);
  });
});
