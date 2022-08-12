import { Component, OnInit } from "@angular/core";
import { OwnerService } from "../owner.service";
import { Owner } from "../owner";
import { Router } from "@angular/router";

@Component({
  selector: "app-owner-list",
  templateUrl: "./owner-list.component.html",
  styleUrls: ["./owner-list.component.css"],
})
export class OwnerListComponent implements OnInit {
  errorMessage: string;
  owners: Owner[] = [];
  ownersShown: Owner[];

  constructor(private router: Router, private ownerService: OwnerService) {}

  ngOnInit() {
    this.ownerService.getOwners().subscribe(
      (owners) => {
        this.ownersShown = owners;
      },
      (error) => (this.errorMessage = error as any)
    );
  }

  onSelect(owner: Owner) {
    this.router.navigate(["/owners", owner.id]);
  }

  addOwner() {
    this.router.navigate(["/owners/add"]);
  }

  resetShown() {
    while (this.ownersShown.length > 0) {
      this.ownersShown.pop();
    }
  }

  filterOwners(object: any) {
    let key = object.target.value;
    key = key.toLowerCase();

    if (this.owners.length < this.ownersShown.length) {
      this.ownersShown.forEach((owner) => {
        this.owners.push(owner);
      });
    }

    if (key.length == 0) {
      this.resetShown();
      this.owners.forEach((owner) => {
        this.ownersShown.push(owner);
      });
    } else if (key.match(/\b(\w+)\b/g).length == 1) {
      this.resetShown();
      this.owners.forEach((owner) => {
        if (
          (owner.firstName.toLowerCase() + " ").startsWith(key) ||
          (owner.lastName.toLowerCase() + " ").startsWith(key)
        ) {
          this.ownersShown.push(owner);
        }
      });
    } else {
      this.resetShown();
      this.owners.forEach((owner) => {
        let auxName1 =
          owner.firstName.toLowerCase() + " " + owner.lastName.toLowerCase();
        let auxName2 =
          owner.lastName.toLowerCase() + " " + owner.firstName.toLowerCase();
        if (auxName1.startsWith(key) || auxName2.startsWith(key)) {
          this.ownersShown.push(owner);
        }
      });
    }
  }
}
