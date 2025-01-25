import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import * as cn from "classnames";
import { Collapse } from "react-collapse";
import DataTable from "react-data-table-component";

import AngleDown from "@/assets/icons/angle-down";
import ProgressBar from "../../progress-bar";
import ChatIcon from "@/assets/icons/chart-icon";
import ListIcon from "@/assets/icons/list-icon";
import ButtonOne from "../../button-one";

import {
  annalesColumns,
  annalesCustomStyles,
  annalesData,
  itemOptions,
  questionTypes,
} from "@/constants/mockup-data/library";
import Segmented from "../../Segmented";
import Dropdown from "../../dropdown";
import { ListBulletIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import CustomAntdPagination from "../../custom-antd-pagination";

const PlaylistCard = ({ data }) => {
  const router = useRouter();
  const [total, setTotal] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);

  const handleRowSelected = React.useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  return (
    <div className="shadow-card rounded-lg bg-white pb-2">
      <div className="flex justify-between items-center gap-6 px-8 pt-6 pb-4 rounded-t-lg">
        <div className="flex gap-4 justify-center">
          <h3
            className="flex items-center px-6 h-10 text-sm font-manrope font-semibold rounded-3xl border"
            style={{
              backgroundColor: data.bgColor,
              borderColor: data.borderColor,
              color: data.textColor,
            }}
          >
            {data.name}
          </h3>
          <div className="flex gap-2 items-center">
            <svg
              width="14"
              height="15"
              viewBox="0 0 14 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 3.38643C0 2.05133 1.08292 0.97583 2.4106 0.97583H10.9404C12.2755 0.97583 13.351 2.05875 13.351 3.38643V11.9163C13.351 13.2514 12.2681 14.3269 10.9404 14.3269H2.4106C1.77127 14.3269 1.15813 14.0729 0.70605 13.6208C0.253974 13.1687 0 12.5556 0 11.9163V3.38643ZM7.04638 5.61161C7.04638 5.91571 7.29857 6.1679 7.60267 6.1679H10.1987C10.3462 6.1679 10.4877 6.10929 10.5921 6.00497C10.6964 5.90064 10.755 5.75915 10.755 5.61161C10.755 5.46407 10.6964 5.32257 10.5921 5.21825C10.4877 5.11392 10.3462 5.05531 10.1987 5.05531H7.60267C7.45514 5.05531 7.31364 5.11392 7.20932 5.21825C7.10499 5.32257 7.04638 5.46407 7.04638 5.61161ZM7.60267 9.1348C7.45514 9.1348 7.31364 9.19341 7.20932 9.29773C7.10499 9.40206 7.04638 9.54355 7.04638 9.69109C7.04638 9.83863 7.10499 9.98012 7.20932 10.0844C7.31364 10.1888 7.45514 10.2474 7.60267 10.2474H10.1987C10.3462 10.2474 10.4877 10.1888 10.5921 10.0844C10.6964 9.98012 10.755 9.83863 10.755 9.69109C10.755 9.54355 10.6964 9.40206 10.5921 9.29773C10.4877 9.19341 10.3462 9.1348 10.1987 9.1348H7.60267ZM5.77062 5.263C5.82527 5.21207 5.86911 5.15065 5.89951 5.08242C5.92992 5.01418 5.94627 4.94051 5.94759 4.86582C5.9489 4.79113 5.93516 4.71693 5.90718 4.64766C5.87921 4.5784 5.83756 4.51547 5.78474 4.46265C5.73191 4.40982 5.66899 4.36818 5.59972 4.3402C5.53045 4.31222 5.45626 4.29848 5.38156 4.2998C5.30687 4.30112 5.23321 4.31747 5.16497 4.34787C5.09673 4.37828 5.03532 4.42211 4.98439 4.47677L3.89405 5.5671L3.54544 5.21849C3.43999 5.12023 3.30051 5.06673 3.15639 5.06928C3.01227 5.07182 2.87477 5.1302 2.77285 5.23213C2.67092 5.33405 2.61254 5.47155 2.61 5.61567C2.60746 5.75979 2.66095 5.89927 2.75921 6.00472L3.50094 6.74645C3.72346 6.96896 4.07207 6.96896 4.28717 6.74645L5.77062 5.263ZM5.77062 8.55625C5.66631 8.45208 5.52492 8.39356 5.3775 8.39356C5.23008 8.39356 5.08869 8.45208 4.98439 8.55625L3.89405 9.64659L3.54544 9.29798C3.43999 9.19971 3.30051 9.14622 3.15639 9.14876C3.01227 9.1513 2.87477 9.20969 2.77285 9.31161C2.67092 9.41353 2.61254 9.55104 2.61 9.69515C2.60746 9.83927 2.66095 9.97875 2.75921 10.0842L3.50094 10.8259C3.72346 11.0484 4.07207 11.0484 4.28717 10.8259L5.77062 9.34248C5.99313 9.11996 5.99313 8.77135 5.77062 8.55625Z"
                fill="#C8C9CE"
              />
            </svg>
            <span className="font-manrope text-sm text-[#85868E]">
              {data.questions} questions
            </span>
          </div>
        </div>
        <div className="flex items-center">
          <ButtonOne
            text="Full training"
            click={() => {
              router.push(`/library/${data.slug}`);
            }}
            className="h-8 !px-4 !py-0 mr-8 !rounded-lg text-sm leading-none"
          />

          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className={cn({
              "w-8 h-8 inline-flex justify-center items-center gap-x-2 text-sm rounded-full bg-white hover:bg-gray-50 transition-all": true,
              "-rotate-180": expanded,
            })}
          >
            <AngleDown />
          </button>
          <div className="group relative inline-flex">
            <button
              type="button"
              className="w-8 h-8 inline-flex justify-center items-center gap-x-2 text-sm rounded-full bg-white hover:bg-gray-50 transition-all"
            >
              <svg
                width="3"
                height="13"
                viewBox="0 0 3 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 0L3 3L-6.07971e-07 3L-4.76837e-07 -1.31134e-07L3 0Z"
                  fill="#C8C9CE"
                  className="group-hover:fill-[#84848a] transition-all"
                />
                <path
                  d="M3 5L3 8L-8.26528e-07 8L-6.95394e-07 5L3 5Z"
                  fill="#C8C9CE"
                  className="group-hover:fill-[#84848a] transition-all"
                />
                <path
                  d="M3 13L3 10L-9.13951e-07 10L-1.04509e-06 13L3 13Z"
                  fill="#C8C9CE"
                  className="group-hover:fill-[#84848a] transition-all"
                />
              </svg>
            </button>

            <div className="absolute top-[calc(100%+8px)] right-2 transition-all duration group-hover:opacity-100 group-hover:visible opacity-0 invisible min-w-40 bg-white shadow-md rounded-lg p-1 divide-y divide-gray-200 z-10">
              <div className="py-1 first:pt-0 last:pb-0">
                <button className="flex items-center w-full gap-2 py-1.5 px-2 rounded-md text-sm font-manrope font-bold text-[#222222] hover:bg-gray-100 focus:outline-none focus:bg-gray-100 whitespace-nowrap">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M17.8084 8.98335C17.8084 8.88802 17.7068 8.82859 17.6239 8.87471L11.504 12.2748C11.4654 12.2962 11.4404 12.3379 11.4404 12.3832V19.1252C11.4404 19.2189 11.5418 19.28 11.6257 19.2334L17.7434 15.8346C17.7433 15.8347 17.7435 15.8345 17.7434 15.8346C17.7842 15.8117 17.8084 15.7694 17.8084 15.7254V8.98335ZM16.8951 7.56366C17.9783 6.96145 19.3084 7.74474 19.3084 8.98335V15.7254C19.3084 16.3159 18.9879 16.8577 18.4747 17.1443L18.4733 17.1451L12.3537 20.5449C11.2714 21.1453 9.94043 20.3638 9.94043 19.1252V12.3832C9.94043 11.7939 10.2599 11.2499 10.7755 10.9635"
                      fill="black"
                      fill-opacity="0.6"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16.588 5.37804C16.7926 5.73822 16.6664 6.19603 16.3062 6.40059L8.87941 10.6185C8.84209 10.6396 8.81787 10.6799 8.81787 10.7254V17.9875C8.81787 18.4017 8.48209 18.7375 8.06787 18.7375C7.65366 18.7375 7.31787 18.4017 7.31787 17.9875V10.7254C7.31787 10.1417 7.63084 9.60164 8.1404 9.31319C8.14019 9.31331 8.14062 9.31307 8.1404 9.31319L15.5655 5.09626C15.9256 4.89171 16.3835 5.01786 16.588 5.37804Z"
                      fill="black"
                      fill-opacity="0.6"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M13.9689 3.63593C14.1701 3.99803 14.0396 4.45462 13.6775 4.65577L6.2603 8.77605C6.26015 8.77613 6.26044 8.77597 6.2603 8.77605C6.21953 8.79901 6.19531 8.84128 6.19531 8.88528V15.365C6.19531 15.7792 5.85953 16.115 5.44531 16.115C5.0311 16.115 4.69531 15.7792 4.69531 15.365V8.88528C4.69531 8.29475 5.0158 7.75294 5.52903 7.46637L5.53045 7.46558L12.9491 3.3445C13.3112 3.14336 13.7678 3.27383 13.9689 3.63593Z"
                      fill="black"
                      fill-opacity="0.6"
                    />
                  </svg>
                  Rename
                </button>
                <button className="flex items-center w-full gap-2 py-1.5 px-2 rounded-lg text-sm font-manrope font-bold text-[#D3153E] hover:bg-gray-100 focus:outline-none focus:bg-gray-100 whitespace-nowrap">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10.5 5.25C10.3619 5.25 10.25 5.36193 10.25 5.5V6.25H13.75V5.5C13.75 5.36193 13.6381 5.25 13.5 5.25H10.5ZM15.25 6.25V5.5C15.25 4.5335 14.4665 3.75 13.5 3.75H10.5C9.5335 3.75 8.75 4.5335 8.75 5.5V6.25H5C4.58579 6.25 4.25 6.58579 4.25 7C4.25 7.41421 4.58579 7.75 5 7.75H19C19.4142 7.75 19.75 7.41421 19.75 7C19.75 6.58579 19.4142 6.25 19 6.25H15.25ZM17.5623 8.75259C17.9751 8.78699 18.2818 9.1495 18.2474 9.56228L17.5669 17.7284C17.4481 19.1537 16.2566 20.25 14.8264 20.25H8.9025C7.43709 20.25 6.22911 19.1009 6.15593 17.6373L5.75094 9.53745C5.73025 9.12376 6.04885 8.77162 6.46255 8.75094C6.87624 8.73025 7.22838 9.04885 7.24906 9.46255L7.65406 17.5624C7.68732 18.2277 8.23641 18.75 8.9025 18.75H14.8264C15.4765 18.75 16.0181 18.2517 16.0721 17.6038L16.7526 9.43772C16.787 9.02493 17.1495 8.71819 17.5623 8.75259ZM10.5 10.25C10.9142 10.25 11.25 10.5858 11.25 11V17C11.25 17.4142 10.9142 17.75 10.5 17.75C10.0858 17.75 9.75 17.4142 9.75 17V11C9.75 10.5858 10.0858 10.25 10.5 10.25ZM13.5 10.25C13.9142 10.25 14.25 10.5858 14.25 11V17C14.25 17.4142 13.9142 17.75 13.5 17.75C13.0858 17.75 12.75 17.4142 12.75 17V11C12.75 10.5858 13.0858 10.25 13.5 10.25Z"
                      fill="#D3153E"
                    />
                  </svg>
                  Delete playlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#FCFCFD]">
        <Collapse
          isOpened={expanded}
          initialStyle={{ height: 0, overflow: "hidden" }}
        >
          <DataTable
            className="border-t"
            columns={annalesColumns}
            data={annalesData}
            customStyles={annalesCustomStyles}
            pagination
            // paginationComponent={CustomAntdPagination}
            selectableRows
            onSelectedRowsChange={handleRowSelected}
            clearSelectedRows={toggleCleared}
          />
        </Collapse>
      </div>
    </div>
  );
};

export default PlaylistCard;
