import { useAuth } from '@/providers/authProvider';
import React from 'react';
import SearchBox from '../search-box';
import { PlusIcon } from '@heroicons/react/24/solid';

const LibraryHeader = ({ buttonTitle, buttonClick, searchKeyword, setSearchKeyword }) => {
    const { user } = useAuth();

    return (
        <>
            {
                user?.role === "admin" ? (
                    <div className="mb-4 flex justify-between items-center">
                        <button
                            type="button"
                            onClick={buttonClick}
                            className="inline-flex justify-between items-center border-2 border-gray-300 gap-x-1.5 rounded-md bg-white text-black px-2.5 py-1.5 text-sm font-semibold hover:text-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 hover:outline-primary-600"
                        >
                            <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                            {buttonTitle}
                        </button>
                        <div className="w-1/2">
                            <SearchBox
                                keyword={searchKeyword}
                                keywordSetter={setSearchKeyword}
                            />
                        </div>
                    </div>
                ) : (
                    <SearchBox
                        keyword={searchKeyword}
                        keywordSetter={setSearchKeyword}
                    />
                )
            }

        </>

    );
};

export default LibraryHeader;
