import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private apiUrl = 'http://localhost:3000/auth';
    private authStatus = new BehaviorSubject<boolean>(this.hasToken());

    constructor(private http: HttpClient) {}

    login(username: string, password: string): Observable<{ token: string }> {
        return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { username, password }).pipe(
          tap(response => {
            localStorage.setItem('token', response.token);
            this.authStatus.next(true);
          })
        );
      }
    
      logout(): void {
        localStorage.removeItem('token');
        this.authStatus.next(false);
      }
    
      isAuthenticated(): Observable<boolean> {
        return this.authStatus.asObservable();
      }
    
      private hasToken(): boolean {
        return !!localStorage.getItem('token');
      }
}
