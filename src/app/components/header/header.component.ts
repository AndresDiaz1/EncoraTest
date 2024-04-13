import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input() title = '';

  constructor(private router: Router) {}

  NavigateToHome() {
    this.router.navigate(['/']);
  }
}
