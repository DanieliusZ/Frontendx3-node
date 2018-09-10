import { Component, OnInit } from '@angular/core';
import { ValidateService} from '../../services/validate.service';
import { AuthService} from '../../services/auth.service';
// import { FlashMessagesService } from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email:String;
  password:String;
  constructor(
    private ValidateService:ValidateService, 
    // private flashMessage:FlashMessagesService,
    private authService:AuthService,
    private router:Router
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user={email:this.email, password:this.password}
    if(!this.ValidateService.validateRegister(user)){
      // this.flashMessage.show('Please specify all fields', {cssClass:"alert-danger", timout:3500});
      console.log('validation error');
      return false
    }
    this.authService.registerUser(user).subscribe(data=>{
      if(data.success){
        console.log('you should be redirected');
        // this.flashMessage.show('User has been registered', {cssClass:"alert-success", timout:3500});
        this.router.navigate(['/login']);
      }
      else{
        // this.flashMessage.show('There has been an error', {cssClass:"alert-danger", timout:3500});
        console.log('registration failed');
        this.router.navigate(['/register']);
      }
    });
  }
}
