import {fromLonLat} from "ol/proj";

const defaultCenter = fromLonLat([-77.018627, 38.899924]);
const defaultZoom = 15;
const defaultVisibility = true;

const geoJsonId = "geo";
const geoJsonUrl = "bars.geojson";

const csvId = "csv";
const csvUrl = "portals.csv";

const overlayId = 1;
const overlayOffset = [-100, -10];

export {
	defaultZoom,
	defaultCenter,
	defaultVisibility,
	geoJsonId,
	csvId,
	geoJsonUrl,
	csvUrl,
	overlayId,
	overlayOffset
};