import { materialTypes } from "@/constants/mockup-data/library";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const SpreadMaterialView = ({ material, length }) => {
  const [collapse, setCollapse] = useState(true);
  const [list, setList] = useState([]);

  useEffect(() => {
    if (collapse) {
      setList(new Array(length).fill(0));
    } else {
      setList(new Array(material.length).fill(0));
    }
  }, [material, collapse]);

  return (
    <div className="flex items-center gap-1 py-1 flex-wrap">
      {list.map((_, index) => (
        <React.Fragment key={`spread-view-material-${index}`}>
          {material[index] &&
            materialTypes.filter((item) => item.id === material[index]).length >
              0 && (
              <Link href="/library/cardiologie">
                <div className="flex items-center gap-1 h-7 px-1.5 w-fit rounded-full bg-[#F3F3F4] border border-[#E2E2E4] shadow">
                  <img
                    src={
                      materialTypes.find((item) => item.id === material[index])
                        .logo
                    }
                    className="w-4"
                  />
                  <span className="font-manrope font-bold text-xs text-ellipsis overflow-hidden">
                    {
                      materialTypes.find((item) => item.id === material[index])
                        .name
                    }
                  </span>
                </div>
              </Link>
            )}
        </React.Fragment>
      ))}
      {collapse && material.length > length && (
        <div
          onClick={() => setCollapse(!collapse)}
          className="flex items-center h-6 w-6 px-1 cursor-pointer py-0.5 rounded bg-[#F3F3F4] border border-[#E2E2E4] text-xs"
        >
          +{material.length - length}
        </div>
      )}
    </div>
  );
};

export default SpreadMaterialView;
