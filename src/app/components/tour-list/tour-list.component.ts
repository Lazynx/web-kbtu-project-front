// tour-list.component.ts
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
  tours: Tour[] = [{
    id: 1,
    name: 'ARALIYA BEACH RESORT',
    image: 'assets/1.png',
    price: 520,
    stars: 5,
    location: 'Sri-Lanka',
    description: 'A beautiful beach resort with scenic views and top-class amenities.'
  },
  {
    id: 2,
    name: 'PARALIA BEACH PHU QUOC',
    image: 'assets/2.png',
    price: 344,
    stars: 4,
    location: 'Phu Quoc',
    description: 'A tropical paradise with crystal-clear water and relaxing atmosphere.'
  },
  {
    id: 3,
    name: 'GRAND BELLA HOTEL',
    image: 'assets/3.png',
    price: 344,
    stars: 4,
    location: 'Thailand',
    description: 'A cozy and comfortable stay near the best attractions in Thailand.'
  },
  {
    id: 4,
    name: 'FORTUNE HOTEL DEIRA',
    image: 'assets/4.png',
    price: 350,
    stars: 3,
    location: 'Dubai',
    description: 'An affordable yet luxurious stay in the heart of Dubai.'
  },
  {
    id: 5,
    name: 'SANDS DOWNTOWN HOTEL',
    image: 'assets/5.png',
    price: 509,
    stars: 4,
    location: 'Antalia',
    description: 'Experience the best of Antalya with modern amenities and comfort.'
  },
  {
    id: 6,
    name: 'ISTANBUL GRAND HOTEL',
    image: 'assets/6.png',
    price: 344,
    stars: 4,
    location: 'Istanbul',
    description: 'A charming hotel with historical surroundings and excellent service.'
  },
  {
    id: 7,
    name: 'OCEAN VIEW PARADISE',
    image: 'assets/7.png',
    price: 420,
    stars: 5,
    location: 'Maldives',
    description: 'Luxury villas with a private beach and breathtaking ocean views.'
  },
  {
    id: 8,
    name: 'HORIZON SKY HOTEL',
    image: 'assets/8.png',
    price: 290,
    stars: 3,
    location: 'Greece',
    description: 'A budget-friendly stay with a fantastic sea view and great service.'
  },
  {
    id: 9,
    name: 'TROPICAL BREEZE RESORT',
    image: 'assets/9.png',
    price: 380,
    stars: 4,
    location: 'Bali',
    description: 'An exotic resort surrounded by lush greenery and sandy beaches.'
  },
  {
    id: 10,
    name: 'CITY LIGHTS HOTEL',
    image: 'assets/10.png',
    price: 310,
    stars: 3,
    location: 'New York',
    description: 'A comfortable city hotel in the heart of Manhattan.'
  },
  {
    id: 11,
    name: 'ROYAL PALACE HOTEL',
    image: 'assets/11.png',
    price: 590,
    stars: 5,
    location: 'Paris',
    description: 'An elegant luxury hotel near the Eiffel Tower with world-class service.'
  },
  {
    id: 12,
    name: 'DESERT MIRAGE RESORT',
    image: 'assets/12.png',
    price: 275,
    stars: 3,
    location: 'Marrakech',
    description: 'An oasis in the desert with traditional Moroccan charm.'
  },
  {
    id: 13,
    name: 'ALPINE RETREAT HOTEL',
    image: 'assets/13.png',
    price: 410,
    stars: 4,
    location: 'Switzerland',
    description: 'A cozy mountain retreat with stunning views of the Alps.'
  },
  {
    id: 14,
    name: 'PACIFIC WAVES HOTEL',
    image: 'assets/14.png',
    price: 350,
    stars: 4,
    location: 'Hawaii',
    description: 'A beachfront hotel with direct access to the waves and surf spots.'
  },
  {
    id: 15,
    name: 'SAND DUNES LUXURY RESORT',
    image: 'assets/15.png',
    price: 600,
    stars: 5,
    location: 'Dubai',
    description: 'An exclusive desert resort with world-class luxury and comfort.'
  },
  {
    id: 16,
    name: 'NORTHERN LIGHTS HOTEL',
    image: 'assets/16.png',
    price: 375,
    stars: 4,
    location: 'Norway',
    description: 'A unique hotel where you can witness the breathtaking aurora borealis.'
  },
  {
    id: 17,
    name: 'JUNGLE ESCAPE LODGE',
    image: 'assets/17.png',
    price: 260,
    stars: 3,
    location: 'Costa Rica',
    description: 'A nature-lover’s paradise surrounded by rainforests and wildlife.'
  },
  {
    id: 18,
    name: 'SUNSET BAY HOTEL',
    image: 'assets/18.png',
    price: 335,
    stars: 4,
    location: 'California',
    description: 'A coastal retreat with mesmerizing sunset views over the bay.'
  },
  {
    id: 19,
    name: 'GRAND HORIZON HOTEL',
    image: 'assets/19.png',
    price: 480,
    stars: 5,
    location: 'Tokyo',
    description: 'A high-rise luxury hotel in the heart of Tokyo with panoramic city views.'
  }];
  filteredTours: Tour[] = [];
  selectedStars: number[] = [];
  priceRange: number = 0;
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