import { Routes, provideRouter} from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TourInfoComponent } from './pages/tour-info/tour-info.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'tour/:id', component: TourInfoComponent },
  { path: 'contacts', component: ContactsComponent},
  { path: 'login', component: LoginComponent}
];
