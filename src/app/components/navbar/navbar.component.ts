import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user_photoURL: any;

  constructor( public fs: FirebaseService, private router: Router) { }

  ngOnInit(): void {
    var testAppUser = localStorage.getItem('my-test-app-currentUser');
    if (testAppUser){
      this.user_photoURL = JSON.parse(testAppUser)['photoURL'];
    }
  }

  login(){
    this.fs.login();
  }

  logout(){
    this.fs.logout();
    this.router.navigate(['']);
  }

  //TODO: Create new tabs layout
  tabs = [1, 2, 3, 4, 5];
  counter = this.tabs.length + 1;
  active;

  close(event: MouseEvent, toRemove: number) {
    this.tabs = this.tabs.filter(id => id !== toRemove);
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  add(event: MouseEvent) {
    this.tabs.push(this.counter++);
    event.preventDefault();
  }
}
