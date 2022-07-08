import {makeAutoObservable} from "mobx";

import {
	defaultPage,
	defaultCenter,
	geoJsonId,
	localStorageCenterLabel,
	localStorageFilterLabel,
	localStorageLayersLabel,
	localStoragePageLabel,
	localStorageZoomLabel, defaultZoom
} from "../data/mapConfig";

class CurrentStateStore {
	constructor() {
		this.layersState = JSON.parse(localStorage.getItem(localStorageLayersLabel));
		if (this.layersState == null) {
			this.layersState = [];
		}

		const center = JSON.parse(localStorage.getItem(localStorageCenterLabel));
		this.currentCenter = center ? center : defaultCenter;

		const zoom = Number(localStorage.getItem(localStorageZoomLabel));
		this.currentZoom = zoom ? zoom : defaultZoom;

		const filter = localStorage.getItem(localStorageFilterLabel)
		this.currentFilter = filter ? filter : "";

		this.currentPage = defaultPage;

		this.currentTable = geoJsonId;

		makeAutoObservable(this);
	}

	toNextPage = () => {
		this.toPage(this.currentPage + 1);
	}

	toPreviousPage = () => {
		this.toPage(this.currentPage - 1);
	}

	toPage = (page) => {
		this.currentPage = page;
		this.savePageToLocalStorage();
	}

	savePageToLocalStorage = () => {
		localStorage.setItem(localStoragePageLabel, this.currentPage.toString());
	}

	getCurrentPage = () => {
		return this.currentPage;
	}

	getFilter = () => {
		return this.currentFilter;
	}

	setFilter = (filter) => {
		this.currentFilter = filter;
		localStorage.setItem(localStorageFilterLabel, filter);
	}

	setCurrentTable = (table) => {
		this.currentTable = table;
	}

	getCurrentTable = () => {
		return this.currentTable;
	}

	getCenter = () => {
		return this.currentCenter;
	}

	getZoom = () => {
		return this.currentZoom;
	}

	getLayerStateById = (id) => {
		return this.layersState?.find(state => state.id === id)?.visible;
	}

	addLayerState = (visible, id) => {
		const layersState = this.layersState?.find(state => state.id === id);

		if (layersState != null) {
			layersState.visible = visible;
		} else {
			this.layersState.push({
				visible: visible,
				id: id
			})
		}

		localStorage.setItem(localStorageLayersLabel, JSON.stringify(this.layersState));
	}

	setCenter = (center) => {
		localStorage.setItem(localStorageCenterLabel, JSON.stringify(center));
		this.currentCenter = center;
	}

	setZoom = (zoom) => {
		localStorage.setItem(localStorageZoomLabel, zoom);
		this.currentZoom = zoom;
	}
}

export default new CurrentStateStore();