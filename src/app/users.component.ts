import { Component } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { Router } from '@angular/router';

interface User{
  name: string;
  email: string;
}
@Component({
    selector: 'users',
    templateUrl: './users.component.html'  
  })
export class UsersComponent {

  usersCol: AngularFirestoreCollection<User>;  
  users: any;

  constructor(private afs: AngularFirestore, private _router: Router){
    
  }

  ngOnInit(){
    this.usersCol = this.afs.collection('users');            
    this.users = this.usersCol.snapshotChanges()
      .pipe(
          map(actions => {
              return actions.map( a => {
                  const data = a.payload.doc.data() as User;
                  const id = a.payload.doc.id;
                  return { id, data};
              });
          })
       );   
  }
  
 

  add(){
    this._router.navigate(['add']);
  }  

  delete(userId,name){  
    if (confirm("Are you sure you want to delete " + name + "?")){      
        this.afs.doc('users/'+userId).delete();  
    }                  
  }  

}

