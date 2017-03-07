import { Injectable } from '@angular/core';
import {IProfile} from "./profile";

@Injectable()
export class ProfileService {

  private profiles: Array<IProfile> = [
    {
      id: 1,
      name: 'Sirko',
      surname: 'Alexandre',
      technologies: ['Struts', 'JSF', 'Angular', 'Backbone', 'Angular 2'],
      description: 'Développeur Front-End'
    }
  ];
  private lastId = 1;

  constructor() { }

  findProfile(id: number) : IProfile {
    return this.profiles.find((p: IProfile) => p.id === id);
  }

  findProfiles() : Array<IProfile> {
    console.log(this.profiles);
    return this.profiles;
  }

  createProfile(profile : IProfile) : void {
    profile.id = this.lastId++;
    this.profiles.push(profile);
  }

}
