import {makeAutoObservable} from "mobx";
import {Map} from "ol";
import TileLayer from "ol/layer/Tile";
import {OSM} from "ol/source";

class MapStore {
	constructor() {
		makeAutoObservable(this);

		this.map = null;
		this.layers = [];
	}

	addLayer = (layer, layerId) => {
		this.layers.push({
			layer: layer,
			id: layerId
		});
		this.map.addLayer(layer);
	}

	getLayerById = (id) => {
		if (this.layers.length === 0) {
			return null
		}

		return this.layers.find(layer => layer.id === id)?.layer;
	}

	changeLayerVisibility = (visible, id) => {
		const layer = this.layers.find(item => item.id === id).layer;
		layer.setVisible(visible);
	}

	initMap = (ref, view) => {
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
					view.animate({
						center: feature.getGeometry().flatCoordinates,
						zoom: 20,
						duration: 2000,
					})
				}
			})
		});
	}

	startTour = (objects) => {
		const view = this.map.getView();

		const to = (view, center) => {
			view.animate({
				center: center,
				zoom: 20,
				duration: 2000,
			})
		};

		for (let i = 0; i < objects.features.length; ++i) {
			setTimeout(() => {
				to(view, objects.features[i].geometry.coordinates);
			}, 10);
		}
	}

	getMap = () => {
		return this.map;
	}
}

export default new MapStore();