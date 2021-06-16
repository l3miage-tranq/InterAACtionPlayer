import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

  security = "disabled";

  constructor(private dialog: MatDialog,
              private usersService: UsersService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.security = "";
    }, 3000);
  }

  /**
   * If the user cancel the save then close the DialogComponent
   */
  public goCancel(){
    this.dialog.closeAll();
  }

  public submit(){
    this.usersService.wantDeleteUser = true;
    this.dialog.closeAll();
  }
}
