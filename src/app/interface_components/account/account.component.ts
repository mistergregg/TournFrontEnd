import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AccountService } from './account.service';
import { User } from 'src/app/model/user.model';
import { MatDialog } from '@angular/material';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  @ViewChild('first', { static: false }) first: ElementRef;
  @ViewChild('last', { static: false }) last: ElementRef;
  @ViewChild('username', { static: false }) username: ElementRef;
  @ViewChild('email', { static: false }) email: ElementRef;
  @ViewChild('theButton', { static: false }) theButton: ElementRef;

  user: User = new User();
  progressShow = false;
  theBools = {first: true, last: true, username: true, email: true};
  errorText = "";
  updateText = "";

  constructor(private accountService: AccountService, public dialog: MatDialog) { }

  ngOnInit() {
    this.progressShow = true;

    this.accountService.requestAccountData().subscribe(resData => {

      if (resData.username)
      {
        this.user = resData;
      }

      this.progressShow = false;
    }, error => {
      this.progressShow = false;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data: {password: this.user.password}
    });

    dialogRef.afterClosed().subscribe(result => {

      if(!result)
      {
        return;
      }

      this.progressShow = true;
      this.user.password = result;

      this.accountService.updateAccountData(this.user).subscribe(resData => {

        if (resData.id === null)
        {
          this.errorText = "Wrong Password?";
          return;
        }

        if (this.user.firstName === resData.firstName)
        {
          if (this.user.lastName === resData.lastName)
          {
            if (this.user.username === resData.username)
            {
              if (this.user.email === resData.email)
              {
                this.errorText = "";
                this.updateText = "Updated!";

                this.first.nativeElement.valueOf().className = "editable";
                this.last.nativeElement.valueOf().className = "editable";
                this.username.nativeElement.valueOf().className = "editable";
                this.email.nativeElement.valueOf().className = "editable";
              }
              else {
                this.errorText = "Email Taken!"
                this.theBools.email = false;
                this.email.nativeElement.valueOf().className = "editable2";
              }
            }
            else {
              this.errorText = "Username Taken!"
              this.theBools.username = false;
              this.username.nativeElement.valueOf().className = "editable2";
            }
          }
          else {
            this.errorText = "Last name could not be updated!"
            this.theBools.last = false;
            this.last.nativeElement.valueOf().className = "editable2";
          }
        }
        else {
          this.errorText = "First name could not be updated!"
          this.theBools.first = false;
          this.first.nativeElement.valueOf().className = "editable2";
        }
        this.progressShow = false;
      }, error => {
        this.errorText = "Error Occured";
        this.progressShow = false;
      });
    });
  }

  onFirstChange() {
    const value = this.first.nativeElement.valueOf().value;
    if (value.length > 2)
    {
      this.theBools.first = true;
      this.first.nativeElement.valueOf().className = "editable";
      this.user.firstName = value;
    } else {
      this.theBools.first = false;
      this.first.nativeElement.valueOf().className = "editable2";
    }

    this.checkBools();
  }

  onLastChange() {
    const value = this.last.nativeElement.valueOf().value;

    if (value.length > 2)
    {
      this.theBools.last = true;
      this.last.nativeElement.valueOf().className = "editable";
      this.user.lastName = value;
    } else {
      this.theBools.last = false;
      this.last.nativeElement.valueOf().className = "editable2";
    }

    this.checkBools();
  }

  onUsernameChange() {
    const value = this.username.nativeElement.valueOf().value;
    if (value.length > 2)
    {
      this.theBools.username = true;
      this.username.nativeElement.valueOf().className = "editable";
      this.user.username = value;
    } else {
      this.theBools.username = false;
      this.username.nativeElement.valueOf().className = "editable2";
    }

    this.checkBools();
  }

  onEmailChange() {
    const value = this.email.nativeElement.valueOf().value;

    var res = value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    if (res != null) {
      this.theBools.email = true;
      this.email.nativeElement.valueOf().className = "editable";
      this.user.email = value;
    } else {
      this.theBools.email = false;
      this.email.nativeElement.valueOf().className = "editable2";
    }

    this.checkBools();
  }

  checkBools() {
    this.errorText = "";
    this.updateText = "";

    if (this.theBools.first) {
      if (this.theBools.last) {
        if (this.theBools.username) {
          if (this.theBools.email) {
            // @ts-ignore
            this.theButton._disabled = false;
            return;
          }
        }
      }
    }
    // @ts-ignore
    this.theButton._disabled = true;
  }
}
