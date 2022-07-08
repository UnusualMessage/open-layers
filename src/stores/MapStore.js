import {makeAutoObservable} from "mobx";
import {Map} from "ol";
import TileLayer from "ol/layer/Tile";
import {OSM} from "ol/source";
import VectorSource from "ol/source/Vector";
import {GeoJSON} from "ol/format";
import {fromLonLat} from "ol/proj";

import ObjectsStore from "./ObjectsStore";
import {latKey, lonKey, overlayId} from "../data/mapConfig";

class MapStore {
	constructor() {
		this.map = null;
		this.layers = [];

		makeAutoObservable(this);
	}

	getLayerById = (id) => {
		return this.layers.find(layer => layer.id === id)?.layer;
	}

	filterFeatures = (filter) => {
		for (let i = 0; i < this.layers.length; ++i) {
			const geoJson = {
				type: "FeatureCollection",
				features: ObjectsStore.getFeaturesByIndex(i, filter).featureCollection
			}

			const source = new VectorSource({
				features: new GeoJSON().readFeatures(geoJson)
			});

			this.layers[i].layer.setSource(source);
		}
	}

	addLayer = (layer, layerId) => {
		this.layers.push({
			layer: layer,
			id: layerId
		});

		this.map.addLayer(layer);
	}

	addOverlay = (overlay) => {
		this.map.addOverlay(overlay);
	}

	getOverlayById = (id) => {
		return this.map.getOverlayById(id);
	}

	changeLayerVisibility = (visible, id) => {
		const layer = this.layers.find(item => item.id === id).layer;
		layer.setVisible(visible);
	}

	stopAnimation = () => {
		const view = this.map.getView();
		view.setZoom(view.getZoom());
	}

	show = (data, isLonLat) => {
		this.stopAnimation();
		let coordinates = [data[lonKey], data[latKey]];

		if (isLonLat) {
			coordinates = fromLonLat(coordinates);
		}

		const overlay = this.getOverlayById(overlayId);
		const overlayElement = overlay.getElement();

		const keys = Object.keys(data);

		overlayElement.innerHTML = `
			${keys.map(key => {
				if (key === lonKey || key === latKey) {
					return ``
				}

				return `<span>${key + ": " + data[key]}</span>`
			}).join(' ')}
		`;

		overlay.setPosition(coordinates);

		const view = this.map.getView();
		view.animate({
			zoom: 18,
			center: coordinates,
			duration: 3000
		})
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
					});

					this.setOverlay(feature);
				}
			})
		});
	}

	setOverlay = (feature) => {
		const overlay = this.map.getOverlayById(overlayId);
		const overlayElement = overlay.getElement();
		const properties = feature.getProperties();

		const keys = Object.keys(properties);

		overlayElement.innerHTML = `
			${keys.map(key => {
				if (key === "geometry") {
					return ``
				}

				return `<span>${key + ": " + properties[key]}</span>`
			}).join(' ')}`;

		overlay.setPosition(feature.getGeometry().flatCoordinates);
	}

	startTour = (...ids) => {
		const view = this.map.getView();

		const layers = [];
		for (let id of ids) {
			const layer = this.getLayerById(id);

			if (layer.getVisible() === false) {
				continue;
			}

			layers.push(layer);
		}

		if (layers.length === 0) {
			return;
		}

		const features = [];
		for (let layer of layers) {
			features.push(...layer.getSource().getFeatures());
		}

		const to = (index, limit) => {
			if (index >= limit) {
				return;
			}

			const callback = (complete) => {
				if (complete) {
					to(index + 1, limit);
				}
			}

			this.setOverlay(features[index]);

			const coordinates = features[index].getGeometry().flatCoordinates;

			view.animate({
				center: coordinates,
				zoom: 18,
				duration: 5000
			}, {
				center: coordinates,
				zoom: 16,
				duration: 2500
			}, callback)
		}

		to(0, features.length);
	}

	getMap = () => {
		return this.map;
	}
}

export default new MapStore();