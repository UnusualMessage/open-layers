import {observer} from "mobx-react-lite";
import {useMemo} from "react";
import {toLonLat} from "ol/proj";

import css from "./table.module.scss";

import ObjectsStore from "../../stores/ObjectsStore";
import CurrentStateStore from "../../stores/CurrentStateStore";
import Table from "./Table";
import {latKey, lonKey} from "../../data/mapConfig";

const FeaturesTable = () => {
	const groups = ObjectsStore.getPagedFeaturesById(CurrentStateStore.getCurrentTable(),
		CurrentStateStore.getFilter(),
		CurrentStateStore.getCurrentPage());

	const visible = CurrentStateStore.getLayerStateById(CurrentStateStore.getCurrentTable());

	const headers = useMemo(() => {
		const result = [];

		if (groups === undefined || groups.length === 0 || !visible) {
			return [];
		}

		if (groups.featureCollection.length === 0) {
			return [];
		}

		const first = groups.featureCollection[0];

		for (let key of Object.keys(first.properties)) {
			const record = {
				Header: key,
				accessor: key
			};

			result.push(record);
		}

		result.push({
			Header: lonKey,
			accessor: lonKey
		});

		result.push({
			Header: latKey,
			accessor: latKey
		})

		return result;
	}, [groups, visible]);

	const data = useMemo(() => {
		const result = [];

		if (groups === undefined || groups.length === 0) {
			return [];
		}

		const features = groups.featureCollection;

		for (let feature of features) {
			const record = {};

			for (let key of Object.keys(feature.properties)) {
				record[key] = feature.properties[key];
			}

			const lonLatCoordinates = toLonLat(feature.geometry.coordinates);

			record[lonKey] = lonLatCoordinates[0];
			record[latKey] = lonLatCoordinates[1];

			result.push(record);
		}

		return result;
	}, [groups]);

	let toShow = true;
	if (data.length === 0 || headers.length === 0) {
		toShow = false;
	}

	return (
		<div className={`${css.table}`}>
			{
				toShow ? <Table columns={headers} data={data}/>
					: <div className={`${css.placeholder}`}>ЗДЕСЬ ПУСТО...</div>
			}
		</div>
	)
}

export default observer(FeaturesTable);