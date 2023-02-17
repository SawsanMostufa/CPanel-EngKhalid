import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {
  myProfile: any;
  profileForm: FormGroup;
  showUpdateLoading: boolean;

  constructor(private accountService: UserService,
    private fb: FormBuilder,
    private toaster: ToastrService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    //this.getMyProfile();
    this.getMyProfileFromRoute();
    this.createForm();

  }

  getMyProfileFromRoute() {
    this.route.data.subscribe(data => {
      this.myProfile = data['myProfile'];
      console.log(this.myProfile);

      //this.setDataToForm(this.myProfile);
      // this.profileForm.controls['id'].setValue(this.myProfile.id);
      // this.profileForm.controls['email'].setValue(this.myProfile.email);
      // this.profileForm.controls['displayname'].setValue(this.myProfile.displayname);
      // this.profileForm.controls['phoneNumber'].setValue(this.myProfile.phoneNumber);
      // this.profileForm.controls['oldPassword'].setValue(this.myProfile.oldPassword);
      // this.profileForm.controls['newPassword'].setValue(this.myProfile.newPassword);
      // if(this.myProfile.address){
      //   this.profileForm.get('address').patchValue(this.myProfile.address);
      // }

    }, err => {

    }, () => {
    });


  }

  getMyProfile() {
    this.accountService.getMyProfile().subscribe((response: any) => {
      if (response) {
        console.log(response);

        this.myProfile = response;
        this.profileForm.controls['id'].setValue(response.id);
        this.profileForm.controls['email'].setValue(response.email);
        this.profileForm.controls['displayname'].setValue(response.displayname);
        this.profileForm.controls['phoneNumber'].setValue(response.phoneNumber);
        this.profileForm.controls['oldPassword'].setValue(response.oldPassword);
        this.profileForm.controls['newPassword'].setValue(response.newPassword);
        if (response.address) {
          this.profileForm.get('address').patchValue(response.address);
        }
      }
    },
      err => {
        console.log(err);
      });
  }

  createForm() {

    this.profileForm = this.fb.group({
      id: [this.myProfile.id],
      email: [this.myProfile.email, [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$')]],
      displayname: [this.myProfile.displayname, [Validators.required]],
      phoneNumber: [this.myProfile.phoneNumber, [Validators.required]],
      oldPassword: [this.myProfile.oldPassword],
      newPassword: [this.myProfile.newPassword],
      address: this.fb.group({
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        street: [null, Validators.required],
        city: [null, Validators.required],
        state: [null, Validators.required],
        zipCode: [null, Validators.required]
      })
    });

    if (this.myProfile) {
      this.profileForm.get('address').patchValue(this.myProfile.address);
    }
  }

  //Udpdate my profile
  onSubmit(user: any) {
    this.showUpdateLoading = true;
    console.log(user);

    this.accountService.updateMyProfile(user).subscribe(() => {
      setTimeout(() => {
        this.toaster.success("Updated successfully");
        this.showUpdateLoading = false;
      }, 50);
    },
      err => {
        setTimeout(() => {
          console.log(err);
          this.showUpdateLoading = false;
          this.toaster.error("Error in updated profile");
        }, 50);

      });
  }

  cancel() {
    this.router.navigate(['/categories']);
  }

}
