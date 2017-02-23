import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl, AbstractControl} from "@angular/forms";

@Component({
  selector: 'rf-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  // private sub: any;
  // private profile : Profile;

  profileForm : FormGroup;

  constructor(private formBuilder: FormBuilder/*,
              private route: ActivatedRoute,
              private profileService: ProfileService*/) {

    this.profileForm = this.formBuilder.group({
      pseudo: [''],
      age: ['', [ Validators.required, Validators.pattern(/\d/), validateAge ]],
      emailGroup: this.formBuilder.group({
        email: ['', [Validators.required, Validators.pattern(/^.+@.+\..+$/)]],
        confirm: ['', [Validators.required]]
      }, { validator: validateEmails })
    });
  }

  ngOnInit() {
    // this.sub = this.route.params.subscribe(params => {
    //   const id = +params['id'];
    //   if (id !== -1) {
    //     this.profile = this.profileService.findProfile(id);
    //   }
    // });
  }

  onSubmit() {
    console.log(this.profileForm);
  }

}

function validateAge(fc: FormControl) {
  return fc.value >= 18 ? null : { mustBeOfAge: true }
}

function validateEmails(control: AbstractControl): {[key: string]: boolean} {
  return control.get('email').value === control.get('confirm').value ? null : {noMatch: true};
}
