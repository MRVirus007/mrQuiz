import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: AngularFirestore) { }

  //userList = [];
  //addUser = users => this.userList.push(users);

  form = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    pass: new FormControl(''),
    score: new FormControl('')
  })

  loginForm = new FormGroup({
    email: new FormControl(''),
    pass: new FormControl('')
  });

  createUser(data) {
    // return new Promise<any>((resolve, reject) => {
    //   this.firestore
    //     .collection("users")
    //     .add(data)
    //     .then(res => { }, err => reject(err));
    // });
    this.firestore.collection('users').add({
      name: this.form.value.name,
      email: this.form.value.email,
      pass: this.form.value.pass
    })
      .then(res => {
        console.log(res);
        this.form.reset();
      })
      .catch(e => {
        console.log(e);
      })
  }

  getUsers() {
    return this.firestore.collection("users").snapshotChanges();
  }

  updatePolicy(policy) {
    delete policy.id;
    this.firestore.doc('policies/' + policy.id).update(policy);
  }

}
