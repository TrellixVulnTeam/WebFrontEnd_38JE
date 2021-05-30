import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UserService } from 'src/app/Services/user-service/user.service';
import { RegisterComponent } from '../register/register.component';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username = "";
  password = "";

  constructor(private dialog: MatDialog, private _userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  createAccount(){
    this.dialog.open(RegisterComponent, {
      width: '500px',
      height: '290px',
    });
  }

  LogIn(){
    if (this.username != "" && this.password != ""){
      this._userService.getUserByUsername(this.username).subscribe(res => {

        console.log(res);
        if (res != null && res.username != null && res.username == this.username && res.password == Md5.hashStr(this.password)){
          this.router.navigate(["/home"]);
        }
        else{
          console.log("Incorrect Username or Password");
        }
      });
    }
    else {
      console.log("Incorrect Username or Password")
    }
  }
}
