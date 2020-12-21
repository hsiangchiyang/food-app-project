import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
  id: any;
  listing: any;
  imageUrl: any;
  constructor(private fs: FirebaseService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.fs.getListingDetails(this.id).subscribe(listing => {
      this.listing = listing;
      console.log(listing);
      var storage = firebase.storage();
      var storageRef = storage.ref();
      storageRef.child(listing.path).getDownloadURL().then((url) => {
        this.imageUrl = url;
      }).catch((error) => {
        console.log(error);
      });
    });
  }
  onDeleteClick(){
    this.fs.deleteListing(this.id);
    this.router.navigate(['/listings']);
  }

}
