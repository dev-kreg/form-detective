import { ChangeDetectionStrategy, Component, ComponentRef, OnInit, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WindowService } from '../../window.service';
import { AppletComponent } from '../applet/applet.component';
import { CalendarComponent } from '../calendar/calendar.component';
import { WebpageComponent } from '../webpage/webpage.component';

@Component({
  selector: 'app-desktop',
  imports: [CommonModule],
  templateUrl: './desktop.component.html',
  styleUrl: './desktop.component.css',
  changeDetection: ChangeDetectionStrategy.Default
})
export class DesktopComponent implements OnInit {
  get windows() {
    return this.windowService.getWindows();
  }

  constructor(
    private viewContainerRef: ViewContainerRef,
    private windowService: WindowService
  ) { }

  ngOnInit(): void {
    this.windowService.setViewContainerRef(this.viewContainerRef);
  }

  addWebpage(): void {
    this.windowService.createWindow({
      title: 'Web Browser',
      component: WebpageComponent,
      inputs: {
        url: 'https://www.reddit.com/'
      }
    });
  }

  addCalendar(): void {
    this.windowService.createWindow({
      title: 'Calendar',
      component: CalendarComponent,
      inputs: {
        date: new Date()
      }
    });
  }

  taskBarWindowClick(window: ComponentRef<AppletComponent>) {
    this.windowService.focusWindow(window);
  }
}
