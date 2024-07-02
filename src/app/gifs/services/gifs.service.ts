import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  /* El guion al piso se usa para variables privadas */
  private _tagHistory: string[]= [];

  private apiKey:string = 'waK7le5IIc06jRlK1ROurBczKDJNi5kW';
  private apiUrl:string = 'https://api.giphy.com/v1/gifs';

  public listGifs:Gif[] =[];
  
  constructor(private http:HttpClient) { 
    this.loadLocalStorage();
    this.searchTag;

  }

  getTagHistory(){
    /* Operador de propagacion que son los tres puntos se usa para hacer una copia del arreglo
    esto para evitar modificaciones en el arreglo original */
    return [...this._tagHistory];
  }

  private organizeHistory(tag:string){
    tag = tag.toLowerCase();

    if(this._tagHistory.includes(tag)){
      this._tagHistory = this._tagHistory.filter((oldTag) => oldTag !== tag);
    }
    this._tagHistory.unshift(tag);
    this._tagHistory = this._tagHistory.splice(0,10);
    this.saveLocalStorage();
    
  }

  /* Metodo para almacenar informacion en el localstorage */

  private saveLocalStorage(){
    localStorage.setItem('history',JSON.stringify(this._tagHistory));
  }

  private loadLocalStorage(){
    if(!localStorage.getItem('history')) return;
    this._tagHistory = JSON.parse(localStorage.getItem('history')!);

    if(this._tagHistory.length === 0) return;
    this.searchTag(this._tagHistory[0]);
  }

  searchTag(tag:string):void{
    if(tag.length === 0)return;
    this.organizeHistory(tag);

    /* Parametros de HTTP */
    const params = new HttpParams()
    .set('api_key',this.apiKey)
    .set('limit',10)
    .set('q',tag)

    /* Al matener el cursor sobre el metodo get de http nos podemos dar cuenta 
    que es un metodo generico por lo que podemos usar los simbolo <> y poner el tipo de dato
    en este caso es SearchResponse */
    this.http.get<SearchResponse>(`${this.apiUrl}/search`,{params})
    .subscribe(respuesta =>{
      this.listGifs = respuesta.data;
      console.log({gifs:this.listGifs});
    })
  }
}
