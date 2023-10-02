import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../pokemon.service';
import { pokemonDetail } from '../models/pokemonDetails.model';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css', '../css/colorTypes.css']
})
export class PokemonDetailsComponent implements OnInit {
  pokemonId: number = 0;
  pokemon: pokemonDetail;

  constructor(private route: ActivatedRoute, private pokemonService: PokemonService ) { 
    this.pokemon = {id: 0, name:'', types: [], image: '', height: '', weight: '', evolutions: [], stats_name: [], stats_value: [], url:'' }
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.pokemonId = +params['id'];
      this.pokemonDetails();
    });
  }

  pokemonDetails() {
      this.pokemonService.getPokemonDetails(this.pokemonId).subscribe(data => {
        this.pokemon = {
        id: data.id,
        name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
        types: data.types.map((type: any) => type.type.name),
        image: data.sprites.other['official-artwork'].front_default || data.sprites.other['official-artwork'].front_female || data.sprites.front_default,
        height: data.height,
        weight:  data.weight,
        evolutions: [],
        stats_name: data.stats.map((stat: any) => stat.stat.name),
        stats_value: data.stats.map((stat: any) => stat.base_stat),
        url: data.species.url,
        };
        console.log(this.pokemon);
      }); 
  }

  next() {
    this.pokemonId += 1;
    this.pokemonDetails();
    console.log(this.pokemonId);
  }

  previus() {
    if(this.pokemonId > 1){
      this.pokemonId -= 1;
      this.pokemonDetails();
      console.log(this.pokemonId);
    }
  }
}