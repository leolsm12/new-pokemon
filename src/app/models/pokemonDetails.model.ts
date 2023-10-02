import { PokemonList } from "./pokemonList.model";

export interface pokemonDetail extends PokemonList {
    height: string;
    weight: string;
    stats_name: string [];
    stats_value: string [];
    evolutions: string [];
    url: string;
}