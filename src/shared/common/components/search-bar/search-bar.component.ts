import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  /**
   * @description capture user search data
   * @property search
   * @type Subject<string>
   * @public
   * @default new Subject<string>()
   */
  public search: Subject<string> = new Subject<string>();

  /**
   * @description emit event
   * @property event
   * @type EventEmitter<any>
   * @public
   * @default new EventEmitter<any>()
   */
  @Output() public event: EventEmitter<any> = new EventEmitter<any>();
  public hasValue: boolean;

  /**
   * @description subscribe to search events
   * @method ngOnInit
   * @public
   * @returns void
   */
  public ngOnInit(): void {
    this._searchSubscription();
  }

  /**
   * @description clear search input and send empty string
   * @method clearSearch
   * @param input { value: string; }
   * @public
   * @returns void
   */
  public clearSearch(input: { value: string }): void {
    this.search.next('');
    input.value = '';
  }

  /**
   * @description subscribe to search input chnages
   * @method _searchSubscription
   * @public
   * @returns void
   */
  private _searchSubscription(): void {
    this.search
      .pipe(
        map((value) => value),
        debounceTime(600),
        distinctUntilChanged()
      )
      .subscribe((searchPhrase) => {
        if (searchPhrase && searchPhrase.trim() !== '') {
          this.hasValue = true;
        } else {
          this.hasValue = false;
        }

        this.event.next(searchPhrase);
      });
  }
}
