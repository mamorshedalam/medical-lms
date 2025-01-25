import React, { Fragment, useEffect, useState } from "react";
import { useAtom } from "jotai";
import * as cn from "classnames";

import { modal } from "@/store/store";
import { colorOptions, modalPlaylist } from "@/constants/mockup-data/library";
import ButtonOne from "../../button-one";
import { CheckIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const AddToPlaylistModal = () => {
  const [openState, setOpenState] = useAtom(modal); // Get the current state of the modal
  const [opened, setOpened] = useState(false);
  const [showNewItemForm, setShowNewItemForm] = useState(false);
  const [checkedList, setCheckedList] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [newItemName, setNewItemName] = useState(null);
  const [playlist, setPlaylist] = useState([]);

  const router = useRouter();

  useEffect(() => {
    setPlaylist(modalPlaylist);
  }, []);

  useEffect(() => {
    openState && setOpened(openState.playlistModal);
  }, [openState]);

  const closeModal = () => {
    setOpened(false);
    setOpenState({ ...openState, playlistModal: false });
  };

  const createHandler = () => {
    setCheckedList([]);
    setShowNewItemForm(false);
    setNewItemName(null);
    setSelectedColor(null);
    closeModal();
    toast.success("New playlist is added!", {
      position: "top-center",
      autoClose: 1500,
    });
  };

  const createPlaylistHandler = () => {
    if (newItemName && selectedColor) {
      setPlaylist([
        ...playlist,
        {
          name: newItemName,
          ...colorOptions.find((item) => item.index === selectedColor),
        },
      ]);
      setNewItemName(null);
      setSelectedColor(null);
      setShowNewItemForm(false);
      toast.success("New playlist is created!", {
        position: "top-center",
        autoClose: 1500,
      });
    } else {
      toast.warn("Name and color are required!", {
        position: "top-center",
        autoClose: 1500,
      });
    }
  };

  return (
    <Fragment>
      {opened ? (
        <div className="fixed inset-0 flex items-center justify-end py-[120px] px-[150px]">
          <div
            onClick={closeModal}
            className="absolute inset-0 bg-black bg-opacity-50"
          />
          <div className="bg-white rounded-3xl shadow-lg max-w-[540px] w-fill-available z-10">
            <div className="flex px-7 py-5 justify-between items-center border-b">
              <h2 className="text-xl font-manrope font-bold">
                Add to playlist
              </h2>

              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-all"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <button
                onClick={() => setShowNewItemForm(true)}
                className="mb-6 text-[#6255E5] font-bold font-manrope"
              >
                + Create a playlist
              </button>
              <ul className="flex flex-col gap-2">
                {playlist.length > 0 &&
                  playlist.map((item, index) => (
                    <li
                      key={`playlist-item-${index}`}
                      className="flex items-center gap-4"
                    >
                      <button
                        onClick={() =>
                          checkedList.includes(item.name)
                            ? setCheckedList(
                                checkedList.filter((i) => i !== item.name)
                              )
                            : setCheckedList([...checkedList, item.name])
                        }
                        className={cn({
                          "w-4 h-4 border-2 rounded-md transition-all": true,
                          "bg-primary border-primary": checkedList.includes(
                            item.name
                          ),
                          "bg-white border-[#8C8A94]": !checkedList.includes(
                            item.name
                          ),
                        })}
                      >
                        <CheckIcon className="text-white" height={12} />
                      </button>
                      <div
                        className="flex items-center h-10 px-6 border rounded-3xl"
                        style={{
                          borderColor: item.borderColor,
                          backgroundColor: item.bgColor,
                          color: item.textColor,
                        }}
                      >
                        {item.name}
                      </div>
                    </li>
                  ))}
              </ul>
              {showNewItemForm && (
                <div className="flex items-center gap-4 pt-8">
                  <div className="w-4 h-4" />
                  <div className="flex-1 border rounded-lg px-6 py-4 mr-12">
                    <input
                      type="text"
                      className="w-full bg-[#F3F3F4] py-2 px-3 rounded-lg outline-none font-manrope text-sm"
                      placeholder="Playlist name"
                      onChange={(event) => setNewItemName(event.target.value)}
                    />
                    <div className="flex justify-start gap-1 flex-wrap pt-4">
                      {colorOptions.map((item, index) => (
                        <button
                          key={`color-option-${index}`}
                          onClick={() => setSelectedColor(item.index)}
                          className={cn({
                            "flex justify-center items-center w-8 h-8 rounded-full": true,
                            "border-2": selectedColor === item.index,
                            border: selectedColor !== item.index,
                          })}
                          style={{
                            backgroundColor: item.bgColor,
                            borderColor: item.borderColor,
                          }}
                        >
                          <CheckIcon
                            width={20}
                            className={cn({
                              "visible opacity-100":
                                selectedColor === item.index,
                              "invisible opacity-0":
                                selectedColor !== item.index,
                            })}
                          />
                        </button>
                      ))}
                    </div>
                    <div className="flex justify-end pt-4">
                      <button
                        onClick={createPlaylistHandler}
                        className="font-manrope text-primary text-sm border bg-white hover:bg-primary hover:text-white border-primary px-4 h-8 rounded-2xl transition-all"
                      >
                        Create
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-between px-7 py-4 rounded-b-3xl border-t">
              <button
                className="font-manrope text-primary text-sm"
                onClick={() => router.push("/playlists")}
              >
                Manage playlists
              </button>
              <ButtonOne
                click={createHandler}
                className={cn({
                  "w-24 h-10 !p-0 rounded-xl text-sm !px-4": true,
                  "!bg-[#E2E2E4] !text-[#B3B1B9] shadow-none pointer-events-none":
                    checkedList.length === 0,
                })}
                text={
                  <span className="flex gap-2">
                    <PlusCircleIcon width={18} />
                    <span>Add</span>
                  </span>
                }
              />
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </Fragment>
  );
};

export default AddToPlaylistModal;
