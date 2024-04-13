import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ExtractIdPipe } from '../../pipes/extract-id.pipe';

@Component({
  selector: 'app-table-row',
  templateUrl: './table-row.component.html',
  styleUrl: './table-row.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ExtractIdPipe],
})
export class TableRowComponent {
  @Input() name = '';
  @Input() url = '';

  constructor(private router: Router, private extractIdPipe: ExtractIdPipe) {}

  goToPokemonDetail(url: string) {
    const id = this.extractIdPipe.transform(url);
    this.router.navigate(['/pokemon', id]);
  }
}
