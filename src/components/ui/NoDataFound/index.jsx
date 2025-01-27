import { FolderOpenIcon } from "@heroicons/react/24/outline"
const NoDataFound = ({ colSpan, message = "No Data Available" }) => {
    return (
        <tr>
            <td colSpan={colSpan} className="px-3 py-8 text-sm text-gray-500 text-center">
                <div className="flex flex-col items-center justify-center">
                    <FolderOpenIcon className="w-10 h-10 text-violet-400 mb-2" />
                    <p className="text-gray-500 text-sm font-semibold tracking-wide">{message}</p>
                    {/* <p className="max-w-sm text-xs italic text-gray-500 text-center">
                        There are currently no records matching your criteria. Try adjusting your filters or adding new data.
                    </p> */}
                </div>
            </td>
        </tr>
    )
}

export default NoDataFound
