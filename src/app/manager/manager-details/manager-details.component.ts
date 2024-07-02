import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MANAGERS_CONSTANTS } from '../../constants/manager-constants';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manager-details',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './manager-details.component.html',
  styleUrls: ['./manager-details.component.css'],
})
export class ManagerDetailsComponent {

  managers = MANAGERS_CONSTANTS;
  editMode = false;
  selectedManager: any;
  id!: string;
  showEditButton = false;
  originalManager: any;

  constructor(private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        this.editMode = params['edit_mode'] === 'true';
      }    
    );
    
    this.route.params.subscribe(
      params => {
        this.id = params['id'];
        this.selectedManager = this.managers.find(
          manager => manager.id === parseInt(this.id)
        );
        this.originalManager = { ...this.selectedManager };
      }    
    );
  }
  
  toggleEdit(): void {
    this.editMode = !this.editMode;
    this.showEditButton = !this.showEditButton;
    
    if (!this.editMode) {
      this.originalManager = { ...this.selectedManager };
      console.log('Form data saved:', this.selectedManager);
    }
  }

  onCancel(): void {
    this.editMode = false;
    this.selectedManager = { ...this.originalManager };
    this.showEditButton = !this.showEditButton;
  }
}
