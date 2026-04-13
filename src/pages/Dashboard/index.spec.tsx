import { fireEvent, render, screen } from "@testing-library/react";
import Dashboard from ".";
import { fetchPokemonList } from "../../services/PokemonService";
import { faker } from "@faker-js/faker";

const mockFetchPokemonFn = vi
  .fn(fetchPokemonList)
  .mockImplementation(async () => {
    return [
      {
        id: 1,
        name: "pikachu",
        image: faker.image.urlPlaceholder(),
        type: "electric",
      },
      {
        id: 2,
        name: "bulbassauro",
        image: faker.image.urlPlaceholder(),
        type: "poison",
      },
    ];
  });

const navigateMock = vi.fn();

describe("Testa o component Dashboard", () => {
  vi.mock("react-router-dom", () => {
    return {
      useNavigate() {
        return navigateMock;
      },
    };
  });
  test("Deve mostrar o título", async () => {
    render(<Dashboard fetchPokemonList={mockFetchPokemonFn} />);

    const title = await screen.findByRole("heading");
    expect(title).toHaveTextContent("Dashboard");
  });

  test("Deve haver uma lista com 2 pokemons", async () => {
    render(<Dashboard fetchPokemonList={mockFetchPokemonFn} />);

    const items = await screen.findAllByRole("listitem");
    expect(items).toHaveLength(2);
  });

  test("Deve haver um pikachu na lista", async () => {
    render(<Dashboard fetchPokemonList={mockFetchPokemonFn} />);

    const pikachu = await screen.findByText("pikachu");
    expect(pikachu).toBeInTheDocument();
  });

  test("Deve ser possível clicar no li para abrir a página de detalhes", async () => {
    render(<Dashboard fetchPokemonList={mockFetchPokemonFn} />);

    const link = await screen.findByText("pikachu");
    fireEvent.click(link);

    expect(navigateMock).toHaveBeenCalledTimes(1);
  });
});
