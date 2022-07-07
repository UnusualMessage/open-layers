import {useTable} from "react-table";
import {observer} from "mobx-react-lite";
import MapStore from "../../stores/MapStore";

import css from "./table.module.scss";

const Table = ({ data, columns }) => {
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
	} = useTable({ columns, data })

	return (
		<table className={`${css.main}`} {...getTableProps()}>
			<thead className={`${css.head}`}>
			{headerGroups.map(headerGroup => (
				<tr {...headerGroup.getHeaderGroupProps()} className={`${css.row}`}>
					{headerGroup.headers.map(column => (
						<th className={`${css.item}`} {...column.getHeaderProps()}>
							{column.render('Header')}
						</th>
					))}
				</tr>
			))}
			</thead>
			<tbody className={`${css.body}`} {...getTableBodyProps()}>
			{rows.map(row => {
				prepareRow(row)
				return (
					<tr className={`${css.row}`}
						{...row.getRowProps()}
					    onClick={() => { MapStore.show(row.original, true) } } >

						{row.cells.map(cell => {
							return (
								<td className={`${css.item}`} {...cell.getCellProps()}>
									{cell.render('Cell')}
								</td>
							)
						})}
					</tr>
				)
			})}
			</tbody>
		</table>
	);
}

export default observer(Table);