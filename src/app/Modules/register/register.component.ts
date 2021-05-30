import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { User } from 'src/app/Models/user.model';
import { LoginComponent } from '../login/login.component';
import { UserService } from './../../Services/user-service/user.service';
import { Md5 } from "ts-md5/dist/md5";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  newUsername;
  newPassword;
  newEmail;
  newPhoneNumber;

  constructor(private dialogRef: MatDialogRef<LoginComponent>, private _userService: UserService) { }

  ngOnInit(): void {
    this.newUsername = "";
    this.newPassword = "";
    this.newEmail = "";
    this.newPhoneNumber = "";
  }

  createUser(){
    this.newPassword = Md5.hashStr(this.newPassword);

    if (this.newUsername != "" && this.newPassword != "" && this.newEmail != "" && this.newPhoneNumber != ""){
      var newUser = new User();
      newUser.username = this.newUsername;
      newUser.password = this.newPassword;
      newUser.email = this.newEmail;
      newUser.phonenumber = this.newPhoneNumber;
      newUser.role = "USER"
      

      this._userService.createUser(newUser).subscribe();
      this.dialogRef.close();

    }
  }

  cancel(){
    this.dialogRef.close();
  }

}
