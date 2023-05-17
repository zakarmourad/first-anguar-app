import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HousingLocationComponent } from "../housing-location/housing-location.component";
import { Housinglocation } from "../housinglocation";
import { HousingService } from "../housing.service";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule, HousingLocationComponent, RouterModule],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by city" #filtred />
        <button
          class="primary"
          type="button"
          (click)="filterList(filtred.value)"
        >
          Search
        </button>
      </form>
    </section>
    <section class="results">
      <app-housing-location
        *ngFor="let housingLocation of tmp"
        [housingLocation]="housingLocation"
      ></app-housing-location>
    </section>
  `,
  styleUrls: ["./home.component.css"],
})
export class HomeComponent {
  housingLocationList: Housinglocation[] = [];
  housingService: HousingService = inject(HousingService);
  tmp: Housinglocation[] = [];

  constructor() {
    this.housingService
      .getAllHousingLocations()
      .then((housingLocationList: Housinglocation[]) => {
        this.housingLocationList = housingLocationList;
        this.tmp = housingLocationList;
      });
  }
  filterList(value: string) {
    if (value) {
      this.tmp = this.tmp.filter((item) =>
        item?.city.toLowerCase().includes(value.toLowerCase())
      );
    } else {
      this.tmp = this.housingLocationList;
    }
  }
}
