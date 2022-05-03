import { Component, OnInit } from '@angular/core';
import { LanguageService} from "../services/language.service";
import { ActivatedRoute, Router } from "@angular/router";
import { UsersService } from "../services/users.service";
import { SaveService } from "../services/save.service";
import { Users } from "../models/users-interface";
import { DefaultService } from "../services/default.service";

@Component({
  selector: 'app-loading-page',
  templateUrl: './loading-page.component.html',
  styleUrls: ['./loading-page.component.css']
})
export class LoadingPageComponent implements OnInit {

  public activeUser: string;

  constructor(private languageService: LanguageService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private userService: UsersService,
              private saveService: SaveService,
              private defaultService: DefaultService) {
  }

  ngOnInit(): void {
    this.languageService.AFSR = true;
    this.getUser();
    setTimeout(() => {
      this.endLoading();
    }, 1000);
  }

  getUser(){
    setTimeout(() => {
      this.activeUser = this.activatedRoute.snapshot.paramMap.get('id');
      console.log(this.activeUser);
      this.userService.idUser = this.activeUser;
      if (!this.userService.userAlreadyInTheList(this.activeUser)){
        this.addNewUser();
        this.saveService.updateListUsers();
        this.defaultService.setToDefault();
        this.saveService.updatePlaylist();
        this.saveService.updateSettingsAFSR();
        this.saveService.updateMapPlaylist();
      }
      this.userService.typeUser = "user";
      this.userService.idUser = this.activeUser;
      this.saveService.updateUser();
      this.saveService.initPlaylistAFSR();
    }, 500);
  }
  /**
   * Add the new user in the user list
   */
  addNewUser(){
    let newUser: Users = {
      name: this.activeUser,
      id: this.activeUser,
      thumbnail: ""
    }
    this.userService.listUsers.push(newUser);
  }

  endLoading(){
    this.router.navigate([this.languageService.activeLanguage + '/playlist']);
  }
}
