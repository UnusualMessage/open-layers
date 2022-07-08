import {observer} from "mobx-react-lite";

import css from "./paginator.module.scss";

import CurrentStateStore from "../../../stores/CurrentStateStore";
import ObjectsStore from "../../../stores/ObjectsStore";
import {pageSize} from "../../../data/mapConfig";

const Paginator = () => {
	let pagesCount = Math.ceil(ObjectsStore.getCurrentFeaturesCount(
		CurrentStateStore.getCurrentTable(),
		CurrentStateStore.getFilter()
	) / pageSize);

	if (pagesCount === 0 || isNaN(pagesCount)) {
		pagesCount = 1;
	}

	const currentPage = CurrentStateStore.getCurrentPage();

	const onNext = () => {
		if (currentPage !== pagesCount) {
			CurrentStateStore.toNextPage();
		}
	}

	const onInput = (e) => {
		let page = e.target.value;

		if (page === "") {
			page = "1";
		}

		CurrentStateStore.toPage(Number(page));
	}

	const onPrevious = () => {
		if (currentPage > 1) {
			CurrentStateStore.toPreviousPage();
		}
	}

	return(
		<div className={`${css.paginator}`}>
			<button onClick={onPrevious}>
				Previous
			</button>

			<input className={`${css.input}`}
			       type="number"
			       onInput={onInput}
			       value={currentPage} min={"1"}/>

			<span>
				из {pagesCount}
			</span>

			<button onClick={onNext}>
				Next
			</button>
		</div>
	)
}

export default observer(Paginator);