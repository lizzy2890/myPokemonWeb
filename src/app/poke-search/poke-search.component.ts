import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Pokemon } from '../services/data.service';
import { SEARCH_SELECTOR } from './poke-search.constants';

@Component({
  selector: 'app-poke-search',
  templateUrl: './poke-search.component.html',
  styleUrls: ['./poke-search.component.css']
})
export class PokeSearchComponent implements OnInit {

  searchWord: string = '';
  searchedPokemons?: Pokemon[];
  found: boolean = true;
  messgeNotFound: string = 'We don\'t have registered that pokemon. It could be you discovered a new one?!!!';
  showEraseAll: boolean = false;
  camouflage: boolean = false;
  searchBoxElements: string[] = [
    SEARCH_SELECTOR.INPUT_SEARCH,
    SEARCH_SELECTOR.CLEAR_SEARCH
  ];
  
  @Input() pokemons?: Pokemon[];
  @Input() resetSearch?: boolean;
  @Output() filteredPokemons = new EventEmitter<Pokemon[]>();

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if(this.resetSearch) {
      this.searchWord = '';
    }
  }

  onSubmit(): void {
    this.searchedPokemons = this.pokemons?.filter(
      pokemon => pokemon.name.includes(this.searchWord)
      );
    
    if(this.searchedPokemons?.length == 0) {
      this.found = false;
    }
    else {
      this.found = true;
    }
    this.filteredPokemons.emit(this.searchedPokemons); 
  }

  resetSearchWord(): void {
    this.searchWord = '';
  }

  setCamouflage(indicator: boolean): void {
    this.camouflage = indicator;
  }

  hideClearButton(flags: boolean[]): void {
    this.setCamouflage(flags[0]);
    this.showEraseAll = flags[1];
  }
}
