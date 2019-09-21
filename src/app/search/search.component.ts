import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';
import { interval, Observable } from 'rxjs';
import { fromEvent } from 'rxjs';
import { map, debounceTime, filter, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  title: string = "";
  year: string = "";
  type: string = "";
  results: any;
  secondsCounter: Observable<any> = interval(1000);
  seconds: number = 0;

  constructor(private searchService: SearchService) { }

  search() {
    this.searchService.callOMDB(this.title, this.year, this.type).subscribe(res => this.results = res);
    console.log(this.results);
  }

  ngOnInit() {
    this.secondsCounter.subscribe(val => this.seconds = val)

    const titleSearch = document.getElementById("title");
    const titleInput = fromEvent(titleSearch, "keyup").pipe(
      map(e => e.target['value']),
      filter(text => text.length > 2),
      debounceTime(400),
      distinctUntilChanged()
    )
    const yearSearch = document.getElementById("year");
    const yearInput = fromEvent(yearSearch, "keyup").pipe(
      map(e => e.target['value']),
      filter(text => text.length > 3),
      debounceTime(400),
      distinctUntilChanged()
    )

    titleInput.subscribe(val => this.searchService.callOMDB(this.title, this.year, this.type).subscribe(res => this.results = res));
    yearInput.subscribe(val => this.searchService.callOMDB(this.title, this.year, this.type).subscribe(res => this.results = res));
  }



}
