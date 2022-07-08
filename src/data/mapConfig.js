import {fromLonLat} from "ol/proj";

const defaultCenter = fromLonLat([-77.018627, 38.899924]);
const defaultZoom = 15;
const defaultVisibility = true;

const geoJsonId = "geo";
const geoJsonUrl = "bars.geojson";

const csvId = "csv";
const csvUrl = "portals.csv";

const overlayId = 1;
const overlayOffset = [-125, -10];

const lonKey = "lon";
const latKey = "lat";

const ruNameKey = "name_ru";
const enNameKey = "name_en";

const localStorageCenterLabel = "center";
const localStorageZoomLabel = "zoom";
const localStorageLayersLabel = "layers";
const localStorageFilterLabel = "filter";

export {
	defaultZoom,
	defaultCenter,
	defaultVisibility,
	geoJsonId,
	csvId,
	geoJsonUrl,
	csvUrl,
	overlayId,
	overlayOffset,
	lonKey,
	latKey,
	ruNameKey,
	enNameKey,
	localStorageCenterLabel,
	localStorageZoomLabel,
	localStorageLayersLabel,
	localStorageFilterLabel
};