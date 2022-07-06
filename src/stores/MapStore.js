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

		const animation = [];

		for (let i = 0; i < objects.features.length; ++i) {
			animation.push({
				center: objects.features[i].geometry.coordinates,
				zoom: 20,
				duration: 2000
			});
		}

		view.animate(...animation);
	}

	getMap = () => {
		return this.map;
	}
}

export default new MapStore();