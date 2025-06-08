import { Component, inject } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { HousingDataService } from './utils/housing-data.service';
import { PieChartComponent } from "./pie-chart/pie-chart.component";
import { BarChartComponent } from "./bar-chart/bar-chart.component";
import { MapLegendComponent } from "./map-legend/map-legend.component";
import { OtherBarChartComponent } from "./other-bar-chart/other-bar-chart.component";

@Component({
  selector: 'app-housing-showcase',
  imports: [PieChartComponent, BarChartComponent, MapLegendComponent, OtherBarChartComponent],
  templateUrl: './housing-showcase.component.html',
  styleUrl: './housing-showcase.component.scss'
})
export class HousingShowcaseComponent {
  svcHousingData = inject(HousingDataService)

  // public http = inject(HttpClient);

  // mapshaper.org for gesjson conversion

  accessToken = environment.mapboxToken;

  homeCoords: mapboxgl.LngLatLike = [151.098, -33.8725];
  homeZoom = 11;
  sydCoords = [150.998, -33.8625];
  sydZoom = 10;

  ausCoords: mapboxgl.LngLatLike = [133.7751, -28.7744];
  ausZoom = 4;

  kurCoords : mapboxgl.LngLatLike = [151.139, -33.741];
  kurCoordsOffset : mapboxgl.LngLatLike = [151.122, -33.741];
  kurZoom = 12.2;

  zoningTransitionZoom = 12;

  lowestApprovalLgas = []

  internalMigrationTotal = []
  sydneyInternalMigration: {
    name: string;
    value: any;
  }[] = []

  stateShorthandDict: { [key: string]: string } = {
    "New South Wales": "NSW",
    "Victoria": "VIC",
    "Queensland": "QLD",
    "Western Australia": "WA",
    "South Australia": "SA",
    "Tasmania": "TAS",
    "Northern Territory": "NT",
    "Australian Capital Territory": "ACT"
  }

  stateHousingApprovals: {[key:string]: string} = {
    "NSW": "42,531",
    "VIC": "51,816",
    "QLD": "32,923",
    "WA": "17,375",
    "SA": "11,309",
    "TAS": "2,570",
    "NT": "436",
    "ACT": "4,547"
  }

