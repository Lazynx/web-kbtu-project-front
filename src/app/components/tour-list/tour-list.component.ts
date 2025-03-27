import { Component, OnInit } from '@angular/core';
import { TourService } from '../../services/tour.service';
import { Observable } from 'rxjs';
import { Tour } from '../../tours';
import { TourCardComponent } from '../tour-card/tour-card.component';
import { NgFor, NgIf, AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-tour-list',
  standalone: true,
  imports: [TourCardComponent, NgFor, NgIf, AsyncPipe],
  templateUrl: './tour-list.component.html',
  styleUrls: ['./tour-list.component.css']
})
export class TourListComponent implements OnInit {
  tours$!: Observable<Tour[]>;

  constructor(private tourService: TourService) {}

  ngOnInit(): void {
    this.tours$ = this.tourService.getTours();
  }
}
