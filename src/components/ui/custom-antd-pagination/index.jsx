// import { ConfigProvider, Pagination } from "antd";
import React, { useEffect } from "react";

export const CustomAntdPagination = ({
  rowsPerPage,
  rowCount,
  onChangePage,
  onChangeRowsPerPage,
  currentPage,
}) => {
  useEffect(() => {
    console.log("rowsPerPage:", rowsPerPage);
    console.log("rowCount:", rowCount);
    console.log("currentPage:", currentPage);
  }, []);
  return (
    <div className="flex justify-end px-5 py-5">
      {/* <ConfigProvider
        theme={{
          token: {
            controlOutlineWidth: 1,
          },
        }}
      >
        <Pagination
          showSizeChanger
          pageSizeOptions={[10, 20, 50, 100]}
          defaultPageSize={10}
          pageSize={rowsPerPage}
          onShowSizeChange={(i) => {
            onChangeRowsPerPage(i);
          }}
          defaultCurrent={currentPage}
          total={rowCount}
          onChange={onChangePage}
        />
      </ConfigProvider> */}
    </div>
  );
};

export default CustomAntdPagination;
