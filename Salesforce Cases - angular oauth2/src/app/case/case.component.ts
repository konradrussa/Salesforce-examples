import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { URLSearchParams } from '@angular/http';

import { Case, CaseserviceService } from '../caseservice.service';

@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.css']
})
export class CaseComponent implements OnInit {

  constructor(private caseService: CaseserviceService, private activatedRoute: ActivatedRoute) {
    this.canRender = false;
   }

  cases: Case[];
  canRender: boolean;

  getCases(accountName: string): void {
    this.activatedRoute.fragment.subscribe(fragment => {
       if (fragment) {
        let params = new URLSearchParams(fragment);
        let access_token = params.paramsMap.get('access_token');
        let instanceURL = params.paramsMap.get('instance_url');
        this.caseService.getCases(access_token[0], instanceURL[0], accountName).then(cases => this.cases = cases);
       }
    });
  }

  ngOnInit() {
    this.activatedRoute.fragment.subscribe(fragment => {
       if (fragment) {
         this.canRender = true;
       }
      });
  }

  onClickMe(value: string) {
    this.getCases(value);
  }

  onEnter(value: string) {
    this.getCases(value);
  }

}
