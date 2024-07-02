import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComplaintService } from '../../services/complaint.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-complaint-details',
  templateUrl: './complaint-details.component.html',
  styleUrls: ['./complaint-details.component.css'],
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule]
})
export class ComplaintDetailsComponent implements OnInit {

  id!: string;
  complaints: any[] = [];
  editMode = false;
  showEditButton = false;
  selectedComplaint: any = {};
  originalComplaint: any = {};
  statuses: string[] = [];
  selectedStatus!: string;
  category: string[] = [];
  selectedCategory!: string;
  clients: any[] = [];

  newComplaint: any = {};


  constructor(
    private route: ActivatedRoute,
    private complaintService: ComplaintService,
    private router: Router
  ) { }

  getCategory(): void {
    this.complaintService.getCategories().subscribe((data: string[]) => {
      this.category = data;
    });
  }
  getClients(): void {
    this.complaintService.getClients().subscribe((data: any[]) => {
      this.clients = data;
    });
  }
  getStatus(): void {
    this.complaintService.getStatuses().subscribe((data: string[]) => {
      this.statuses = data;
    });
  }

  ngOnInit(): void {
    
    this.route.queryParams.subscribe(
      params => {
        this.editMode = params['edit_mode'] === 'true';
      }    
    );

    this.getCategory();
    this.getStatus();
    this.getClients();

    this.complaintService.getComplaints().subscribe(
      (complaints) => {
        this.complaints = complaints;
        this.route.params.subscribe(
          
          params => {
            this.id = params['id'];
            this.selectedComplaint = this.complaints.find(
              complaint => complaint.id === parseInt(this.id)
            );
            this.originalComplaint = { ...this.selectedComplaint };
          }
        );
      }
    );
  }

  toggleEdit(): void {
    this.editMode = !this.editMode;
    this.showEditButton = !this.showEditButton;
    if (!this.editMode) {
      this.originalComplaint = { ...this.selectedComplaint };
      this.complaintService.save(this.selectedComplaint).subscribe(response => {
        this.selectedComplaint = response;
        console.log('Form data saved:', this.selectedComplaint);
        this.goToComplaints()
      });
    }
  }

  onCancel(): void {
    this.editMode = false;
    this.selectedComplaint = { ...this.originalComplaint };
    this.showEditButton = !this.showEditButton;
    this.goToComplaints();
  }

  goToComplaints(): void {
    this.router.navigate(['/complaints']);
  }
}
