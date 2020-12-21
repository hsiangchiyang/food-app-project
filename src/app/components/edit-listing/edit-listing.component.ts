import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-edit-listing',
  templateUrl: './edit-listing.component.html',
  styleUrls: ['./edit-listing.component.css']
})
export class EditListingComponent implements OnInit {
  id: any;
  title:any;
  city:any;
  owner:any;
  image:any;
  bedrooms:any;
  type:any;
  price:any;

  constructor(private fs: FirebaseService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.fs.getListingDetails(this.id).subscribe(listing => {
      this.title = listing.title;
      this.owner = listing.owner;
      this.city = listing.city;
      this.bedrooms = listing.bedrooms;
      this.type = listing.type;
      this.price = listing.price;
    });
  }
  onEditsubmit(){
    let listing = {
      title: this.title,
      city: this.city,
      owner: this.owner,
      type: this.type,
      bedrooms: this.bedrooms,
      price: this.price
    };
    this.fs.updateListing(this.id, listing);
    this.router.navigate(['/listings']);
  }

}
