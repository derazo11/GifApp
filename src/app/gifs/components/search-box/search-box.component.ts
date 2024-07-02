
import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template:`
  <h5>Buscar:</h5>
  <input type="text"
  class="form-control"
  placeholder="Buscar..."
  (keyup.enter)="searchTag()"
  #newTag>
  `,
})
export class SearchBoxComponent {

  constructor(private gifsService:GifsService){}

  /* El ViewChild sirve para tomar referencias locales como #newtag que es una referencia local del input buscar */
  @ViewChild('newTag')
  public tagInput!: ElementRef<HTMLInputElement>;

  searchTag(){
    const newtag = this.tagInput.nativeElement.value;
    this.gifsService.searchTag(newtag);
    /* Con esto limpio la caja de texto */
    this.tagInput.nativeElement.value = '';
  }
  
}
