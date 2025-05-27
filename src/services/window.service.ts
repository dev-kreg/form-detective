import { Injectable, ComponentRef, ViewContainerRef, Type, createComponent, ApplicationRef, EnvironmentInjector } from '@angular/core';
import { AppletComponent } from '../components/Applet/applet.component';


export interface WindowConfig<T> {
  title: string;
  component: Type<T>;
  inputs?: Record<string, any>;
}

@Injectable({
  providedIn: 'root'
})
export class WindowService {
  private viewContainerRef?: ViewContainerRef;
  private windows: ComponentRef<AppletComponent>[] = [];

  constructor(
    private environmentInjector: EnvironmentInjector,
    private appRef: ApplicationRef
  ) { }

  setViewContainerRef(vcr: ViewContainerRef) {
    this.viewContainerRef = vcr;
  }

  getWindows() {
    return this.windows;
  }

  createWindow<T>(config: WindowConfig<T>) {
    if (!this.viewContainerRef) {
      throw new Error('ViewContainerRef not set');
    }

    // First create the content component
    const contentRef = this.viewContainerRef.createComponent(config.component);

    // Set any provided inputs on the content component
    if (config.inputs) {
      Object.entries(config.inputs).forEach(([key, value]) => {
        contentRef.setInput(key, value);
      });
    }

    // Create the applet window
    const appletRef = this.viewContainerRef.createComponent(AppletComponent, {
      projectableNodes: [[contentRef.location.nativeElement as Node]]
    });

    // Set applet properties
    appletRef.setInput('title', config.title);
    appletRef.setInput('focused', false);
    appletRef.setInput('initialX', 100 + (this.windows.length * 50));
    appletRef.setInput('initialY', 200 + (this.windows.length * 50));

    // Set up window event subscriptions
    appletRef.instance.dragged.subscribe(() => {
      this.focusWindow(appletRef);
    });

    appletRef.instance.close.subscribe(() => {
      // Clean up both components
      appletRef.destroy();
      this.closeWindow(appletRef);
    });

    this.windows.push(appletRef);
  }

  focusWindow(window: ComponentRef<AppletComponent>) {
    this.windows.forEach(w => {
      w.setInput('focused', false);
    });
    window.setInput('focused', true);
  }

  closeWindow(window: ComponentRef<AppletComponent>) {
    const index = this.windows.indexOf(window);
    if (index === -1) return;

    this.windows.splice(index, 1);
    window.destroy();
  }
}