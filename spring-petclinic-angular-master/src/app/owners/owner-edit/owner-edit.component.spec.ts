/* tslint:disable:no-unused-variable */

import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

import { OwnerEditComponent } from "./owner-edit.component";
import { FormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { OwnerService } from "../owner.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ActivatedRouteStub, RouterStub } from "../../testing/router-stubs";
import { Owner } from "../owner";
import { Observable, of } from "rxjs";

class OwnserServiceStub {
  getOwnerById(): Observable<Owner> {
    return of({ id: 1, firstName: "James" } as Owner);
  }
}

describe("OwnerEditComponent", () => {
  let component: OwnerEditComponent;
  let fixture: ComponentFixture<OwnerEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OwnerEditComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      // schemas: [ NO_ERRORS_SCHEMA ],
      imports: [FormsModule, RouterTestingModule],
      providers: [
        { provide: OwnerService, useClass: OwnserServiceStub },
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create OwnerEditComponent", () => {
    expect(component).toBeTruthy();
  });
});
