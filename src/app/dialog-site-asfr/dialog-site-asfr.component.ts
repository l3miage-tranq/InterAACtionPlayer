import { Component, OnInit } from '@angular/core';
import {StatusInternetService} from "../services/status-internet.service";

@Component({
  selector: 'app-dialog-site-asfr',
  templateUrl: './dialog-site-asfr.component.html',
  styleUrls: ['./dialog-site-asfr.component.css']
})
export class DialogSiteASFRComponent implements OnInit {

  constructor(private statusInternet: StatusInternetService) {
  }

  ngOnInit(): void {
    this.statusInternet.checkStatusInternet();
  }

}
