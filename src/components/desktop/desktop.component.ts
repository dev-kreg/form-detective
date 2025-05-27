import { ChangeDetectionStrategy, Component, ComponentRef, OnInit, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WindowService } from '../../services/window.service';
import { AppletComponent } from '../Applet/applet.component';
import { CalendarComponent } from '../Calendar/calendar.component';
import { TextEditorComponent } from '../TextEditor/TextEditor.component';
import { FileExplorerComponent } from '../FileExplorer/FileExplorer.component';

@Component({
  selector: 'app-desktop',
  imports: [CommonModule],
  templateUrl: './desktop.component.html',
  styleUrl: './desktop.component.css',
  changeDetection: ChangeDetectionStrategy.Default
})
export class DesktopComponent implements OnInit {

  commandMenuOpen = false;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private windowService: WindowService
  ) { }

  get windows() {
    return this.windowService.getWindows();
  }

  ngOnInit(): void {
    this.windowService.setViewContainerRef(this.viewContainerRef);
  }

  openCommandMenu(): void {
    this.commandMenuOpen = !this.commandMenuOpen;
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

  addTextEditor(): void {
    this.windowService.createWindow({
      title: 'Text Editor',
      component: TextEditorComponent,
    });
  }

  addFileExplorer(): void {
    this.windowService.createWindow({
      title: 'File Explorer',
      component: FileExplorerComponent,
    });
  }

  taskBarWindowClick(window: ComponentRef<AppletComponent>) {
    this.windowService.focusWindow(window);
  }
}
