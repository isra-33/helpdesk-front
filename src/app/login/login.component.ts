import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router ,RouterModule} from '@angular/router';
import { ErrorPopupComponent } from '../error-popup/error-popup.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone:true,
  imports:[RouterModule,FormsModule,ErrorPopupComponent]
})
export class LoginComponent {
  
  public isModalOpen = false;

  email:string='';
  password:string='';
  error:boolean=false;
  
  admins=[
    {
      email:'israa.chalbii33@gmail.com',
      password:'123456789'
    },
    
    {
      email:'safa32@yahoo.com',
      password:'987654321'
    },
    
    {
      email:'ahmed@gmail.com',
      password:'ahmed88'
    },
  ]

  constructor(private router: Router) {}

  onSignIn(): void {
    const admin = this.admins.find(admin => admin.email === this.email && admin.password === this.password);
    if (admin) {
      this.router.navigate(['/home']);
    } else {
      this.error=true;
      this.openModal();
    }
  }
  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
  
}