import { Component, OnInit } from "@angular/core";
import { Visit } from "../visit";
import { VisitService } from "../visit.service";
import { ActivatedRoute, Router } from "@angular/router";
import { PetService } from "../../pets/pet.service";
import { Pet } from "../../pets/pet";
import { PetType } from "../../pettypes/pettype";
import { Owner } from "../../owners/owner";

import * as moment from "moment";

@Component({
  selector: "app-visit-add",
  templateUrl: "./visit-add.component.html",
  styleUrls: ["./visit-add.component.css"],
})
export class VisitAddComponent implements OnInit {
  visit: Visit;
  currentPet: Pet;
  currentOwner: Owner;
  currentPetType: PetType;
  addedSuccess = false;
  errorMessage: string;

  constructor(
    private visitService: VisitService,
    private petService: PetService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.visit = {} as Visit;
    this.currentPet = {} as Pet;
    this.currentOwner = {} as Owner;
    this.currentPetType = {} as PetType;
  }

  ngOnInit() {
    console.log(this.route.parent);
    const petId = this.route.snapshot.params.id;
    this.petService.getPetById(petId).subscribe(
      (response) => {
        this.currentPet = response;
        this.visit.pet = this.currentPet;
        this.currentPetType = this.currentPet.type;
        this.currentOwner = this.currentPet.owner;
      },
      (error) => (this.errorMessage = error as any)
    );
  }

  onSubmit(visit: Visit) {
    visit.id = null;
    const that = this;

    // format output from datepicker to short string yyyy/mm/dd format
    visit.date = moment(visit.date).format("YYYY/MM/DD");

    this.visitService.addVisit(visit).subscribe(
      (newVisit) => {
        this.visit = newVisit;
        this.addedSuccess = true;
        that.gotoOwnerDetail();
      },
      (error) => (this.errorMessage = error as any)
    );
  }

  gotoOwnerDetail() {
    this.router.navigate(["/owners", this.currentOwner.id]);
  }
}
