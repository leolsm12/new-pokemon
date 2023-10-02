import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  searchTerm: any ;
  Names: any = {};
  filteredPokemonNames: any = [];

  constructor(
    private router: Router,
    private pokemonService: PokemonService
    ) { }

  ngOnInit(): void {
    this.getNames();
    console.log(this.filteredPokemonNames);
  }

  search(): void {
    this.searchTerm = this.searchTerm.toLowerCase().replaceAll(' ', '-')
    if (this.searchTerm) {
      this.pokemonService.getPokemonByNameOrNumber(this.searchTerm).subscribe(
        (data) => {
          const pokemonId = data.id;
          // Redirecionar para a página de detalhes do Pokémon com base no nome ou número
          this.router.navigate(['/pokemon-details', pokemonId]);
        },
        (error) => {
          console.error('Pokémon not found', error);
          // Trate o erro, por exemplo, exibindo uma mensagem de erro ao usuário
        }
      );
    }
    this.searchTerm = '';
    if(typeof this.searchTerm === 'string'){
      console.log('é string')
    } else {
      console.log('né não')
    }
  }
  getNames() {
    this.pokemonService.getPokemonList(0,1292).subscribe(data => {
      this.Names = data?.results.map((pokemon: any) => pokemon.name);
      console.log(this.Names);
    })
  }

  filterPokemonNames() {
    this.filteredPokemonNames = this.Names.filter((name: any) =>
      name.toLowerCase().startsWith(this.searchTerm.toLowerCase())
      
    );
  }

  selectPokemonName(name: string) {
    this.searchTerm = name; // Preenche o searchTerm com o valor do item clicado
    this.filterPokemonNames(); // Chama a função de pesquisa para atualizar a lista filtrada
  }

}