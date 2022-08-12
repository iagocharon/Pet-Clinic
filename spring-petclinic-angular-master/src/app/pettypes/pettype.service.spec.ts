/* tslint:disable:no-unused-variable */

import { async, inject, TestBed } from "@angular/core/testing";
import { PetTypeService } from "./pettype.service";
import { HttpClient } from "@angular/common/http";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";

describe("PetTypeService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      // Import the HttpClient mocking services
      imports: [HttpClientTestingModule],
      providers: [PetTypeService],
    });
  });

  it("should ...", async(
    inject(
      [HttpTestingController],
      (petTypeService: PetTypeService, http: HttpClient) => {
        expect(petTypeService).toBeTruthy();
      }
    )
  ));
});
