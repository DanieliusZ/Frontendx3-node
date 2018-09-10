import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { AuthService} from './auth.service';
import 'rxjs/add/operator/map';
import {Router} from '@angular/router';

@Injectable()
export class PanelService {

  constructor(
    private http: Http,
    private authService: AuthService,
    private router: Router
  ) { }

  savePanel(panel){
    let headers=new Headers();
    this.authService.loadToken();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authService.authToken);
    return this.http.post('http://localhost:4000/newpanel', panel, {headers:headers}).map(res => res.json());
  }

  getPanels(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:4000/home', {headers:headers}).map(res => res.json());
  }
}
