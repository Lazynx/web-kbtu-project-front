import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TourService } from '../../services/tour.service';
import { Tour } from '../../tours';
import { Observable, map } from 'rxjs';
import { NgIf, AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-tour-info',
  standalone: true,
  imports: [NgIf, AsyncPipe], 
  templateUrl: './tour-info.component.html',
  styleUrl: './tour-info.component.css'
})
export class TourInfoComponent {
  tour$: Observable<Tour | undefined>;

  constructor(private route: ActivatedRoute, private tourService: TourService) {
    const tourId = this.route.snapshot.paramMap.get('id');

    this.tour$ = this.tourService.getTours().pipe(
      map(tours => {
        console.log('Tours from service:', tours);
        const foundTour = tours.find(t => String(t.id) === String(tourId));
        console.log('Found tour:', foundTour);
        return foundTour;
      })
    );
  }
}
