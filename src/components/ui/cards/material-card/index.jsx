import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import * as cn from "classnames";
import { Collapse } from "react-collapse";
import DataTable from "react-data-table-component";
import AngleDown from "@/assets/icons/angle-down";
import ProgressBar from "../../progress-bar";
import VerticalDivider from "../../vertical-divider";
import ChatIcon from "@/assets/icons/chart-icon";
import ListIcon from "@/assets/icons/list-icon";
import { columns, customStyles } from "@/constants/mockup-data/library";
import Image from "next/image";
import { useAuth } from "@/providers/authProvider";
import { Bars3Icon, TrashIcon } from "@heroicons/react/24/outline";
import DeleteModal from "../../modals/deleteModal";
import useAuthHttpClient from "@/hooks/useAuthHttpClient";
import { updateLibraryState } from "@/store/store";
import { Toaster, ToastType } from "../../toaster";

const MaterialCard = ({ data }) => {
  const authHttpClient = useAuthHttpClient();
  const router = useRouter();
  const { user } = useAuth();

  const [completed, setCompleted] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [openDeleteModal, setOpenDeleteModal] = useState(false)

  useEffect(() => {
    if (data.n_items === 0) {
      setCompleted(0);
    } else {
      if (data.n_questions <= 0) {
        setCompleted(0);
      } else if (data.n_questions >= data.n_items) {
        setCompleted(100);
      } else {
        setCompleted((data.n_questions / data.n_items) * 100);
      }
    }
  }, [data]);


  const handleDeleteMaterial = async (e) => {
    setDeleting(true);
    try {
      await authHttpClient.delete(`/matiere/${data._id}`);
      setDeleting(false);
      setOpenDeleteModal(false);
      Toaster(ToastType.SUCCESS, "Matiere deleted successfully!!!");
      updateLibraryState({
        isRenderingData: true
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="shadow-card rounded-lg">
      <div className="flex items-center gap-4 px-5 py-7 bg-white text-black rounded-t-lg">
        <Image
          src={data.image}
          alt={data.name}
          width={32}
          height={32}
          className="object-contain"
        />
        <div className="flex flex-col justify-center flex-1 gap-2">
          <h3 className="w-full font-manrope font-extrabold">{data.name}</h3>
          <ProgressBar percent={completed} />
        </div>
        <VerticalDivider className="!h-16 mx-6" />
        <div className="flex px-5 py-2 bg-[#FAFAFA] rounded-md">
          <div className="flex flex-col justify-center items-center">
            <ChatIcon />
            <span className="mt-2 text-xs text-[#2F3037] font-manrope font-bold leading-none">
              {completed.toFixed(0)} %
            </span>
            <span className="text-xs text-[#C8C9CE] font-manrope">
              completed
            </span>
          </div>
          <div className="px-6">
            <VerticalDivider className="h-12" />
          </div>
          <div className="flex flex-col justify-center items-center">
            <ListIcon />
            <span className="mt-2 text-xs text-[#2F3037] font-manrope font-bold leading-none">
              {data.n_questions}
            </span>
            <span className="text-xs text-[#C8C9CE] font-manrope">
              questions
            </span>
          </div>
        </div>
        {/* <ButtonOne
          text="Start"
          click={() => {
            router.push(`/library/${data.slug}`);
          }}
          className="h-[42px] !px-4 !py-3 leading-none"
        /> */}
        {
          user && user.role === "admin" && (
            <>
              <button
                // onClick={editAction}
                type="button"
                className="click-action inline-flex justify-between border border-gray-300 items-center gap-x-1.5 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold hover:text-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 hover:outline-primary-600"
              >
                Edit
                <Bars3Icon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
              </button>
              <button
                onClick={() => setOpenDeleteModal(true)}
                type="button"
                className="click-action inline-flex justify-between border border-gray-300 items-center gap-x-1.5 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold hover:text-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 hover:outline-primary-600"
              >
                Delete
                <TrashIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
              </button>
            </>
          )
        }

      </div>
      <div className="bg-[#FCFCFD] border-t">
        <Collapse
          isOpened={expanded}
          initialStyle={{ height: 0, overflow: "hidden" }}
        >
          <DataTable
            columns={columns}
            data={data}
            customStyles={customStyles}
          />
        </Collapse>
      </div>
      <div className="flex items-center h-14 px-4 bg-[#FAFAFA] rounded-b-lg">
        <button
          className="flex items-center cursor-pointer"
          onClick={() => {
            setExpanded(!expanded);
          }}
        >
          <span
            className={cn({
              "transition-all duration-300": true,
              "rotate-180": expanded,
            })}
          >
            <AngleDown />
          </span>
          <span className="ml-4 font-inter font-medium text-sm text-[#85868E]">
            Détails
          </span>
        </button>
      </div>
      <DeleteModal
        title="matiere"
        openModal={openDeleteModal}
        setOpenModal={setOpenDeleteModal}
        isDeleting={deleting}
        handleDelete={handleDeleteMaterial}
      />
    </div>
  );
};

export default MaterialCard;
