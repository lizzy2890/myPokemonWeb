import { compileDeclarePipeFromMetadata } from '@angular/compiler';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { PokemonForm } from '../interfaces/pokemon-form';
import { DataService, Pokemon } from '../services/data.service';

@Component({
  selector: 'app-pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['./pokemon-form.component.css']
})

//The class is outdated, but kept to remember how to use forms with template driven form
export class PokemonFormComponent implements OnInit, OnChanges {

  model = {
    "image": "no_url",
    "name": "un_name",
    "attack": 0,
    "defense": 0
  }  

  @Input() editablePokemon?: Pokemon;
  @Output() pokemonSave = new EventEmitter<PokemonForm>();
  @Output() hideForm = new EventEmitter<boolean>();

  constructor(private readonly dataSvc: DataService) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if(this.editablePokemon) {
      this.model = Object.assign({}, this.editablePokemon);
    }
  }

  onSubmit(values: Pokemon): void {
    let pokeInfo = {};

    if(this.editablePokemon) {
      values.id = this.editablePokemon.id;
      values.hp = this.editablePokemon.hp;
      values.type = this.editablePokemon.type;
      values.idAuthor = this.editablePokemon.idAuthor;

      pokeInfo = {
        "pokemon": values,
        "actionType": 'edit'
      };
    }
    else {
      pokeInfo = {
        "pokemon": values,
        "actionType": 'add'
      };
    }
    this.pokemonSave.emit(pokeInfo as PokemonForm);
    this.clearForm();
  }

  clearForm(): void {
    this.model = {
      "image": "",
      "name": "",
      "attack": 0,
      "defense": 0
    };
  }

  closeForm(): void {
    this.clearForm();
    this.hideForm.emit(true);
  }
}
