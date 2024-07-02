import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { ModalComponent } from '../../modal/modal.component';
import { FormsModule } from '@angular/forms';
import { MANAGERS_CONSTANTS } from '../../constants/manager-constants';
import { ManagerDetailsComponent } from '../manager-details/manager-details.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-managers',
  standalone: true,
  imports: [ModalComponent, FormsModule],
  templateUrl: './managers.component.html',
  styleUrls: ['./managers.component.css'],
  providers: [ManagerDetailsComponent]
})
export class ManagersComponent {
  buttonValue:string=''
  managers = MANAGERS_CONSTANTS;
  public isModalOpen = false;

  newManager = {
    name: '',
    tel: '',
    email: '',
  };

  constructor(private router: Router,private route: ActivatedRoute) {}

  navigateTo(id: number, editMode = false) {
    this.router.navigateByUrl(`/managers/details/${id}?edit_mode=${editMode}`);
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  onSave() {
    const newId = this.managers.length > 0 ? this.managers[this.managers.length - 1].id + 1 : 1;
    const managerToAdd = { ...this.newManager, id: newId };
    this.managers.push(managerToAdd);
    console.log(`New Manager: ${JSON.stringify(managerToAdd)}`);
    this.closeModal();
  }
  onRemove(id:number){
      var indexToRemove = this.managers.findIndex(manager => manager.id === id);
      if (indexToRemove !== -1) {
          this.managers.splice(indexToRemove, 1);
          console.log(`Manager with ID ${id} removed successfully.`);
      } else {
          console.log(`Manager with ID ${id} not found.`);
      }
  }
}
