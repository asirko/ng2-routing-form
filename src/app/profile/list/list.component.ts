import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ProfileService} from "../profile.service";
import {IProfile} from "../profile";

@Component({
  selector: 'rf-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  private profiles: Array<IProfile>;

  constructor(private router: Router,
              private profileService: ProfileService) { }

  ngOnInit() {
    this.profiles = this.profileService.findProfiles();
    console.log(this.profiles);
  }

  createProfile() {
    this.router.navigate(['/profile', -1]);
  }

}
