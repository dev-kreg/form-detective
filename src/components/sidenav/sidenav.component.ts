import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SidenavRoute } from '../../models';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  imports: [CommonModule],
  templateUrl: 'sidenav.component.html',
  styleUrl: './sidenav.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent {

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  @Input() routes: SidenavRoute[] = []

  navigate(route: string) {
    this.router.navigate([route], { relativeTo: this.activatedRoute })
  }
}
