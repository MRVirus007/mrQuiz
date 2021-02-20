import { Component, OnInit, NgZone } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
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
  userId;
  getUserName;
  constructor(public uService: UserService,
    public router: Router,
    public zone: NgZone,
    public firestore: AngularFirestore) { }


  ngOnInit() {
    this.getUsers()
  }

  onSubmit() {
    this.uService.form.value.user = this.user;
    let data = this.uService.form.value;
    this.uService.createUser(data);
    this.zone.run(() => {
      this.router.navigate(['/quiz', this.uService.form.value.email]);
    });
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

  onRegister() {
    this.login = false;
    this.register = true;
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
          this.validFields = false;
          this.zone.run(() => {
            this.router.navigate(['/quiz', this.uService.loginForm.value.email]);
          });
        }
        else {
          console.log("wrond details");
          this.validFields = true;
        }
        console.log(this.checkUser);
      }
    })
  }

}
