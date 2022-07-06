import {fromLonLat} from "ol/proj";

const defaultCenter = fromLonLat([-77.018627, 38.899924]);
const defaultZoom = 15;
const defaultVisibility = true;

const geoJsonId = "geo";
const csvId = "csv";

const geoJsonUrl = "bars.geojson";
const csvUrl = "portals.csv";

export { defaultZoom, defaultCenter, defaultVisibility, geoJsonId, csvId, geoJsonUrl, csvUrl };