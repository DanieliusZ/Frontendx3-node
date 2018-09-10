import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
// import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email:String;
  password:String;
  constructor(    
    private authService:AuthService,
    // private flashMessage:FlashMessagesService,
    private router:Router
  ) { }

  ngOnInit() {
  }

  onLoginSubmit(){
    const user={email:this.email, password:this.password}
    this.authService.loginUser(user).subscribe(data=>{
      console.log(data);
      if(data.success){
        this.authService.storeUserData(data.token, data.user);
        console.log('login was success');
        // this.flashMessage.show('You have logged in', {cssClass:"alert-success", timout:3500});
        this.router.navigate(['/']);
      }
      else{
        // this.flashMessage.show('Please check username and password', {cssClass:"alert-danger", timout:3500});
        console.log('login failed');
        this.router.navigate(['/login']);
      }
    });
  }
}
