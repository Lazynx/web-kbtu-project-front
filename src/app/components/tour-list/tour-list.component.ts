import { Component, OnInit } from '@angular/core';
import { TourService } from '../../services/tour.service';
import { Tour } from '../../tours';
import { Router } from '@angular/router';
import { NgFor, NgIf, AsyncPipe } from '@angular/common';
import { FilterComponent } from '../filter/filter.component';

@Component({
  selector: 'app-tour-list',
  standalone: true,
  imports: [NgFor, NgIf, AsyncPipe, FilterComponent],
  templateUrl: './tour-list.component.html',
  styleUrls: ['./tour-list.component.css']
})
export class TourListComponent implements OnInit {
  tours: Tour[] = [];
  filteredTours: Tour[] = [];
  selectedStars: string = '';

  constructor(private router: Router, private tourService: TourService) {}

  ngOnInit() {
    this.tourService.getTours().subscribe(tours => {
      this.tours = tours;
      this.filteredTours = tours;
    });
  }

  applyFilter(filter: { stars: string }) {
    this.selectedStars = filter.stars;
    const starsFilter = this.selectedStars ? Number(this.selectedStars) : null;

    this.filteredTours = this.tours.filter(tour => {
      const tourStars = Number(tour.stars);
      return starsFilter === null || tourStars >= starsFilter;
    });
  }

  viewTour(id: number) {
    this.router.navigate(['/tour', id]);
  }
}
