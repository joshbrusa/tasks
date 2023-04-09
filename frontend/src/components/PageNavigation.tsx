import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import "../css/pageNavigation.css";
import type { Dispatch } from "react";

export default function PageNavigation({
  page,
  setPage,
}: {
  page: number;
  setPage: Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <>
      <div className="pageNavigationContainer">
        <button
          className="pageNavigationButton"
          onClick={() => setPage(page - 1)}
          disabled={page <= 0}
        >
          <ChevronLeftIcon className="icon" />
        </button>
        <button
          className="pageNavigationButton"
          onClick={() => setPage(page + 1)}
        >
          <ChevronRightIcon className="icon" />
        </button>
      </div>
    </>
  );
}
