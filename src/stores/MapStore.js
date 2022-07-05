import {makeAutoObservable} from "mobx";
import {Map, View} from "ol";
import TileLayer from "ol/layer/Tile";
import {OSM} from "ol/source";

class MapStore {
	map = null;

	constructor() {
		makeAutoObservable(this);

		this.currentCenter = localStorage.getItem("center");

		if (this.currentCenter != null) {
			this.currentCenter = this.currentCenter.split(',');
			this.currentCenter = this.currentCenter.map(coordinate => Number(coordinate));
		}

		this.currentZoom = localStorage.getItem("zoom");
	}

	getCenter = () => {
		return this.currentCenter;
	}

	getZoom = () => {
		return this.currentZoom;
	}

	setCenter = (center) => {
		localStorage.setItem("center", center);
		this.currentCenter = center;
	}

	setZoom = (zoom) => {
		localStorage.setItem("zoom", zoom);
		this.currentZoom = zoom;
	}

	initMap = (ref, center, zoom) => {
		const view = new View({
			center: center,
			zoom: zoom
		});

		view.on("change:resolution", () => {
			this.setZoom(view.getZoom())
			this.setCenter(view.getCenter());
		});

		view.on("change:center", () => {
			this.setCenter(view.getCenter());
		});

		this.map = new Map({
			layers: [new TileLayer({
				source: new OSM()
			})],

			target: ref,
			view: view
		});
	}

	setOnClick = (vectorLayer) => {
		this.map.on('click', (e) => {
			const pixel = this.map.getEventPixel(e.originalEvent);

			vectorLayer.getFeatures(pixel).then((features) => {
				const feature = features.length ? features[0] : undefined;

				if (feature !== undefined) {
					const view = this.map.getView();
					view.setCenter(feature.getGeometry().flatCoordinates);
					view.setZoom(20);
				}
			})
		});
	}

	getMap = () => {
		return this.map;
	}
}

export default new MapStore();