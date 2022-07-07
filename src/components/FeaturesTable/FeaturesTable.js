import {observer} from "mobx-react-lite";
import {useMemo} from "react";
import {toLonLat} from "ol/proj";

import css from "./table.module.scss";

import ObjectsStore from "../../stores/ObjectsStore";
import CurrentStateStore from "../../stores/CurrentStateStore";
import Table from "./Table";
import MapStore from "../../stores/MapStore";
import {latKey, lonKey} from "../../data/mapConfig";

const FeaturesTable = () => {
	const groups = ObjectsStore.getFeaturesById(CurrentStateStore.getCurrentTable(), CurrentStateStore.getFilter());
	const visibility = MapStore.isVisible(CurrentStateStore.getCurrentTable());

	const headers = useMemo(() => {
		const result = [];

		if (groups === undefined || groups.length === 0 || !visibility) {
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
	}, [groups, visibility]);

	const data = useMemo(() => {
		const result = [];

		if (groups === undefined || groups.length === 0) {
			return [];
		}

		for (let feature of groups.featureCollection) {
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

	return (
		<div className={`${css.table}`}>
			<Table columns={headers} data={data}/>
		</div>
	)
}

export default observer(FeaturesTable);