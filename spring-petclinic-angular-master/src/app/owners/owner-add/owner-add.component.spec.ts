/* tslint:disable:no-unused-variable */

import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

import { OwnerAddComponent } from "./owner-add.component";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { OwnerService } from "../owner.service";
import { RouterTestingModule } from "@angular/router/testing";
import { RouterStub } from "../../testing/router-stubs";
import { Owner } from "../owner";
import { Observable, of } from "rxjs";

class OwnserServiceStub {
  addOwner(owner: Owner): Observable<Owner> {
    return of(owner);
  }
}

describe("OwnerAddComponent", () => {
  let component: OwnerAddComponent;
  let fixture: ComponentFixture<OwnerAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OwnerAddComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [FormsModule, RouterTestingModule],
      providers: [
        { provide: OwnerService, useClass: OwnserServiceStub },
        { provide: Router, useClass: RouterStub },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create OwnerAddComponent", () => {
    expect(component).toBeTruthy();
  });
});
