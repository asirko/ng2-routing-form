import {Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormControlName, FormArray } from "@angular/forms";
import {IProfile} from "../profile";
import {Subscription, Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {ProfileService} from "../profile.service";

@Component({
  selector: 'rf-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, {read: ElementRef}) formInputElements: ElementRef[];

  profileForm: FormGroup;
  profile: IProfile;
  private sub: Subscription;
  displayMessage: {[key: string]: string} = {};
  private validationMessages: {[key: string]: {[key: string]: string}};

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private profileService: ProfileService) {

    this.validationMessages = {
      name: {
        required: 'Le nom est obligatoire.',
        minlength: 'Un nom doit faire au moins 3 caractères.',
        maxlength: 'Un nom doit faire au plus 50 caractères.'
      },
      surname: {
        required: 'Le prénom est obligatoire.',
        minlength: 'Un prénom doit faire au moins 3 caractères.',
        maxlength: 'Un prénom doit faire au plus 50 caractères.'
      },
      technologies: {
        required: 'Toutes les lignes de technologies doivent être renseignées.',
        forbiddenTechnologies: 'Le VBA n\'est pas une technologie.'
      }
    };
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      surname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      technologies: this.fb.array([], this.validateTechnologies),
      description: ''
    });

    // Read the product Id from the route parameter
    this.sub = this.route.params.subscribe(
      params => {
        let id = +params['id'];
        if (id > 0) {
          this.getProfile(id);
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur event observable with the valueChanges observable
    Observable
      .merge(this.profileForm.valueChanges, ...controlBlurs)
      .debounceTime(500)
      .subscribe(() => {
        this.displayMessage = this.processMessages(this.profileForm);
      });
  }

  addTechnologie(): void {
    this.technologies.push(new FormControl());
  }

  get technologies(): FormArray {
    return <FormArray>this.profileForm.get('technologies');
  }

  getProfile(id: number): void {
    const profile = this.profileService.findProfile(id);

    if (this.profileForm) {
      this.profileForm.reset();
    }
    this.profile = profile;

    // Update the data on the form
    this.profileForm.patchValue({
      name: this.profile.name,
      surname: this.profile.surname,
      description: this.profile.description
    });
    this.profileForm.setControl('technologies', this.fb.array(this.profile.technologies || []));
  }

  processMessages(container: FormGroup): { [key: string]: string } {
    let messages = {};
    for (let controlKey in container.controls) {
      if (container.controls.hasOwnProperty(controlKey)) {
        let c = container.controls[controlKey];
        // If it is a FormGroup, process its child controls.
        if (c instanceof FormGroup) {
          let childMessages = this.processMessages(c);
          Object.assign(messages, childMessages);
        } else {
          // Only validate if there are validation messages for the control
          if (this.validationMessages[controlKey]) {
            messages[controlKey] = '';
            if ((c.dirty || c.touched) && c.errors) {
              Object.keys(c.errors).map(messageKey => {
                if (this.validationMessages[controlKey][messageKey]) {
                  messages[controlKey] += this.validationMessages[controlKey][messageKey] + ' ';
                }
              });
            }
          }
        }
      }
    }
    return messages;
  }

  validateTechnologies(formArray : FormArray) {
    return formArray.controls
      .reduce((accu, formControl: FormControl) => {
        if (!formControl.value) {
          accu.required = true;
        }
        if (formControl.value === 'VBA') {
          accu.forbiddenTechnologies = true;
        }
        return accu;
      }, {});
  }
}