  lgaHousingApprovals: {[key:string]: string} = {
    "New South Wales": "42531",
    "Albury": "360",
    "Armidale Regional": "197",
    "Ballina": "301",
    "Balranald": "5",
    "Bathurst Regional": "98",
    "Bayside (NSW)": "1318",
    "Bega Valley": "199",
    "Bellingen": "78",
    "Berrigan": "38",
    "Blacktown": "2391",
    "Bland": "19",
    "Blayney": "41",
    "Blue Mountains": "156",
    "Bogan": "3",
    "Bourke": "0",
    "Brewarrina": "0",
    "Broken Hill": "3",
    "Burwood": "229",
    "Byron": "173",
    "Cabonne": "35",
    "Camden": "1153",
    "Campbelltown (NSW)": "885",
    "Canada Bay": "329",
    "Canterbury-Bankstown": "1391",
    "Carrathool": "1",
    "Central Coast (NSW)": "1194",
    "Central Darling": "4",
    "Cessnock": "899",
    "Clarence Valley": "411",
    "Cobar": "10",
    "Coffs Harbour": "207",
    "Coolamon": "16",
    "Coonamble": "5",
    "Cootamundra-Gundagai Regional": "13",
    "Cowra": "32",
    "Cumberland": "883",
    "Dubbo Regional": "334",
    "Dungog": "57",
    "Edward River": "13",
    "Eurobodalla": "189",
    "Fairfield": "763",
    "Federation": "30",
    "Forbes": "29",
    "Georges River": "339",
    "Gilgandra": "6",
    "Glen Innes Severn": "11",
    "Goulburn Mulwaree": "101",
    "Greater Hume Shire": "40",
    "Griffith": "221",
    "Gunnedah": "19",
    "Gwydir": "2",
    "Hawkesbury": "508",
    "Hay": "6",
    "Hilltops": "67",
    "Hornsby": "240",
    "Hunters Hill": "24",
    "Inner West": "335",
    "Inverell": "40",
    "Junee": "15",
    "Kempsey": "211",
    "Kiama": "70",
    "Ku-ring-gai": "379",
    "Kyogle": "28",
    "Lachlan": "9",
    "Lake Macquarie": "1275",
    "Lane Cove": "701",
    "Leeton": "17",
    "Lismore": "88",
    "Lithgow": "40",
    "Liverpool": "1914",
    "Liverpool Plains": "15",
    "Lockhart": "10",
    "Maitland": "1123",
    "Mid-Coast": "620",
    "Mid-Western Regional": "193",
    "Moree Plains": "5",
    "Mosman": "103",
    "Murray River": "137",
    "Murrumbidgee": "5",
    "Muswellbrook": "36",
    "Nambucca Valley": "141",
    "Narrabri": "16",
    "Narrandera": "10",
    "Narromine": "11",
    "Newcastle": "1530",
    "North Sydney": "140",
    "Northern Beaches": "865",
    "Oberon": "27",
    "Orange": "163",
    "Parkes": "41",
    "Parramatta": "2026",
    "Penrith": "854",
    "Port Macquarie-Hastings": "555",
    "Port Stephens": "307",
    "Queanbeyan-Palerang Regional": "600",
    "Randwick": "505",
    "Richmond Valley": "77",
    "Ryde": "1153",
    "Shellharbour": "659",
    "Shoalhaven": "640",
    "Singleton": "58",
    "Snowy Monaro Regional": "123",
    "Snowy Valleys": "52",
    "Strathfield": "219",
    "Sutherland Shire": "1268",
    "Sydney": "690",
    "Tamworth Regional": "294",
    "Temora": "32",
    "Tenterfield": "26",
    "The Hills Shire": "2516",
    "Tweed": "213",
    "Upper Hunter Shire": "31",
    "Upper Lachlan Shire": "44",
    "Uralla": "16",
    "Wagga Wagga": "264",
    "Walcha": "8",
    "Walgett": "0",
    "Warren": "0",
    "Warrumbungle Shire": "12",
    "Waverley": "375",
    "Weddin": "4",
    "Wentworth": "25",
    "Willoughby": "174",
    "Wingecarribee": "286",
    "Wollondilly": "883",
    "Wollongong": "900",
    "Woollahra": "149",
    "Yass Valley": "103",
    "Unincorporated NSW": "1",
    "Migratory - Offshore - Shipping (NSW)": "0"
}

  map: mapboxgl.Map | undefined;

  performingCouncilsLoaded = false
  internalMigrationLoaded = false

  flySydneyComplete = false
  flyAusComplete = true

  pageNum = 1
  maxPageNum = 7

  displayLowestLgas = false
  displaySydneyOutflows = false


  lgaApprovalsLegend = [
    { color: '#d7191c', label: '0%' },
    { color: '#edaa76', label: '50%' },
    { color: '#d1eaa6', label: '100%' },
    { color: '#1a9641', label: '150%' }
  ]

  popDensLegend = [
    { color: '#ffffff', label: '0' },
    { color: '#fcffa4', label: '2000' },
    { color: '#fdae61', label: '4000' },
    { color: '#f1605d', label: '6000' },
    { color: '#dd513a', label: '8000' },
    { color: '#c03a3a', label: '10000' },
    { color: '#a12857', label: '12000' },
    { color: '#932667', label: '14000' },
    { color: '#6b1e7e', label: '16000' },
    { color: '#420a68', label: '18000' },
    { color: '#000004', label: '20000' },
  ]

  popDensChangeLegend = [
    { color: '#b2182b', label: '-3000' },
    { color: '#d6604d', label: '-2400' },
    { color: '#ef8a62', label: '-1800' },
    { color: '#f4a582', label: '-1200' },
    { color: '#fddbc7', label: '-600' },
    { color: '#ffffff', label: '0' },
    { color: '#d9f0d3', label: '600' },
    { color: '#a6dba0', label: '1200' },
    { color: '#5aae61', label: '1800' },
    { color: '#1b7837', label: '2400' },
    { color: '#00441b', label: '3000' }
  ]

