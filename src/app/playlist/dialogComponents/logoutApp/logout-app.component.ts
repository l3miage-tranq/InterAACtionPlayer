import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { TranslateService } from "@ngx-translate/core";
import exportFromJSON from "export-from-json";

@Component({
  selector: 'app-logout-app',
  templateUrl: './logout-app.component.html',
  styleUrls: ['./logout-app.component.css']
})
export class LogoutAppComponent implements OnInit {

  security = "disabled";

  constructor(private dialog: MatDialog,
              private translate: TranslateService) {
  }

  /**
   * Set a security on the button delete.
   * The user can only click on the button after 2s
   */
  ngOnInit(): void {
    setTimeout(() => {
      this.security = "";
    }, 2000);
  }

  /**
   * If the user cancel then close the DialogComponent
   */
  public goCancel(){
    this.dialog.closeAll();
  }

  /**
   * When the user click on submit, then we create a file for close the app
   */
  public submit(){
    exportFromJSON({
      data: "",
      fields: {} ,
      fileName: "close161918",
      exportType: exportFromJSON.types.txt
    });
  }

}
