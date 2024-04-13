import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-row',
  templateUrl: './table-row.component.html',
  styleUrl: './table-row.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableRowComponent {
  @Input() name = '';
  @Input() url = '';
}
