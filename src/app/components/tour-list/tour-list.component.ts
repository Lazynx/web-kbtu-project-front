import { Component, OnInit } from '@angular/core';
import { TourService } from '../../services/tour.service';
import { Tour } from '../../tours';
import { Router } from '@angular/router';
import { NgFor, NgIf, AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-tour-list',
  standalone: true,
  imports: [NgFor, NgIf, AsyncPipe],
  templateUrl: './tour-list.component.html',
  styleUrls: ['./tour-list.component.css']
})
export class TourListComponent implements OnInit {
  tours: Tour[] = [];

  constructor(private router: Router, private tourService: TourService) {}

  ngOnInit() {
    this.tourService.getTours().subscribe(tours => {
      this.tours = tours;
    });
  }

  viewTour(id: number) {
    this.router.navigate(['/tour', id]);
  }
}
