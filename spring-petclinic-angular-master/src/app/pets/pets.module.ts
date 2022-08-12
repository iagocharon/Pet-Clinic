import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PetsRoutingModule } from "./pets-routing.module";
import { PetListComponent } from "./pet-list/pet-list.component";
import { PetService } from "./pet.service";
import { VisitsModule } from "../visits/visits.module";
import { PetEditComponent } from "./pet-edit/pet-edit.component";
import { FormsModule } from "@angular/forms";
import { PetAddComponent } from "./pet-add/pet-add.component";

@NgModule({
  imports: [CommonModule, FormsModule, PetsRoutingModule, VisitsModule],
  declarations: [PetListComponent, PetEditComponent, PetAddComponent],
  exports: [PetListComponent, PetEditComponent, PetAddComponent],
  providers: [PetService],
})
export class PetsModule {}
