import { Injectable } from '@angular/core';
import {Profile} from "./profile";

@Injectable()
export class ProfileService {

  private profiles: Array<Profile> = [];
  private lastId = 0;

  constructor() { }

  findProfile(id: number) : Profile {
    return this.profiles.find((p:Profile) => p.id === id);
  }

  findProfiles() : Array<Profile> {
    return this.profiles;
  }

  createProfile(profile : Profile) : void {
    profile.id = this.lastId++;
    this.profiles.push(profile);
  }

}
