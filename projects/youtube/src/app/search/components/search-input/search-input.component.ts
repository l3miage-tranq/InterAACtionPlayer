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

  @ViewChild('input') inputElement: ElementRef; // Get the value written by the user in the input bar search
  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  theme = "";

  private router: Router;
  private themeService: ThemeService;

  /**
   * @param router
   * @param themeService
   *
   * Initialize the router for navigate between page
   * And allows to initialize the page with the right theme
   */
  constructor(router: Router, themeService: ThemeService) {
    this.router = router;
    this.themeService = themeService;
    this.theme = this.themeService.theme;
  }

  ngOnInit(): void {
    if (this.theme == "inverted"){
      this.theme = this.theme + " transparent contourColor";
    }
  }

  /**
   * Set up an event listener on the input element to monitor whatever the user types;
   * Make sure the value typed has a length greater than three characters;
   * It's counterintuitive to respond to every keystroke, so we need to give the user enough time to type in their value before handling it;
   * Ensure the current value typed is different from the last value. Otherwise, there's no use in handling it;
   *
   * The 'fromEvent' operator is used to set up event listeners on a specific element;
   * In this case, we're interested in listening to the 'keyup' event on the input element;
   *
   * The 'debounceTime()' operator helps us control the rate of user input.;
   * I decide to only get the value after the user has stopped typing for a specific amount of time (In this case -> 500ms);
   *
   * I use the "pluck('target','value')" to get the value property from the input object;
   *
   * 'distincUntilChanged()' ensures that the current value is different from the last value. Otherwhise, it discards it;
   *
   * I use the 'filter()' operator to check for and discard values that have fewer than one character;
   *
   * The 'map' operator returns the value as an 'Observable';
   * This allow us to subscribe to it, in which case the value can be sent over to the parent component using the 'Output' event emitter.
   */
  ngAfterViewInit() {
    fromEvent(this.inputElement.nativeElement, 'keyup')
      .pipe(
        debounceTime(500),
        pluck('target', 'value'),
        distinctUntilChanged(),
        filter((value: string) => value.length >= 1),
        map((value) => value)
      )
      .subscribe(value => {
        this.search.emit(value);
      });
  }

  /**
   * Allows to return to the Playlist web page
   */
  goPlaylist() {
    this.router.navigate(['/playlist']);
  }
}
