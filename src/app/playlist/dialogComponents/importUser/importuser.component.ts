import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

/**
 * Import Services
 */


@Component({
  selector: 'app-importuser',
  templateUrl: './importuser.component.html',
  styleUrls: ['./importuser.component.css']
})
export class ImportuserComponent implements OnInit {

  private fileUpload;
  private nameFileUpload;

  acceptedFile = false;
  errorEmptyFile = false;
  errorWrongFile = false;
  errorUserAlreadyInPlaylist = false;

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  addFile(event){
    this.fileUpload = event.target.files[0];
    this.nameFileUpload = event.target.files[0].name;
    const reader = new FileReader();
    reader.readAsText(this.fileUpload);
    reader.onload = () => {
      this.fileUpload = reader.result;
    };
    this.acceptedFile = true;
    this.errorEmptyFile = false;
    this.errorWrongFile = false;
  }

  /**
   * Check if the Json file is a right file
   * Get the name of the file, split it from the point
   * Then get the last value of the split (= extension of the file) and check if this value == json
   * After check if the json file contains the right schema
   */
  public jsonIsValid() {
      return this.nameFileUpload.split('.').pop() == "json";
  }

  submit(){
    if (this.fileUpload != null){
      if (this.jsonIsValid()){

      }else {
        this.acceptedFile = false;
        this.errorWrongFile = true;
      }
    }else {
      this.acceptedFile = false;
      this.errorEmptyFile = true;
    }
  }

  goCancel(){
    this.dialog.closeAll();
  }
}
