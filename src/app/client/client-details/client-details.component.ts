import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from 'express';
import { ClientsService } from '../../services/clients.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-client-details',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './client-details.component.html',
  styleUrl: './client-details.component.css'
})
export class ClientDetailsComponent implements OnInit{

  newClient: any = {};
  selectedClient: any = {};
  originalClient: any = {};
  complaints: any[] = [];
  clients: any[] = [];
  editMode = false;
  showEditButton = false;
  id:any;
  constructor(
    private route: ActivatedRoute,
    private clientService: ClientsService,
    private router: Router
  ) { }
 
  ngOnInit(): void {
    this.clientService.getAllClients().subscribe(
      (clients) => {
        this.clients = clients;
        this.route.params.subscribe(
          
          params => {
            this.id = params['id'];
            this.selectedClient = this.complaints.find(
              client => client.id === parseInt(this.id)
            ) || this.newClient;  // Fallback to newComplaint if not found
            this.originalClient = { ...this.selectedClient };
          }
        );
      }
    );
  }



  fetchClients(): void {
    this.clientService.getAllClients().subscribe({
      next: (data: any) => {
        this.clients = data;
      }
    })
  }

  toggleEdit(): void {
    this.editMode = !this.editMode;
    this.showEditButton = !this.showEditButton;
    if (!this.editMode) {
      this.originalClient = { ...this.selectedClient };
      this.clientService.save(this.selectedClient).subscribe(response => {
        this.selectedClient = response;
        console.log('Form data saved:', this.selectedClient);
        this.fetchClients()
      });
    }
  }
  onCancel(): void {
    this.editMode = false;
    this.selectedClient = { ...this.originalClient };
    this.showEditButton = !this.showEditButton;
  }

}
