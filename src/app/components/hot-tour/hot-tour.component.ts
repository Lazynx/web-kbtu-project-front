import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-hot-tour',
  standalone: true,
  imports: [NgIf],
  templateUrl: './hot-tour.component.html',
  styleUrl: './hot-tour.component.css'
})
export class HotTourComponent implements OnInit{
  hotTour: any = null;
  isAdmin: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadHotTour();
    this.checkAdmin();
  }

  checkAdmin(): void {
    const userRole = localStorage.getItem('role'); // vremenno
    this.isAdmin = userRole === 'admin';
  }

  loadHotTour(): void {
    this.http.get<any>('http://localhost:3000/hotTour').subscribe(data => {
      this.hotTour = data;
    });
  }

  updateHotTour(): void {
    if (!this.hotTour) return;

    this.http.put('http://localhost:3000/hotTour', this.hotTour).subscribe(() => {
      alert('Hot Tour updated!');
    });
  }
}
