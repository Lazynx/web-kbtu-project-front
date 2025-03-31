import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  stars = '';
  @Output() filterChange = new EventEmitter<{ stars: string }>();

  applyFilter() {
    this.filterChange.emit({ stars: this.stars });
  }
}
