import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

/**
 * Import Services
 */
import { UsersService } from '../../../services/users.service';
import { NotifierService } from 'angular-notifier';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

  security = "disabled";

  constructor(private dialog: MatDialog,
              private usersService: UsersService,
              private notifier: NotifierService,
              private translate: TranslateService) {
  }

  /**
   * Set a security on the button delete.
   * The user can only click on the button after 3s
   */
  ngOnInit(): void {
    setTimeout(() => {
      this.security = "";
    }, 3000);
  }

  /**
   * If the user cancel then close the DialogComponent
   */
  public goCancel(){
    this.dialog.closeAll();
  }

  /**
   * When the user click set the wantDeleteUser value to true for start the delete
   */
  public submit(){
    this.usersService.wantDeleteUser = true;
    this.dialog.closeAll();
    this.notifier.notify('warning', this.translate.instant('notifier.deleteUser'));
  }
}
