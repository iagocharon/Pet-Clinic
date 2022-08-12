import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { OwnersModule } from "./owners/owners.module";
import { PetsModule } from "./pets/pets.module";
import { VisitsModule } from "./visits/visits.module";
import { PetTypesModule } from "./pettypes/pettypes.module";
import { VetsModule } from "./vets/vets.module";
import { PartsModule } from "./parts/parts.module";
import { SpecialtiesModule } from "./specialties/specialties.module";
import { HttpErrorHandler } from "./error.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HeaderComponent } from "./header/header.component";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    OwnersModule,
    PetsModule,
    VisitsModule,
    PetTypesModule,
    VetsModule,
    SpecialtiesModule,
    PartsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BsDatepickerModule.forRoot(),
  ],
  providers: [HttpErrorHandler],
  bootstrap: [AppComponent],
})
export class AppModule {}
