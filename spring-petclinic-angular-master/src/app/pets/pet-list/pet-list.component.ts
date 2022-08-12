import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PetService } from "../pet.service";
import { Pet } from "../pet";

@Component({
  selector: "app-pet-list",
  templateUrl: "./pet-list.component.html",
  styleUrls: ["./pet-list.component.css"],
})
export class PetListComponent implements OnInit {
  errorMessage: string;
  @Input() pet: Pet;
  responseStatus: number;
  deleteSuccess = false;

  constructor(private router: Router, private petService: PetService) {
    this.pet = {} as Pet;
  }

  ngOnInit() {}

  editPet(pet: Pet) {
    this.router.navigate(["/pets", pet.id, "edit"]);
  }

  deletePet(pet: Pet) {
    this.petService.deletePet(pet.id.toString()).subscribe(
      (response) => {
        this.deleteSuccess = true;
        this.pet = {} as Pet;
      },
      (error) => (this.errorMessage = error as any)
    );
  }

  addVisit(pet: Pet) {
    this.router.navigate(["/pets", pet.id, "visits", "add"]);
  }

  setCharAt(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substring(0, index) + chr + str.substring(index + 1);
  }

  correctDate(date: string): string {
    let temp = date;
    temp = this.setCharAt(temp, 0, date[8]);
    temp = this.setCharAt(temp, 1, date[9]);
    temp = this.setCharAt(temp, 2, date[7]);
    temp = this.setCharAt(temp, 3, date[5]);
    temp = this.setCharAt(temp, 4, date[6]);
    temp = this.setCharAt(temp, 5, date[4]);
    temp = this.setCharAt(temp, 6, date[0]);
    temp = this.setCharAt(temp, 7, date[1]);
    temp = this.setCharAt(temp, 8, date[2]);
    temp = this.setCharAt(temp, 9, date[3]);
    return temp;
  }
}
