import { Component, OnInit } from '@angular/core';
import {StatusInternetService} from "../../../services/status-internet.service";

@Component({
  selector: 'app-dialog-link-interaactionbox',
  templateUrl: './dialog-link-interaactionbox.component.html',
  styleUrls: ['./dialog-link-interaactionbox.component.css']
})
export class DialogLinkInteraactionboxComponent implements OnInit {

  constructor(private statusInternet: StatusInternetService) {
  }

  ngOnInit(): void {
    this.statusInternet.checkStatusInternet();
  }

}
