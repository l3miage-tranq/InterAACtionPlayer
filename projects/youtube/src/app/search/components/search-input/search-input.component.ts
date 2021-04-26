import { Component, AfterViewInit, ViewChild, ElementRef, Output, EventEmitter, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, pluck, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ThemeService } from '../../../../../../../src/app/services/theme.service';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent implements OnInit,AfterViewInit {

  @ViewChild('input') inputElement: ElementRef;
  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  theme = "";

  private router: Router;
  private themeService: ThemeService;

  constructor(router: Router, themeService: ThemeService) {
    this.router = router;
    this.themeService = themeService;
    this.theme = this.themeService.theme;
  }

  ngOnInit(): void {
    if (this.theme == "inverted"){
      this.theme = this.theme + " transparent contourColor";
    }
    this.themeService.themeObservable.subscribe(value => {
      this.theme = value + " transparent contourColor";
    })
  }

  ngAfterViewInit() {
    fromEvent(this.inputElement.nativeElement, 'keyup')
      .pipe(
        debounceTime(500),
        pluck('target', 'value'),
        distinctUntilChanged(),
        filter((value: string) => value.length > 3),
        map((value) => value)
      )
      .subscribe(value => {
        this.search.emit(value);
      });
  }

  goPlaylist() {
    this.router.navigate(['/playlist']);
  }
}
