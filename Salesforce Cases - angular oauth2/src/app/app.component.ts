import { Component } from '@angular/core';

import { CaseComponent } from './case/case.component';
import { Case, CaseserviceService } from './caseservice.service';
import { AuthserviceService } from './authservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CaseserviceService, AuthserviceService]
})
export class AppComponent {
  title = 'angular app';
}

