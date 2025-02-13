import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SidenavComponent } from "../../components/sidenav/sidenav.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [SidenavComponent, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent { 

  sidenavRoutes = [
    {name: "Access History", url: "access-history"},
    {name: "Feeds", url: "feeds"},
    {name: "Employees", url: "employees"},
    {name: "Floor Plan", url: "floor-plan"},
    {name: "Messages", url: "messages"},
  ]
}
