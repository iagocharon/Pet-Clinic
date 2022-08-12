import { Component, OnInit } from "@angular/core";
import { Vet } from "../vet";
import { VetService } from "../vet.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-vet-list",
  templateUrl: "./vet-list.component.html",
  styleUrls: ["./vet-list.component.css"],
})
export class VetListComponent implements OnInit {
  vets: Vet[] = [];
  vetsShown: Vet[];
  errorMessage: string;
  responseStatus: number;

  constructor(private vetService: VetService, private router: Router) {
    this.vets = [];
  }

  ngOnInit() {
    this.vetService.getVets().subscribe(
      (vets) => (this.vetsShown = vets),
      (error) => (this.errorMessage = error as any)
    );
  }

  deleteVet(vet: Vet) {
    this.vetService.deleteVet(vet.id.toString()).subscribe(
      (response) => {
        this.responseStatus = response;
        this.vets = this.vets.filter(
          (currentItem) => !(currentItem.id === vet.id)
        );
      },
      (error) => (this.errorMessage = error as any)
    );
  }

  gotoHome() {
    this.router.navigate(["/welcome"]);
  }

  addVet() {
    this.router.navigate(["/vets/add"]);
  }

  editVet(vet: Vet) {
    this.router.navigate(["/vets", vet.id, "edit"]);
  }

  resetShown() {
    while (this.vetsShown.length > 0) {
      this.vetsShown.pop();
    }
  }

  filterVets(object: any) {
    let key = object.target.value;
    key = key.toLowerCase();

    if (this.vets.length < this.vetsShown.length) {
      this.vetsShown.forEach((vet) => {
        this.vets.push(vet);
      });
    }

    if (key.length == 0) {
      this.resetShown();
      this.vets.forEach((vet) => {
        this.vetsShown.push(vet);
      });
    } else if (key.match(/\b(\w+)\b/g).length == 1) {
      this.resetShown();
      this.vets.forEach((vet) => {
        if (
          (vet.firstName.toLowerCase() + " ").startsWith(key) ||
          (vet.lastName.toLowerCase() + " ").startsWith(key)
        ) {
          this.vetsShown.push(vet);
        }
      });
    } else {
      this.resetShown();
      this.vets.forEach((vet) => {
        let auxName1 =
          vet.firstName.toLowerCase() + " " + vet.lastName.toLowerCase();
        let auxName2 =
          vet.lastName.toLowerCase() + " " + vet.firstName.toLowerCase();
        if (auxName1.startsWith(key) || auxName2.startsWith(key)) {
          this.vetsShown.push(vet);
        }
      });
    }
  }
}
