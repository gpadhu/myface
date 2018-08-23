import { Routes } from '@angular/router';
import { BannersComponent } from './banners/banners.component';
import { LoginComponent } from './login/login.component';
import { AcSettingsComponent } from './ac-settings/ac-settings.component';
import { AuthGuard } from './_services/auth.guard';

export const routes: Routes = [
    { path: '', component: BannersComponent },
    { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
    { path: 'settings', component: AcSettingsComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '' }
];