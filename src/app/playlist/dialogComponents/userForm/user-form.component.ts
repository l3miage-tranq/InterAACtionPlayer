import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from '../../../services/users.service';
import { ChooseImgComponent } from '../chooseImgUser/choose-img.component';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  name = "";
  errorNameEmpty = false;
  image = null;
  errorImgEmpty = false;
  showImgChoose = false;

  constructor(private translate: TranslateService,
              private dialog: MatDialog,
              private usersService: UsersService) {
  }

  ngOnInit(): void {
  }

  /**
   * @param event
   *
   * Allows to get the value given by the user
   */
  getNameUser(event){
    this.name = event.target.value;
  }

  addImage(event){
    const image = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(image)
    reader.onload = () => {
     this.image = reader.result;
    }
    this.usersService.imgChoose = this.image;
    this.showImgChoose = true;
  }

  goChooseImg(){
    const chooseImgDialog = this.dialog.open(ChooseImgComponent, {height: '100%'});
    chooseImgDialog.afterClosed().subscribe(() => {
      this.image = this.usersService.imgChoose;
      this.showImgChoose = true;
    });
  }

  /**
   * If the user cancel the save then close the DialogComponent
   */
  public goCancel(){
    this.dialog.closeAll();
  }

  submit(){
    if (this.name != ""){
      this.errorNameEmpty = false;
      if (this.image != null){
        this.errorImgEmpty = false;
        this.usersService.addUser(this.name);
        this.dialog.closeAll();
      } else {
        this.errorImgEmpty = true;
      }
    }else {
      this.errorNameEmpty = true;
    }

  }
}
