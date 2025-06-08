import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HousingDataService {

  testFile = 'geojsons/lgaNswApprovals.geojson'

  constructor() { }

  async getLowestTen(testFile:string, field:string) {

    const response = await fetch(testFile);
    const data = await response.json();

    const validFeatures = data.features.filter((feature: any) => {
      if (feature.properties.hasOwnProperty(field) && (typeof feature.properties[field] === 'number') ) {
        // console.log('Field exists!');
        // console.log(feature.properties);
        return feature.properties
      }
    });

    // Sort by the numeric field
    console.log("valid features: ", validFeatures);
    validFeatures.sort((a: any, b: any) => {
      return a.properties[field] - b.properties[field];
    });

    // console.log(validFeatures);
    const lowestTen = validFeatures.slice(0, 10);

    // Return just the properties
    // console.log(lowestTen);
    return lowestTen.map((feature: any) => feature.properties);


  }

  getInternalMigration() {
    return fetch('/showcases/housing/net_migration_cities.json')
    .then(res => res.json())
    .then(data => data);

  }
}
