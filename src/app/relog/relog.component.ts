import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-relog',
  templateUrl: './relog.component.html',
  styleUrls: ['./relog.component.css']
})
export class RelogComponent implements OnInit {
  user = [];
  register = true;
  login = false;
  validFields = false;
  checkUser;
  checkPass;
  constructor(public uService: UserService, public router: Router, public zone: NgZone) { }


  ngOnInit() {
    this.getUsers()
  }

  onSubmit() {
    this.uService.form.value.user = this.user;
    let data = this.uService.form.value;
    this.uService.createUser(data)
  }

  getUsers() {
    this.uService.getUsers().subscribe(res => {
      this.user = res;
    })
  }

  onSwitch() {
    this.login = true;
    this.register = false;
  }

  loginSub() {
    console.log("Email is: " + this.uService.loginForm.value.email);
    console.log("Password is: " + this.uService.loginForm.value.pass);
    this.uService.getUsers().subscribe(res => {
      this.user = res;
      for (let i = 0; i < Object.keys(res).length; i++) {
        this.checkUser = res[i].payload.doc.data()['email'];
        this.checkPass = res[i].payload.doc.data()['pass'];
        if (this.uService.loginForm.value.email === this.checkUser && this.uService.loginForm.value.pass === this.checkPass) {
          console.log("correct Inputs");
          this.zone.run(() => {
            this.router.navigate(['/quiz']);
          });
        }
        else {
          console.log("wrond details")
        }
        console.log(this.checkUser);
      }
    })
  }

}