  zoningLegend = [
    { color: '#FFA6A3', label: 'R2' },
    { color: '#F3DBFF', label: 'R1' },
    { color: '#FF776E', label: 'R3' },
    { color: '#FF483B', label: 'R4' },
    { color: '#62F0F5', label: 'E1' },
  ]


  ngOnInit(): void {

    this.svcHousingData.getLowestTen('geojsons/lgaNswApprovals.geojson', 'proportion')
    .then(lowestTenPerformers => {
      const lgaWorstApprovals = lowestTenPerformers.map((properties: { [x: string]: any; }) => {
        return {
          'name': properties["LGA_NAME24"],
          'value': properties["percent"]
        }
      })
      this.lowestApprovalLgas = lgaWorstApprovals;
      console.log("lowest 10", this.lowestApprovalLgas);
      this.performingCouncilsLoaded = true
      console.log(this.performingCouncilsLoaded);
    });


    this.svcHousingData.getInternalMigration()
    .then(internalMigration => // console.log("internal mig", internalMigration['Greater Sydney'].map(d => d))
      {

        const intMigTotals =  Object.entries(internalMigration['Greater Sydney'])
          .map(([destinationName, destinationValues]) => {
            return {
              name: destinationName,
              value: (destinationValues as any).hasOwnProperty("Total") ? (destinationValues as any)["Total"] : (destinationValues as any)
            }
          })

          this.internalMigrationLoaded = true;

        this.sydneyInternalMigration = intMigTotals;
        console.log("int mig totals", intMigTotals);
    }
  )

    // const worstPerformers: {"name":string, "value": string} = lowestTenPerformers.map(properties => {
    
    // });
    // this.http.get("lgaData.json").subscribe(
    //   data => console.log(data)
    // )
    
    // carbon design link: https://carbondesignsystem.com/data-visualization/spatial-charts/
    this.map = new mapboxgl.Map({
      accessToken: this.accessToken,
      container: 'map',
      // style: 'mapbox://styles/mapbox/streets-v11', 
      // style: 'mapbox://styles/mapbox/light-v11',
      style: 'mapbox://styles/carbondesignsystem/ck7c8cfpp08h61irrudv7f1xg',
      center: this.ausCoords, 
      zoom: this.ausZoom
    });

    this.map.on('load', () => {


      // zoning layer
      fetch('geojsons/Kuringgai_zoning.geojson')
      .then(response => response.json())
      .then(data => {

        this.map?.addSource('kur-zoning-source', {
            type: 'geojson',
            data: data
        });

        this.map?.addLayer({
          id: 'kur-zoning-layer',
          type: 'fill',
          source: 'kur-zoning-source',
          paint: {
            'fill-color': [
              'match',
              ['get', 'SYM_CODE'],
              'R2', '#FFA6A3', // '#FFD9D9',
              'R1', '#F3DBFF',   // Light purple
              'R3', '#FF776E',   // Mid red
              'R4', '#FF483B', // bright red
              'E1', '#62F0F5',//'#959DC2',//'#00C2ED', // '#95BFCC', //'#62F0F5', //'#BAD6DE',
              '#CCCCCC'          // Default color if no match
            ],
            'fill-opacity': 0.5,
          },
          layout: {visibility: 'none'},
        });
        this.map?.addLayer({
          id: 'kur-zoning-outline',
          type: 'line',
          source: 'kur-zoning-source',
          paint: {
            'line-color': '#333333',  // Outline color (dark gray)
            'line-width': 0.5,
            'line-opacity': 0.5,
          },
          layout: {visibility: 'none'},
        });
      });
      // this.map?.addSource('zoning-raster-source', {
      //   type: 'raster',
      //   tiles: [
      //     'https://mapprod1.environment.nsw.gov.au/arcgis/rest/services/Planning/EPI_Primary_Planning_Layers/MapServer/export?bbox={bbox-epsg-3857}&bboxSR=102100&imageSR=102100&size=1024,1024&dpi=192&format=png32&transparent=false&layers=show%3A2&f=image'
      //   ],
      //   tileSize: 512
      // });
      
      // this.map?.addLayer({
      //   id: 'zoning-raster-layer',
      //   type: 'raster',
      //   source: 'zoning-raster-source',
      //   paint: {
      //     'raster-opacity': 0.55
      //   },
      //   minzoom: this.zoningTransitionZoom,
      //   layout: {visibility: 'none'},
      // });

//       this.map?.addSource('planning-zones', {
//         type: 'geojson',
//         data: `https://mapprod3.environment.nsw.gov.au/arcgis/services/Planning/EPI_Primary_Planning_Layers/MapServer/WFSServer?service=WFS
// &version=2.0.0
// &request=GetFeature
// &typeNames=Planning_EPI_Primary_Planning_Layers:Land_Zoning
// &outputFormat=geojson
// &srsName=EPSG:4326`
//       });
    
//       this.map?.addLayer({
//         id: 'planning-zones-fill',
//         type: 'fill',
//         source: 'planning-zones',
//         paint: {
//           'fill-color': '#088',
//           'fill-opacity': 0.4
//         }
//       });

      // state centres data
      fetch('geojsons/StateCentres.geojson')
      .then(response => response.json())
      .then(data => {

      this.map?.addSource('states-points', {
          type: 'geojson',
          data: data
      });

      this.map?.addLayer({
          'id': 'states-points-layer',
          'type': 'circle',
          'source': 'states-points',
          'paint': {
              'circle-radius': 4,
              'circle-stroke-width': 2,
              'circle-color': 'red',
              'circle-stroke-color': 'white'
          }
      });

      
        data.features.forEach((feature: { geometry: { coordinates: mapboxgl.LngLatLike; }; properties: { name: any, color: any}; }) => {
          const fullStateName = feature.properties.name;
          const stateShorthand = this.stateShorthandDict[fullStateName] || fullStateName;
          const totalApprovals = this.stateHousingApprovals[stateShorthand];
          if (this.map) {
            new mapboxgl.Popup({ offset: 25, closeButton: false, closeOnClick: false, })
              .setLngLat(feature.geometry.coordinates)
              .setHTML(`<div class="text-bold">
                ${stateShorthand}
                  <div>
                    <b>${totalApprovals}</b> Dwellings Approved (FY2023-24)
                  </div>
                </div>`)
              .addTo(this.map);
          }
        });

  
    });

          // Kuringgai LGA Layer
      fetch('geojsons/Kur_LGA.geojson')
      .then(response => response.json())
      .then(data => {
        this.map?.addSource('kur-lga-source', {
          type: 'geojson',
          data: data
        });
  
        this.map?.addLayer({
          id: 'kur-lga-outline-layer',
          type: 'line',
          source: 'kur-lga-source',
          paint: {
            'line-color': '#000000',// '#014e51', //
            'line-width': 2,
            'line-opacity': 0.5
          },
          layout: {visibility: 'none'}
        });
      });


      // LGA GeoJSON layer
      fetch('geojsons/lgaNswApprovals.geojson')
      .then(response => response.json())
      .then(data => {
        data.features.forEach((feature: any) => {
          if (feature.properties.name) {
            feature.properties.color = "#00ff00";
          }
          // console.log(feature.properties);
        }
        );
        this.map?.addSource('my-shape2', {
          type: 'geojson',
          data: data
        });
  
        this.map?.addLayer({
          id: 'my-shape-layer',
          type: 'fill', // or 'line' or 'circle' depending on your data
          source: 'my-shape2',
          paint: {
            'fill-color': [
              'interpolate',
              ['linear'],
              ['get', 'proportion'],
              0.0, '#d7191c',  // red (low)
              0.9, '#ffffbf',  // neutral
              1.4, '#1a9641'   // green (high)
              // 0.0, '#440154', // viridis
              // 0.5, '#31688e',
              // 1.0, '#35b779',
              // 1.5, '#fde725'
            ],
            'fill-opacity': 0.5
          },
          maxzoom: this.zoningTransitionZoom
        });
      });


      // MB layer Sydney
      /////
      this.map?.addSource('MB21-syd-source', {
        type: 'vector',
        url: 'mapbox://glennj258.dmdp8dqz', // Replace this
      });
  
      this.map?.addLayer({
        id: 'MB21-syd-layer',
        type: 'fill', // or 'line', 'circle' depending on your data
        source: 'MB21-syd-source',
        'source-layer': 'MB21_Syd_Pop_test-cd9wzq', // Very important
        paint: this.getMbPaint("popdens") as any
      });
      ////

      // // MB layer Kuringai
      // /////
      // this.map?.addSource('MB16-kur-source', {
      //   type: 'vector',
      //   url: 'mapbox://glennj258.2x1ktjyx', // Replace this
      // });
  
      // this.map?.addLayer({
      //   id: 'MB16-kur-layer',
      //   type: 'fill', // or 'line', 'circle' depending on your data
      //   source: 'MB16-kur-source',
      //   'source-layer': 'MB16_pop21_Kur-3734vg', // Very important
      //   paint:  this.getMbPaint('popdens21') as any
      // });
      // /////

      // mb ext data
      fetch('geojsons/MB16_pop21_Kur_ext.geojson')
      .then(response => response.json())
      .then(data => {

      this.map?.addSource('mb16-kur-ext', {
          type: 'geojson',
          data: data
      });

      this.map?.addLayer({
        'id': 'mb16-kur-ext-layer',
        'type': 'fill',
        'source': 'mb16-kur-ext',
        paint: this.getMbPaint('popdens21') as any,
        layout: {visibility: 'none'}
      })
      this.map?.addLayer({
          'id': 'mb16-kur-ext-layer-popdiff',
          'type': 'fill',
          'source': 'mb16-kur-ext',
          paint:  {
            'fill-color': [
              'interpolate',
              ['linear'],
              ['get', "PopdensDiff"], // Replace with your attribute (e.g., 'density')

              -3000, '#b2182b',
              -2400, '#d6604d',
              -1800, '#ef8a62',
              -1200, '#f4a582',
              -600,  '#fddbc7',
              0,     '#ffffff',
              600,   '#d9f0d3',
              1200,  '#a6dba0',
              1800,  '#5aae61',
              2400,  '#1b7837',
              3000,  '#00441b'
            ],
            'fill-opacity': 0.5
          },
          layout: {visibility: 'none'}
      });
      data.features.forEach((feature: { geometry: { coordinates: mapboxgl.LngLatLike; }; properties: { name: any, color: any, Person:any, Person21:any, PopdensDiff:any, PersonDiff:any, DwellingDiff:any}; }) => {
        if (this.map) {
          new mapboxgl.Popup({ offset: 25, closeButton: false, closeOnClick: false, })
            .setLngLat(feature.geometry.coordinates)
            .setHTML(`
                <div>
                  <b>${feature.properties.Person21}</b> 2021 Population
                  <b>${feature.properties.Person}</b> 2016 Population
                  <b>${feature.properties.PopdensDiff}</b> Population Density Difference
                </div>
              </div>`)
            .addTo(this.map);
        }
      });
      });


      fetch('geojsons/MB21_Syd_Pop_test.geojson')
      .then(response => response.json())
      .then(data => {
        data.features.forEach((feature: any) => {
          if (feature.properties.name) {
            feature.properties.color = "#00ff00";
          }
          // console.log(feature.properties);
        }
        );
        this.map?.addSource('my-shape2', {
          type: 'geojson',
          data: data
        });
  
        this.map?.addLayer({
          id: 'my-shape-layer',
          type: 'fill', // or 'line' or 'circle' depending on your data
          source: 'my-shape2',
          paint: {
            'fill-color': [
              'interpolate',
              ['linear'],
              ['get', 'popdens'],
              2000, '#d7191c',  // red (low)
              6000, '#ffffbf',  // neutral
              10000, '#1a9641'   // green (high)
              // 0.0, '#440154', // viridis
              // 0.5, '#31688e',
              // 1.0, '#35b779',
              // 1.5, '#fde725'
            ],
            'fill-opacity': 0.5
          },
          minzoom: this.zoningTransitionZoom
        });
      });

      
      // Hello popup
      // if (this.map) {
      //   new mapboxgl.Popup({ 
      //     offset: 25 ,
      //     closeButton: false,
      //     closeOnClick: false,
      //     className: 'my-custom-popup'
      //   })
      //   .setLngLat(this.homeCoords)
      //   .setHTML('<div class="your-custom-div">Hello!</div>')
      //   .addTo(this.map);
      // }


  });

  const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
  });

  this.map.on('mousemove', 'my-shape-layer', (e) => {
    const feature = e.features?.[0];
    if (!feature) return;

    // Set popup HTML using feature properties
    if (feature.properties && this.map) {
      popup
      .setLngLat(e.lngLat)
      .setHTML(`<strong>${feature.properties['LGA_NAME24']}</strong><br>Dwellings Approved: ${feature.properties['approvals']}<br>Percent of Target: ${feature.properties['percent']}`)
      .addTo(this.map);
    }
  });
  this.map.on('mouseleave', 'my-shape-layer', () => {
    popup.remove();
  });
    
  }

  getMbPaint(field:string) {
    return {
      // 'fill-color': '#ff0000',
      'fill-color': [
        'interpolate',
        ['linear'],
        ['get', field], // Replace with your attribute (e.g., 'density')
        0, '#ffffff',
        100, '#fcffa4',
        2000, '#fcffa4',
        4000, '#fdae61',
        6000, '#f1605d',
        8000, '#dd513a',
        10000, '#c03a3a',
        12000, '#a12857',
        14000, '#932667',
        16000, '#6b1e7e',
        18000, '#420a68',
        20000, '#000004'
      ],
      'fill-opacity': 0.5,
    }
  }

  // red-green, 400 centred
