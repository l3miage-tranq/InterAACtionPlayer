import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  name = "";
  errorNameEmpty = false;
  image;

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
      this.usersService.addUser(this.name, this.image);
      this.dialog.closeAll();
    }else {
      this.errorNameEmpty = true;
    }

  }
}
