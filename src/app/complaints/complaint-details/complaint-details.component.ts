import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComplaintService } from '../../services/complaint.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-complaint-details',
  templateUrl: './complaint-details.component.html',
  styleUrls: ['./complaint-details.component.css'],
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule]
})
export class ComplaintDetailsComponent implements OnInit {

  id!: string;

  editMode = false;
  showEditButton = false;

  complaints: any[] = [];
  selectedComplaint: any;
  originalComplaint: any;
  newComplaint: any = {};


  statuses: string[] = [];
  category: string[] = [];

  clients: any[] = [];
  selectedClient: any;

  agents: any[] = [];
  selectedAgent: any;

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
  getAgents(): void {
    this.complaintService.getAllAgents().subscribe((data: any[]) => {
      this.agents = data;
    });
  }
  getStatus(): void {
    this.complaintService.getStatuses().subscribe((data: string[]) => {
      this.statuses = data;
    });
  }

  ngOnInit(): void {

    const id = this.route.snapshot.params['id'];

    this.route.queryParams.subscribe(
      params => {
        this.editMode = params['edit_mode'] === 'true';
      }    
    );

    this.getCategory();
    this.getStatus();
    this.getClients();
    this.getAgents();

    this.complaintService.getComplaintById(id).subscribe((data: any) => {
      console.log("data : ");
      console.log(data);
      console.log(data.id);
      console.log(data.client.clientName);
      console.log(data.agent.agentName);

      this.selectedComplaint = data;
      this.originalComplaint = { ...this.selectedComplaint }; 
      this.selectedClient = data.client; 
      this.selectedAgent = data.agent; 

      console.log("selectedComplaint: ", this.selectedComplaint);
      console.log("selectedClient: ", this.selectedClient);
      console.log("selectedAgent: ", this.selectedAgent);

      
    });
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
            this.selectedClient = this.selectedComplaint.client;
            this.selectedAgent = this.selectedComplaint.agent;
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
      this.selectedComplaint.client = this.selectedClient;
      this.selectedComplaint.agent = this.selectedAgent;
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
    this.selectedClient = this.selectedComplaint.client;
    this.selectedAgent = this.selectedComplaint.agent;
    this.showEditButton = !this.showEditButton;
    this.goToComplaints();
  }

  goToComplaints(): void {
    this.router.navigate(['/complaints']);
  }
}
