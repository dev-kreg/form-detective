import { ChangeDetectionStrategy, Component } from '@angular/core';
import { access_lvl, AuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-welcome',
  imports: [],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeComponent { 

  user: User;
  accessLvlString: string;
  constructor(private authSvc: AuthService){
    this.user = authSvc.currentUser!;
    this.accessLvlString = access_lvl[this.user.access_lvl]
  }



}
