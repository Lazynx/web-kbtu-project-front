import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TourService } from '../../services/tour.service';
import { Tour } from '../../models/tour.model';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tour-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './tour-list.component.html',
  styleUrls: ['./tour-list.component.css'],
})
export class TourListComponent {
  @Input() tours: Tour[] = [];
  @Output() filterChange = new EventEmitter<Tour[]>();
  loading: boolean = true;
  selectedStars: number[] = [];
  priceRange: number = 300000; // Adjusted to ensure tours are included initially
  maxPrice: number = 5000;
  filteredTours: Tour[] = [];

  constructor(private tourService: TourService, private router: Router) {}

  ngOnInit(): void {
    this.tourService.getTours().subscribe({
      next: (tours) => {
        this.tours = tours;
        this.filteredTours = tours;
        this.loading = false;
        this.updateMaxPrice();
        this.priceRange = this.maxPrice; // Set to maxPrice to include all tours initially
        this.filterTours();
      },
      error: (err) => {
        console.error('Failed to fetch tours:', err);
        this.loading = false;
      },
    });
  }

  // Вычисляем средний рейтинг тура
  getAverageRating(tour: Tour): { display: string; stars: number } {
    if (!tour.reviews?.length) {
      return { display: 'Нет отзывов', stars: 0 };
    }
    const average = tour.reviews.reduce((sum, r) => sum + r.rating, 0) / tour.reviews.length;
    const stars = Math.floor(average);
    return { display: average.toFixed(1), stars };
  }

  // Форматируем цену для отображения
  formatPrice(price: string): string {
    return parseFloat(price).toFixed(0); // Convert to number and remove decimals
  }

  // Переключаем выбор звезд
  toggleStar(star: number): void {
    if (this.selectedStars.includes(star)) {
      this.selectedStars = this.selectedStars.filter((s) => s !== star);
    } else {
      this.selectedStars.push(star);
    }
    this.filterTours();
  }

  // Фильтруем туры
  filterTours(): void {
    this.filteredTours = this.tours.filter((tour) => {
      const averageRating = tour.reviews?.length
        ? tour.reviews.reduce((sum, r) => sum + r.rating, 0) / tour.reviews.length
        : 0;
      const matchesStars = this.selectedStars.length
        ? this.selectedStars.some((star) => Math.floor(averageRating) >= star)
        : true;
      const priceAsNumber = parseFloat(tour.price);
      const matchesPrice = priceAsNumber <= this.priceRange;
      return matchesStars && matchesPrice;
    });
    this.filterChange.emit(this.filteredTours);
  }

  // Обновляем максимальную цену на основе туров
  updateMaxPrice(): void {
    if (this.tours.length) {
      this.maxPrice = Math.max(...this.tours.map((tour) => parseFloat(tour.price)));
    }
  }

  // Переход к деталям тура
  viewTour(tourId: string): void {
    this.router.navigate(['/tour', tourId]);
  }
}