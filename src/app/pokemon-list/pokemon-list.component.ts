import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { PokemonList } from '../models/pokemonList.model';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css', '../css/colorTypes.css']
})
export class PokemonListComponent implements OnInit {
  pokemonList: any [] = [] ;
  List: any [] = [];
  pokemon: PokemonList;
  offsetValue = 0;

  constructor(private pokemonService: PokemonService) { 
    this.pokemon = {id: 0, image: '', name: '', types: []}
  }

  ngOnInit(): void {
    this.listPokemon();
  }

  listPokemon() {
    this.pokemonService.getPokemonList(this.offsetValue, 20).subscribe(data => {
      this.List = data.results;
      console.log(data);
      console.log(this.List);
      for(const pokemon of this.List){
        this.pokemonService.getPokemonByNameOrNumber(pokemon.name).subscribe((data: any) => {
          this.pokemon = {
            id: data.id,
            image: data.sprites.other['official-artwork'].front_default || data.sprites.other['official-artwork'].front_female || data.sprites.front_default,
            name: data.name,
            types: data.types.map((type: any) => type.type.name),
          };
         this.pokemonList.push(this.pokemon);
         this.pokemonList.sort( (a, b)=> a.id - b.id);
        });
      };
    });
  }

  next() {
    this.offsetValue += 20;
    this.pokemonList = [];
    this.listPokemon()
    console.log(this.offsetValue)
  }
  previus() {
    if(this.offsetValue > 0 ) {
      this.offsetValue -=20;
      this.pokemonList = [];
      this.listPokemon();
    } 
  }
}