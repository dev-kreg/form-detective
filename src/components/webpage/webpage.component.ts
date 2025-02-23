import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-webpage',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="browser-container">
      <div class="browser-toolbar">
        <button (click)="goBack()" [disabled]="!canGoBack">&lt;</button>
        <button (click)="goForward()" [disabled]="!canGoForward">&gt;</button>
        <button (click)="refresh()">↻</button>
        <input 
          type="text" 
          [(ngModel)]="currentUrl" 
          (keyup.enter)="navigate()"
          class="url-input"
        >
      </div>
      <iframe
        #frame
        [src]="safeUrl"
        (load)="onFrameLoad()"
        class="webpage-frame"
      ></iframe>
    </div>
  `,
  styles: [`
    .browser-container {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .browser-toolbar {
      display: flex;
      gap: 8px;
      padding: 8px;
      background: #f5f5f5;
      border-bottom: 1px solid #ddd;
    }
    .url-input {
      flex-grow: 1;
      padding: 4px 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    .webpage-frame {
      flex-grow: 1;
      border: none;
      width: 100%;
    }
    button {
      padding: 4px 8px;
      background: white;
      border: 1px solid #ddd;
      border-radius: 4px;
      cursor: pointer;
    }
    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `]
})
export class WebpageComponent implements OnInit {
  @Input() set url(value: string) {
    this.currentUrl = value;
    this.navigate();
  }

  currentUrl: string = '';
  safeUrl!: SafeResourceUrl;
  canGoBack = false;
  canGoForward = false;
  history: string[] = [];
  currentIndex = -1;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    if (!this.currentUrl) {
      this.currentUrl = 'https://example.com';
      this.navigate();
    }
  }

  navigate() {
    // Ensure URL has protocol
    if (!this.currentUrl.startsWith('http')) {
      this.currentUrl = 'https://' + this.currentUrl;
    }

    // Add to history
    this.history = this.history.slice(0, this.currentIndex + 1);
    this.history.push(this.currentUrl);
    this.currentIndex = this.history.length - 1;

    // Update navigation state
    this.updateNavigationState();

    // Sanitize and set URL
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.currentUrl);
  }

  goBack() {
    if (this.canGoBack) {
      this.currentIndex--;
      this.currentUrl = this.history[this.currentIndex];
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.currentUrl);
      this.updateNavigationState();
    }
  }

  goForward() {
    if (this.canGoForward) {
      this.currentIndex++;
      this.currentUrl = this.history[this.currentIndex];
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.currentUrl);
      this.updateNavigationState();
    }
  }

  refresh() {
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.currentUrl);
  }

  onFrameLoad() {
    // Could add additional load handling here
  }

  private updateNavigationState() {
    this.canGoBack = this.currentIndex > 0;
    this.canGoForward = this.currentIndex < this.history.length - 1;
  }
}