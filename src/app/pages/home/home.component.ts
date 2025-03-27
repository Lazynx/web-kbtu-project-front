import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FilterComponent } from '../../components/filter/filter.component';
import { TourListComponent } from '../../components/tour-list/tour-list.component';
import { TourService } from '../../services/tour.service';
import { Tour } from '../../tours';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FilterComponent, TourListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  tours: Tour[] = [];
  filteredTours: Tour[] = [];

  constructor(private tourService: TourService) {}

  ngOnInit(): void {
    this.tourService.getTours().subscribe((data: Tour[]) => {
      this.tours = data;
      this.filteredTours = data;
    });
  }

  onFilterChange(filters: any) {
    this.filteredTours = this.tours.filter(tour =>
      filters.stars ? tour.stars >= filters.stars : true
    );
  }
}
