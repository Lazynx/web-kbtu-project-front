import { Component } from '@angular/core';
import { TourListComponent } from '../../components/tour-list/tour-list.component';
import { TourService } from '../../services/tour.service';
import { Tour, TourFilter } from '../../models/tour.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, TourListComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  tours: Tour[] = [];
  filteredTours: Tour[] = [];
  filters: TourFilter & { stars?: number } = {};

  constructor(private tourService: TourService) {}

  ngOnInit(): void {
    this.fetchTours(); // Fetch tours when the component initializes
  }

  onFilterChange(tours: Tour[]): void {
    this.tours = tours;
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredTours = this.tours.filter((tour) => {
      const priceAsNumber = parseFloat(tour.price); // Convert price to number
      const matchesCategory = this.filters.category_id
        ? tour.category.id === this.filters.category_id
        : true;
      const matchesMinPrice = this.filters.min_price
        ? priceAsNumber >= this.filters.min_price
        : true;
      const matchesMaxPrice = this.filters.max_price
        ? priceAsNumber <= this.filters.max_price
        : true;
      const matchesStartDate = this.filters.start_date
        ? new Date(tour.start_date) >= new Date(this.filters.start_date)
        : true;
      const matchesStars = this.filters.stars
        ? (tour.reviews?.length
            ? tour.reviews.reduce((sum, r) => sum + r.rating, 0) / tour.reviews.length >= this.filters.stars
            : false)
        : true;
      return matchesCategory && matchesMinPrice && matchesMaxPrice && matchesStartDate && matchesStars;
    });
  }

  fetchTours(): void {
    this.tourService.getTours(this.filters).subscribe({
      next: (tours) => {
        this.tours = tours;
        this.filteredTours = tours;
        this.applyFilters();
      },
      error: (err) => {
        console.error('Failed to fetch tours:', err);
      },
    });
  }
}