import { Component, OnInit } from '@angular/core';

import { AuthserviceService } from '../authservice.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

  constructor( private authservice: AuthserviceService) {}

  ngOnInit() {
    this.authservice.getSalesforceAuthorize();
  }

}
