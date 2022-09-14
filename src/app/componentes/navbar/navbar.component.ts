import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  nombreUsuario:any;

  constructor(private _authService: AuthService,private _router:Router) { }

  ngOnInit(): void {
    this._authService.getInfoUsuarioLogueado()
    .subscribe(resp =>{
      this.nombreUsuario = resp?.email;
    });
  }

  logOut(){
    this._authService.logOut();
    this._router.navigate(['/']);
  }

}
