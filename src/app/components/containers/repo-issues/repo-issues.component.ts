import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ActionsSubject, Store } from '@ngrx/store';
import * as issueActions from '@app/components/store/actions';
import * as fromRoot from '@app/components/store/reducers';
import { Issue } from '@app/components/shared/models';
import 'rxjs/add/operator/filter';

@Component({
    selector: 'app-repo-issues',
    templateUrl: './repo-issues.component.html',
    styleUrls: ['./repo-issues.component.css']
})
export class RepoIssuesComponent implements OnInit {

    public repoIssueCollection: Issue[] = [];

    private _storeSubject: ActionsSubject;
    private _owner: string;
    private _repo: string;

    constructor(
        private store: Store<fromRoot.AppState>,
        private actionsSubject: ActionsSubject) {

        this.actionsSubject
            .asObservable()
            .filter(action => action.type === issueActions.LOAD_ALL_ISSUES_SUCCESS)
            .subscribe((data: any) => {
                switch (data.type) {
                    case '[Issue] LOAD ALL SUCCESS':
                        this.repoIssueCollection = data.payload;
                        break;
                    default: console.log(data);
                }
            });

    }

    ngOnInit(){
      this.store.select(fromRoot.getSelectedRepo).subscribe(data => {
            if (data) {
               this.store.dispatch(new issueActions.LoadAllIssues({ owner: data.owner.login, repo: data.name }));
            }
      });
    }
}