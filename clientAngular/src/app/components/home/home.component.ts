import { Component, OnInit } from '@angular/core';
import {PanelService} from '../../services/panel.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  panels:Array<Object>;
  constructor(    
    private router:Router,
    private panelService:PanelService
  ) { }

  ngOnInit() {
    this.panelService.getPanels().subscribe(data=>{this.panels=data}, err=>{
      console.log(err);
      return false;
    });
  }

}
