import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

/**
 * Import Services
 */
import { UsersService } from "../../../services/users.service";
import { SaveService } from "../../../services/save.service";

@Component({
  selector: 'app-importuser',
  templateUrl: './importuser.component.html',
  styleUrls: ['./importuser.component.css']
})
export class ImportuserComponent implements OnInit {

  private fileUpload;
  private nameFileUpload;

  fileUser = [];
  mapPlaylist = new Map();
  loading = "";

  acceptedFile = false;
  errorEmptyFile = false;
  errorWrongFile = false;
  errorUserAlreadyInPlaylist = false;

  constructor(private usersService: UsersService,
              private saveService: SaveService,
              private dialog: MatDialog) {
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
    this.errorUserAlreadyInPlaylist = false;
  }

  /**
   * Check if the Json file is a right file
   * Get the name of the file, split it from the point
   * Then get the last value of the split (= extension of the file) and check if this value == AACPUser
   * After check if the json file contains the right schema
   */
  public jsonIsValid() {
    if (this.nameFileUpload.split('.').pop() == "AACPUser"){
      return this.usersService.checkFileForUser(JSON.parse(this.fileUpload));
    }else {
      return false;
    }
  }

  /**
   * @param playlistMap
   *
   * Allows to create a map playlist with the file
   */
  createMapPlaylist(playlistMap){
    for (let i = 0; i < playlistMap.length; i++){
      this.mapPlaylist.set(playlistMap[i+1], playlistMap[i]);
      i++;
    }
  }

  submit(){
    if (this.fileUpload != null){
      if (this.jsonIsValid()){
        this.fileUser.push(JSON.parse(this.fileUpload));
        if (!this.usersService.userAlreadyInTheList(this.fileUser[0][0].id)){
          this.loading = "loading disabled";
          this.usersService.listUsers.push(this.fileUser[0][0]);
          this.createMapPlaylist(this.fileUser[0][6]);
          this.saveService.addImportUser(
            this.fileUser[0][0], //User
            this.fileUser[0][1], //Playlist
            this.fileUser[0][2], //Theme
            this.fileUser[0][3], //Language
            this.fileUser[0][4], //DwellTime
            this.fileUser[0][5], //AlertMessage
            this.mapPlaylist //mapPlaylist
          );
          setTimeout(() => {
            this.dialog.closeAll();
          }, 2000);
        }else {
          this.acceptedFile = false;
          this.errorUserAlreadyInPlaylist = true
        }
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
