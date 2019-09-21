import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  callOMDB(title: string, year: string, type: string) {
    return this.http.get(`http://www.omdbapi.com/?i=tt3896198&apikey=89532d9c&s=${title}&y=${year}&type=${type}`)
    .pipe(
      map(res => res["Search"])
    )
  }

}
