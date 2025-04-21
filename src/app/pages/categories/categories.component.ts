import { Component } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories.component.html',
})
export class CategoriesComponent {
  categories: Category[] = [];
  loading: boolean = true;

  constructor(private categoryService: CategoryService) {
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to fetch categories:', err);
        this.loading = false;
      },
    });
  }
}