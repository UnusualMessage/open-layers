import {observer} from "mobx-react-lite";
import {useMemo} from "react";
import {toLonLat} from "ol/proj";

import css from "./table.module.scss";

import ObjectsStore from "../../stores/ObjectsStore";
import CurrentStateStore from "../../stores/CurrentStateStore";
import Table from "./Table";
import {latKey, lonKey, pageSize} from "../../data/mapConfig";

const FeaturesTable = () => {
	const groups = ObjectsStore.getFeaturesById(CurrentStateStore.getCurrentTable(), CurrentStateStore.getFilter());
	const visible = CurrentStateStore.getLayerStateById(CurrentStateStore.getCurrentTable());
	const currentPage = CurrentStateStore.getCurrentPage();

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

		let start = (currentPage - 1) * pageSize;

		if (start >= features.length) {
			return [];
		}

		let end = pageSize * currentPage;

		if (start + pageSize >= features.length) {
			end = features.length - pageSize + start;
		}

		if (features.length <= pageSize) {
			end = features.length;
		}

		for (let i = start; i < end; ++i) {
			const record = {};

			for (let key of Object.keys(features[i].properties)) {
				record[key] = features[i].properties[key];
			}

			const lonLatCoordinates = toLonLat(features[i].geometry.coordinates);

			record[lonKey] = lonLatCoordinates[0];
			record[latKey] = lonLatCoordinates[1];

			result.push(record);
		}

		return result;
	}, [currentPage, groups]);

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