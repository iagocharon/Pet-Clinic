import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Specialty } from "../specialty";
import { SpecialtyService } from "../specialty.service";

@Component({
  selector: "app-specialty-add",
  templateUrl: "./specialty-add.component.html",
  styleUrls: ["./specialty-add.component.css"],
})
export class SpecialtyAddComponent implements OnInit {
  specialty: Specialty;
  addedSuccess = false;
  errorMessage: string;
  @Output() newSpeciality = new EventEmitter<Specialty>();

  constructor(private specialtyService: SpecialtyService) {
    this.specialty = {} as Specialty;
  }

  ngOnInit() {}

  onSubmit(specialty: Specialty) {
    specialty.id = null;
    this.specialtyService.addSpecialty(specialty).subscribe(
      (newSpecialty) => {
        this.specialty = newSpecialty;
        this.addedSuccess = true;
        this.newSpeciality.emit(this.specialty);
      },
      (error) => (this.errorMessage = error as any)
    );
  }
}
