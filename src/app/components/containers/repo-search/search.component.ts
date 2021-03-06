import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { ActionsSubject, Store } from '@ngrx/store';
import * as repoActions from '@app/components/store/actions';
import * as fromRoot from '@app/components/store/reducers';
import { RepoSearchResult, Repo } from '@app/components/shared/models';

@Component({
  selector: 'repo-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class RepoSearchComponent implements OnInit, OnDestroy {

  public searchControl: FormControl = new FormControl();
  public repoCollection: RepoSearchResult[] = [];
  public searchName = '';

  constructor(
    private store: Store<fromRoot.AppState>,
    private actionsSubject: ActionsSubject) {

    this.actionsSubject
        .asObservable()
        .filter(action => action.type === repoActions.LOAD_ALL_REPOS_SUCCESS)
        .subscribe((data: any) => {
            switch (data.type) {
                case '[Repo] LOAD ALL SUCCESS':
                    this.repoCollection = data.payload;
                    break;
                default: console.log(data);
            }
        });

}

  ngOnInit() {
    this.store.dispatch(new repoActions.SetCurrentRepoId(undefined));
  }

  ngOnDestroy() {
  }

  onSubmit(): void {
    if (!this.searchControl.value || this.searchControl.value.trim() === '') {
      return;
    }

    this.searchName = this.searchControl.value;
    this._search();
  }

  private _search(): void {
    this.store.dispatch(new repoActions.LoadAllRepos({ searchName: this.searchName }));
  }
}