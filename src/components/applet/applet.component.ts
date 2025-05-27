import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-applet',
  imports: [CommonModule],
  template: `
  <span id="control-bar">
    <div style="flex-grow: 1;" (mousedown)="startDrag($event)">
        <p id="title">{{title}}</p>
    </div>
    <div>
        <button class="control-btn" id="minimize" (click)="minimized = true">_</button>
        <button class="control-btn" id="close" (click)="handleClose()">X</button>
    </div>
  </span>

  <ng-content></ng-content>
`,
  styleUrl: './applet.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppletComponent implements OnInit {
  width = 600;
  height = 200;

  @Input() initialX = 100;
  @Input() initialY = 200;
  @Input() title: string = 'New window';
  @Input() set focused(val: boolean) {
    this.self.style.zIndex = val ? '1' : '0'
    this.minimized = false;
  }
  private _minimized = false;
  @Input() set minimized(val: boolean) {
    this.self.style.display = val ? 'none' : 'block'
    this._minimized = val;
    this.minimize.emit();
    this.viewUpdate.emit();
  }
  public get minimized(): boolean {
    return this._minimized;
  }


  @Output() dragged = new EventEmitter();
  @Output() minimize = new EventEmitter();
  @Output() close = new EventEmitter();
  @Output() viewUpdate = new EventEmitter();

  self: HTMLElement;

  constructor(private ref: ElementRef<HTMLElement>, private cdRef: ChangeDetectorRef) {
    this.self = ref.nativeElement;
    this.minimized = false;
    console.log('AppletComponent initialized');
    
  }

  ngOnInit(): void {
    this.self.style.left = `${this.initialX}px`;
    this.self.style.top = `${this.initialY}px`;
  }

  startDrag(event: MouseEvent) {
    // Store the initial position of the element
    const rect = this.self.getBoundingClientRect();

    // Store the mouse position relative to the element
    this.initialX = event.clientX - rect.left;
    this.initialY = event.clientY - rect.top;

    // Bind the handlers to this instance
    const boundHandleDrag = this.handleDrag.bind(this);

    // Add event listeners
    document.addEventListener('mousemove', boundHandleDrag);
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', boundHandleDrag);
    }, { once: true });
  }

  handleDrag(event: MouseEvent) {
    // Calculate new position while maintaining the initial offset
    const newX = event.clientX - this.initialX;
    const newY = event.clientY - this.initialY;

    this.self.style.left = `${newX}px`;
    this.self.style.top = `${newY}px`;
    this.dragged.emit();
  }

  handleClose() {
    this.close.emit();
  }
}