//   -2000, '#b2182b',
// -1600, '#d6604d',
// -1200, '#ef8a62',
// -800,  '#f4a582',
// -400,  '#fddbc7',
// 0,     '#fef5f5',
// 400,   '#ffffff',
// 800,   '#d9f0d3',
// 1200,  '#a6dba0',
// 1600,  '#5aae61',
// 2000,  '#1b7837'

  // Method to add custom button to the map
  addButton() {
    const customButton = document.createElement('button');
    customButton.className = 'my-custom-button';
    customButton.textContent = 'Click Me!';
    customButton.onclick = () => {
      alert('Button clicked!');
      // console.log("here");
    };

    // Define custom control class
    class CustomButtonControl {
      onAdd(map: mapboxgl.Map) {
        return customButton;
      }
      onRemove() {
        customButton.remove();
      }
    }

    // Create the custom control instance
    const customControl = new CustomButtonControl();
    customControl.onAdd = () => customButton;

    // Add button control to the map
    this.map?.on('load', () => {
      this.map?.addControl(customControl, 'top-left'); // Button position
    });
  }

  nextButtonPressed(){
    this.pageNum += 1;
    if (this.pageNum > this.maxPageNum) {
      this.pageNum = this.maxPageNum;
    }

    console.log(this.pageNum);

    this.handlePageNumChange()
  }

  prevButtonPressed() {
    this.pageNum -= 1;
    if (this.pageNum < 1) {
      this.pageNum = 1;
    }
    console.log(this.pageNum);
    this.handlePageNumChange()
  }

  handlePageNumChange() {
    if (this.pageNum == 1) {
      this.flyCenterAus();
      this.displayLowestLgas = false;
      this.toggleLayerVisibility("MB16-kur-layer", false);
      // this.toggleLayerVisibility('kur-lga-outline-layer', false);
    }
    if (this.pageNum == 2) {
      this.goToSydney();
      this.displayLowestLgas = true;
      this.displaySydneyOutflows = false;
      this.toggleLayerVisibility("MB16-kur-layer", false);
      // this.toggleLayerVisibility('kur-lga-outline-layer', true);
    }
    if (this.pageNum == 3) {
      this.displayLowestLgas = false;
      this.displaySydneyOutflows = true;
      this.toggleLayerVisibility("MB21-syd-layer", true);
      this.toggleLayerVisibility("mb16-kur-ext-layer", false);
      this.toggleLayerVisibility('kur-lga-outline-layer', false);
    }
    if (this.pageNum == 4) {
      this.goToKur();
      this.toggleLayerVisibility('kur-lga-outline-layer', true);
      this.toggleLayerVisibility("MB21-syd-layer", false);
      this.toggleLayerVisibility("mb16-kur-ext-layer", true);
      this.toggleLayerVisibility("mb16-kur-ext-layer-popdiff", false);
    }
    if (this.pageNum == 5) {
      this.toggleLayerVisibility('kur-lga-outline-layer', true);
      this.toggleLayerVisibility("MB21-syd-layer", false);
      this.toggleLayerVisibility("mb16-kur-ext-layer", false);
      this.toggleLayerVisibility("mb16-kur-ext-layer-popdiff", true);
      this.toggleLayerVisibility("kur-zoning-outline", false);
      this.toggleLayerVisibility("kur-zoning-layer", false);
    }
    if (this.pageNum == 6) {
      this.toggleLayerVisibility('kur-lga-outline-layer', true);
      this.toggleLayerVisibility("MB21-syd-layer", false);
      this.toggleLayerVisibility("mb16-kur-ext-layer", false);
      this.toggleLayerVisibility("mb16-kur-ext-layer-popdiff", false);
      this.toggleLayerVisibility("kur-zoning-outline", true);
      this.toggleLayerVisibility("kur-zoning-layer", true);
    }
    if (this.pageNum == 7) {
      this.toggleLayerVisibility('kur-lga-outline-layer', false);
      this.toggleLayerVisibility("MB21-syd-layer", false);
      this.toggleLayerVisibility("mb16-kur-ext-layer", false);
      this.toggleLayerVisibility("mb16-kur-ext-layer-popdiff", false);
      this.toggleLayerVisibility("kur-zoning-outline", false);
      this.toggleLayerVisibility("kur-zoning-layer", false);
    }
  }

  goToSydney(){
    console.log("Test button pressed");
    this.flyAusComplete = false
    this.map?.flyTo({ 
      center: [this.sydCoords[0], this.sydCoords[1]],
      zoom: 10 
    });
    this.map?.on('moveend', () => {
      this.flySydneyComplete = true
  });
  }
  
  flyCenterAus(){
    this.flyToLocation(this.ausCoords, this.ausZoom);
  }

  goToKur() {
    console.log("go to kur")
    this.flyToLocation(this.kurCoordsOffset, this.kurZoom)
  }

  flyToLocation(coords:mapboxgl.LngLatLike, zoom:number) {
    this.map?.flyTo({
      center: coords,
      zoom: zoom
    })
  }

  loadGeoJsonLayer() {
    this.map?.addSource('my-shape', {
      type: 'geojson',
      data: 'maine.geojson' // path to your converted GeoJSON
    });

    this.map?.addLayer({
      id: 'my-shape-layer',
      type: 'fill', // or 'line' or 'circle' depending on your data
      source: 'my-shape',
      paint: {
        'fill-color': '#888888',
        'fill-opacity': 0.01
      }
    });
  }

  toggleLayerVisibility(layerId: string, visible: boolean) {
    if (!this.map) return;
  
    const visibility = visible ? 'visible' : 'none';
    this.map.setLayoutProperty(layerId, 'visibility', visibility);
  }
}
  // ngOnDestroy(){
  //   this.map.remove()
  // }
