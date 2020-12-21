import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {Router, ActivatedRoute} from '@angular/router';
import {FirebaseService} from './services/firebase.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'food-app';
  uid: any;
  constructor(public fAuth: AngularFireAuth, public router: Router, public fs: FirebaseService) {
      this.fAuth.authState
        .subscribe(
          user => {
            if (user) {
              this.fs.getUserInfo();
              console.log('User Found');
              console.log(user.email);
            } else {
              console.log('No user info');
              this.router.navigate(['']);
            }
          },
          () => {
            this.router.navigate(['']);
          }
        );
    }
}
