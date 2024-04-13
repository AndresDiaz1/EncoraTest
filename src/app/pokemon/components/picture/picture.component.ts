import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrl: './picture.component.scss',
})
export class PictureComponent {
  @Input() imageSrc: string | undefined = '123';
}
