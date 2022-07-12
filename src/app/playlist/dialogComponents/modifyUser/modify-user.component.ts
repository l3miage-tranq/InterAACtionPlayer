import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from '../../../services/users.service';
import { ChooseImgComponent } from '../chooseImgUser/choose-img.component';

@Component({
  selector: 'app-modify-user',
  templateUrl: './modify-user.component.html',
  styleUrls: ['./modify-user.component.css']
})
export class ModifyUserComponent implements OnInit {

  name = "";
  image: string | ArrayBuffer = "";

  constructor(private translate: TranslateService,
              private dialog: MatDialog,
              private usersService: UsersService) {
  }

  ngOnInit(): void {
    try {
      this.name = this.usersService.userToModify.name;
      this.image = this.usersService.userToModify.thumbnail;
    }catch (error){
      console.log("Can't load the name and/or the thumbnail, the error is : " + error);
    }
  }

  /**
   * @param event
   *
   * Allows to get the new value given by the user
   */
  getNewNameUser(event){
    this.name = event.target.value;
  }

  /**
   * @param event
   *
   * Get the new image choose by the user
   */
  addNewImage(event){
    const image = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(image)
    reader.onload = () => {
      this.image = reader.result;
      this.usersService.imgChoose = this.image;
    }
  }

  /**
   * Launch the chooseImgDialog, that permit to the user to choose a new image
   */
  goChooseNewImg(){
    const chooseImgDialog = this.dialog.open(ChooseImgComponent, {height: '100%'});
    chooseImgDialog.afterClosed().subscribe(() => {
      this.image = this.usersService.imgChoose;
    });
  }

  /**
   * Check if the name is empty
   */
  isNameEmpty(){
    if (this.name == ""){
      this.name = this.usersService.userToModify.name;
    }
  }

  /**
   * If the user cancel then close the DialogComponent
   */
  public goCancel(){
    this.dialog.closeAll();
  }

  /**
   * If the new name and the new image is not empty, then modify the user
   * */
  submit(){
    this.isNameEmpty();
    this.usersService.wantModifyUser = true;
    this.usersService.userToModify.name = this.name;
    this.usersService.userToModify.thumbnail = this.image;
    this.dialog.closeAll();
  }
}
