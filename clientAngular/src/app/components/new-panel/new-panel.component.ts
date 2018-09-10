import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {PanelService} from '../../services/panel.service';

@Component({
  selector: 'app-new-panel',
  templateUrl: './new-panel.component.html',
  styleUrls: ['./new-panel.component.css']
})
export class NewPanelComponent implements OnInit {
  Url:String;
  description:String;
  user:any;

  constructor(
    private router:Router,
    private authService:AuthService,
    private panelService:PanelService
  ) { }

  ngOnInit() {
  }

  onNewPanelSubmit(){
    this.user=JSON.parse(localStorage.getItem('user'));
    const panel={author:this.user.email, url:this.Url, description:this.description};
    console.log(panel);
    this.panelService.savePanel(panel).subscribe(data=>{
      if(data.success){
        console.log('you should be redirected');
        // this.flashMessage.show('New Panel has been created', {cssClass:"alert-success", timout:3500});
        this.router.navigate(['/']);
      }
      else{
        // this.flashMessage.show('There has been an error', {cssClass:"alert-danger", timout:3500});
        console.log('panel creation failed');
        this.router.navigate(['/newpanel']);
      }
    });
  }

}
