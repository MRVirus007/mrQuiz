import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { AngularFirestore } from '@angular/fire/firestore';
import { reduce, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: AngularFirestore) { }
  user: any;
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
      pass: this.form.value.pass,
      score: this.form.value.score
    })
      .then(res => {
        console.log(res);
        //this.form.reset();
      })
      .catch(e => {
        console.log(e);
      })
  }

  getUsers() {
    return this.firestore.collection("users").snapshotChanges();
  }

  // updateScore(email, score) {
  //   return this.firestore.collection("users", ref => ref.where('email', '==', email))
  //     .doc(data.payload.doc.id)
  //     .set({ score: score }, { merge: true });
  // }


  updateDoc(email: string, score: number) {
    let doc = this.firestore.collection('users', ref => ref.where('email', '==', email));
    doc.snapshotChanges().subscribe((res: any) => {
      let id = res[0].payload.doc.id;
      this.firestore.collection('users').doc(id).update({ score: score });
    });
  }

}
