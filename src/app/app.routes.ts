
import { ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { LoginComponent } from '../pages/login/login.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { AccessHistoryComponent } from '../pages/access-history/access-history.component';
import { WelcomeComponent } from '../pages/welcome/welcome.component';
import { AuthGuard } from '../services/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    {
        path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard],
        children: [
            { path: '', component: WelcomeComponent },
            { path: 'access-history', component: AccessHistoryComponent },
        ]
    },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];