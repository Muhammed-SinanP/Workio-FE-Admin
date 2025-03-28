import React, { useState } from 'react'
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const SortDiv = ({ register, sortCriteria }) => {
    const [showSortDiv, setShowSortDiv] = useState(false)
    return (
        <div className="flex flex-col gap-2 rounded-md border text-sm bg-white p-2 dark:bg-dark-input dark:text-dark-text">
            <div
                className="flex cursor-pointer justify-between font-medium"
                onClick={() => setShowSortDiv(!showSortDiv)}
            >
                Sort by
                {showSortDiv ? (
                    <ArrowDropUpIcon fontSize="small" />
                ) : (
                    <ArrowDropDownIcon fontSize="small" />
                )}
            </div>
            {showSortDiv && (
                <div className="grid grid-cols-12 gap-4 sm:gap-6">
                    <div className="col-span-6 flex flex-col gap-1 sm:col-span-4 md:col-span-3 lg:col-span-2">
                        <select
                            {...register("sortCriteria")}
                            className="input-style text-xs cursor-pointer"
                        >
                            <option value="name" className="text-xs">
                                Job Title
                            </option>
                            <option value="date" className="text-xs">
                                Date Created
                            </option>
                        </select>
                    </div>

                    <div className="col-span-6 flex flex-col gap-1 sm:col-span-6 md:col-span-5 lg:col-span-4 xl:col-span-3">
                        <select
                            {...register("sortOrder")}
                            className="input-style text-xs cursor-pointer"
                        >
                            <option value="asc" className="text-xs">
                                Ascending
                                {sortCriteria === "name"
                                    ? "(A-Z)"
                                    : "(Oldest to Newest)"}
                            </option>
                            <option value="desc" className="text-xs">
                                Descending
                                {sortCriteria === "name"
                                    ? "(Z-A)"
                                    : "(Newest to Oldest)"}
                            </option>
                        </select>
                    </div>
                </div>
            )}
        </div>
    )
}

export default SortDiv