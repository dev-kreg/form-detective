import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FileService } from '../../services/file.service';
import { CommonModule } from '@angular/common';
import { DirectoryEntry } from '../../models/filesystem';
import { WindowService } from '../../services/window.service';
import { TextEditorComponent } from '../TextEditor/TextEditor.component';

@Component({
  selector: 'app-file-explorer',
  imports: [CommonModule],
  template: `
    <div class="actions">
      <button (click)="goRoot()">Home</button>
      <button (click)="createOptionsExpanded = true;">New</button>
      <div class="create-options" [ngClass]="{'expanded': createOptionsExpanded}">
        <button (click)="createOptionsExpanded = false;">Cancel</button>
        <button (click)="createItem('file')">File</button>
        <button (click)="createItem('directory')">Directory</button>
      </div>
      <button (click)="goBack()" *ngIf="currentPath.length > 0">Back</button>
    </div>
    <div class="file-explorer">
      <div class="entry" *ngFor="let item of currentDirectory!.children" (click)="openItem(item)" (contextmenu)="onRightClick($event)">
          <div class="dir-expand"><div *ngIf="item.children">></div></div>
          <div class="entry-name">{{ item.name }}</div>
          <div class="entry-modified">{{ item.modifiedAt | date: 'M/d/yy h:mma' }}</div>
      </div>
    </div>
  `,
  styleUrl: './FileExplorer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileExplorerComponent {

  @Input() currentDirectory: DirectoryEntry | null = null;
  currentPath: string[];
  createOptionsExpanded = false;


  constructor(private fileService: FileService, private windowService: WindowService) {
    this.currentPath = [];

    if (this.currentDirectory == null) {
      this.currentDirectory = this.fileService.read([]);
      this.openDirectory(this.currentDirectory!);
    }
  }


  openItem(item: DirectoryEntry): void {
    if (item.children) {
      this.openDirectory(item);
    } else {
      this.windowService.createWindow({
        title: this.currentPath.join('/') + '/' + item.name,
        component: TextEditorComponent,
        inputs: {
          content: item.content,
          openedFilePath: [...this.currentPath, item.name]
        }
      });
    }
  }

  onRightClick(event: MouseEvent) {
    // preventDefault avoids to show the visualization of the right-click menu of the browser 
    event.preventDefault();

  }

  openDirectory(directory: DirectoryEntry): void {
    if (directory.children) {
      this.currentDirectory = directory;
      this.currentPath.push(directory.name);
    }
  }

  createItem(type: 'file' | 'directory'): void {
    let name = prompt("Enter name:");
    if (name) {
      this.fileService.create(this.currentPath, name, type);
    }
    this.createOptionsExpanded = false;
  }

  goBack() {
    if (this.currentPath.length > 0) {
      this.currentPath.pop();
      this.currentDirectory = this.fileService.read(this.currentPath);
    }
  }

  goRoot() {
    this.currentPath = [];
    this.currentDirectory = this.fileService.read([]);
  }

}
