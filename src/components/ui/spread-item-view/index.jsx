import Link from "next/link";
import React, { useEffect, useState } from "react";

const SpreadItemView = ({ items, length }) => {
  const [collapse, setCollapse] = useState(true);
  const [list, setList] = useState([]);

  useEffect(() => {
    if (collapse) {
      setList(new Array(length).fill(0));
    } else {
      setList(new Array(items.length).fill(0));
    }
  }, [items, collapse]);

  return (
    <div className="flex items-center gap-1 py-1 flex-wrap">
      {list.map((_, index) => (
        <React.Fragment key={`spread-view-item-${index}`}>
          {items[index] && (
            <Link href="/library/cardiologie/336.Myocardite">
              <div className="flex items-center gap-1 h-8 px-2 w-fit rounded-full bg-[#F3F3F4] border border-[#E2E2E4] shadow">
                <span className="item-index flex justify-center items-center h-6 w-6 shadow-md text-[8px] font-manrope font-semibold border border-[#ECECED] rounded bg-white">
                  {items[index].index}
                </span>
                <span className="font-manrope font-bold text-xs text-ellipsis overflow-hidden">
                  {items[index].title}
                </span>
              </div>
            </Link>
          )}
        </React.Fragment>
      ))}
      {collapse && items.length > length && (
        <div
          onClick={() => setCollapse(!collapse)}
          className="flex items-center h-6 w-6 px-1 cursor-pointer py-0.5 rounded bg-[#F3F3F4] border border-[#E2E2E4] text-xs"
        >
          +{items.length - length}
        </div>
      )}
    </div>
  );
};

export default SpreadItemView;
