/* tslint:disable:no-unused-variable */

import { async, inject, TestBed } from "@angular/core/testing";
import { VetService } from "./vet.service";
import { HttpClient } from "@angular/common/http";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";

describe("VetService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      // Import the HttpClient mocking services
      imports: [HttpClientTestingModule],
      providers: [VetService],
    });
  });

  it("should ...", async(
    inject(
      [HttpTestingController],
      (vetService: VetService, http: HttpClient) => {
        expect(vetService).toBeTruthy();
      }
    )
  ));
});
