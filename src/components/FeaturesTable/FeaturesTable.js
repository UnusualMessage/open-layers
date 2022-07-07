import {observer} from "mobx-react-lite";
import {useMemo} from "react";

import css from "./table.module.scss";

import ObjectsStore from "../../stores/ObjectsStore";
import CurrentStateStore from "../../stores/CurrentStateStore";
import Table from "./Table";

const FeaturesTable = () => {
	const groups = ObjectsStore.getFeaturesById(CurrentStateStore.getCurrentTable(), CurrentStateStore.getFilter());

	const headers = useMemo(() => {
		const result = [];

		if (groups === undefined || groups.length === 0) {
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
			Header: "lon",
			accessor: "lon"
		});

		result.push({
			Header: "lat",
			accessor: "lat"
		})

		return result;
	}, [groups]);

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

			record["lon"] = feature.geometry.coordinates[0];
			record["lat"] = feature.geometry.coordinates[1];

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