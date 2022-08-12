import { RouterModule, Routes } from "@angular/router";
import { PetListComponent } from "./pet-list/pet-list.component";
import { NgModule } from "@angular/core";
import { VisitAddComponent } from "../visits/visit-add/visit-add.component";
import { PetEditComponent } from "./pet-edit/pet-edit.component";
import { PetAddComponent } from "./pet-add/pet-add.component";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";

const petRoutes: Routes = [
  { path: "pets", component: PetListComponent },
  { path: "pets/add", component: PetAddComponent },
  {
    path: "pets/:id",
    children: [
      {
        path: "edit",
        component: PetEditComponent,
      },
      {
        path: "visits/add",
        component: VisitAddComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(petRoutes)],
  exports: [RouterModule, BsDatepickerModule],
})
export class PetsRoutingModule {}
