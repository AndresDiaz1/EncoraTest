import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PokemonType } from '../../models/pokemon-list.model';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrl: './description.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DescriptionComponent {
  @Input() name: string | undefined = '';
  @Input() weight: number | undefined;
  @Input() height: number | undefined;
  @Input() types: PokemonType[] | undefined = [];
}
