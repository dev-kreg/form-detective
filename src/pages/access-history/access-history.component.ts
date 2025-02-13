import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-access-history',
  imports: [],
  template: `<p>access-history works!</p>`,
  styleUrl: './access-history.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccessHistoryComponent { }
