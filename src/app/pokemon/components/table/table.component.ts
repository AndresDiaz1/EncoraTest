import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PokemonBasicInfo } from '../../models/pokemon-list.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  @Input() PokemonsList: PokemonBasicInfo[] | null = [];
}
