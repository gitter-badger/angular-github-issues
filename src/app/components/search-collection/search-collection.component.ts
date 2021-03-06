import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Repo } from '@app/components/shared/models';
import { ActionsSubject, Store } from '@ngrx/store';
import * as repoActions from '@app/components/store/actions';
import * as fromRoot from '@app/components/store/reducers';
import { Router } from '@angular/router';

@Component({
  selector: 'repo-search-collection',
  templateUrl: './search-collection.component.html',
  styleUrls: ['./search-collection.component.css'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchCollectionComponent {
  @Input() repoCollection: Repo[];
  
  constructor(private store: Store<fromRoot.AppState>, private router: Router) {}

  setRepoInStore(repo: Repo){
    this.store.dispatch(new repoActions.SetCurrentRepoId(repo.id));
    this.router.navigate(['/lazy/issues']);
  }
}