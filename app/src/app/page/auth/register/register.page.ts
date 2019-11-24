import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ApiServiceAxios } from 'src/app/services/apiServiceAxios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  errorMessage: string;
  
  constructor(private api: ApiService, private apiAxios : ApiServiceAxios, private router : Router ) { }
  
  ngOnInit() {
  }
  
  register(form : any) {
    const value = form.form.value;
    this.errorMessage = "";
    if (value.password !== value.confirm) {
      this.errorMessage = "password and confirm password are different";
      return;
    }
    this.api.signUp(value).then(payload =>{
      console.log(payload);
      this.router.navigateByUrl('login');
    })

  //   this.apiAxios.createAccount('users', value).then(payload => {
  //     console.log(payload);
  //     this.router.navigateByUrl('login');

  //   }).catch(err => {
  //     console.log(err)
  //   this.errorMessage = "something went wrong";
  //  })
    // this.authService.register(form.value).subscribe((res) => {
    //   this.router.navigateByUrl('home');
    // });
  }
}
