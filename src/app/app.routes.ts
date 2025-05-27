
import { Routes } from '@angular/router';
import { DesktopComponent } from '../components/Desktop/desktop.component';

export const routes: Routes = [
    {
        path: 'desktop', component: DesktopComponent,
    },
    { path: '', redirectTo: '/desktop', pathMatch: 'full' }
];