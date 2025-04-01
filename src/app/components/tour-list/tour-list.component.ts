import { Component, OnInit } from '@angular/core';
import { TourService } from '../../services/tour.service';
import { Tour } from '../../tours';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tour-list',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './tour-list.component.html',
  styleUrls: ['./tour-list.component.css']
})
export class TourListComponent implements OnInit {
  tours: Tour[] = [];
  filteredTours: Tour[] = [];
  selectedStars: number[] = [];
  priceRange: number = 200;
  maxPrice: number = 1000;

  constructor(private router: Router, private tourService: TourService) {}

  ngOnInit() {
    this.tourService.getTours().subscribe(tours => {
      this.tours = tours;
      this.filteredTours = [...tours];
      this.maxPrice = Math.max(...tours.map(t => t.price));
    });
  }

  toggleStar(star: number) {
    const index = this.selectedStars.indexOf(star);
    if (index === -1) {
      this.selectedStars.push(star);
    } else {
      this.selectedStars.splice(index, 1);
    }
    this.filterTours();
  }

  filterTours() {
    this.filteredTours = this.tours.filter(tour => {
      const starMatch = this.selectedStars.length === 0 || 
        this.selectedStars.includes(tour.stars);
      const priceMatch = tour.price >= this.priceRange;
      return starMatch && priceMatch;
    });
  }

  viewTour(id: number) {
    this.router.navigate(['/tour', id]);
  }
}