import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppletComponent } from '../Applet/applet.component';
import { FileService } from '../../services/file.service';
import { WindowService } from '../../services/window.service';
import { FileExplorerComponent } from '../FileExplorer/FileExplorer.component';

@Component({
  selector: 'app-text-editor',
  imports: [FormsModule],
  template: `
      <div class="actions">
      <button (click)="save()">Save</button>
      </div>
      <div body>
        <textarea rows="10" cols="30" placeholder="Type your text here..." [(ngModel)]="content"></textarea>
      </div>
  `,
  styleUrl: './TextEditor.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextEditorComponent {

  @Input() content: string = '';
  @Input() openedFilePath: string[] = [];

  constructor(private fileService: FileService, private windowService: WindowService) { }

  save() {
    if (this.openedFilePath.length > 0) {
      this.fileService.update(this.openedFilePath, this.content);
    } else {
      this.windowService.createWindow({
        title: 'Choose a directory',
        component: FileExplorerComponent,
        inputs: {
          
        }
      });
    }
  }

}
