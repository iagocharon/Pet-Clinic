/* tslint:disable:no-unused-variable */

import { async, inject, TestBed } from "@angular/core/testing";
import { SpecialtyService } from "./specialty.service";
import { HttpClient } from "@angular/common/http";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";

describe("SpecialtyService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      // Import the HttpClient mocking services
      imports: [HttpClientTestingModule],
      providers: [SpecialtyService],
    });
  });

  it("should ...", async(
    inject(
      [HttpTestingController],
      (specialtyService: SpecialtyService, http: HttpClient) => {
        expect(specialtyService).toBeTruthy();
      }
    )
  ));
});
