/* tslint:disable:no-unused-variable */

import { async, inject, TestBed } from "@angular/core/testing";
import { VisitService } from "./visit.service";
import { HttpClient } from "@angular/common/http";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";

describe("VisitService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      // Import the HttpClient mocking services
      imports: [HttpClientTestingModule],
      providers: [VisitService],
    });
  });

  it("should ...", async(
    inject(
      [HttpTestingController],
      (visitService: VisitService, http: HttpClient) => {
        expect(visitService).toBeTruthy();
      }
    )
  ));
});
