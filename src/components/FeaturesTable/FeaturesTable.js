import css from "./table.module.scss";
import {useMemo} from "react";

const FeaturesTable = () => {
	const rows = useMemo(() => {
		return [];
	}, []);

	const headers = useMemo(() => {
		return [];
	}, [])

	return (
		<div className={`${css.table}`}>
			<table>

			</table>
		</div>

	)
}

export default FeaturesTable;