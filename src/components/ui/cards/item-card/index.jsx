import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import VerticalDivider from "../../vertical-divider";
import ProgressBar from "../../progress-bar";
import ChatIcon from "@/assets/icons/chart-icon";
import ListIcon from "@/assets/icons/list-icon";
import EyeIcon from "@/assets/icons/eye";
import EditIcon from "@/assets/icons/edit";
import { appStore, modal, updateLibraryState } from "@/store/store";
import useAuthHttpClient from "@/hooks/useAuthHttpClient";
import Spinner from "../../spinner";
import { TrashIcon } from "@heroicons/react/24/outline";
import DeleteModal from "../../modals/deleteModal";
import { Toaster, ToastType } from "../../toaster";
import EditNewItemModal from "../../modals/library/EditNewItemModal";

const ItemCard = ({ data }) => {
  const router = useRouter();

  const [material, setMaterial] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const hasFetchedMaterial = useRef(false); // Ref to track if the material data has been fetched
  const [deleting, setDeleting] = useState(false);

  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [editNewItemModal, setEditNewItemModal] = useState(false)

  const itemViewHandler = () => {
    if (material) {
      router.push(`/library/${material._id}/${data._id}`);
    }
  };

  const openModal = () => {
    const currentModalState = appStore.get(modal);
    appStore.set(modal, { ...currentModalState, launchTraining: true });
  };

  const authHttpClient = useAuthHttpClient();

  useEffect(() => {
    if (!hasFetchedMaterial.current && authHttpClient && data) {
      authHttpClient.get(`/matiere/${data.matiere_id}`).then((response) => {
        setMaterial(response.data.data);
        setLoaded(true);
        hasFetchedMaterial.current = true; // Mark as fetched
      }).catch((err) => {
        console.error(err);
        setLoaded(true); // Also set loaded to true if there's an error to prevent spinner from showing indefinitely
      });
    }
  }, [authHttpClient, data]);

  const handleDeleteItem = async (e) => {
    setDeleting(true);
    try {
      await authHttpClient.delete(`/item/${data._id}`);
      setDeleting(false);
      setOpenDeleteModal(false);
      Toaster(ToastType.SUCCESS, "Item deleted successfully!");
      updateLibraryState({
        isRenderingData: true
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center px-12 pt-3 pb-4 shadow-card rounded-lg bg-white text-black">
      <div className="flex flex-col gap-2 flex-1">
        <h3 className="font-manrope font-bold">
          {data.item_number}. {data.name}
        </h3>
        <div className="max-w-[640px]">
          <ProgressBar
            percent={data.total > 0 ? (data.done / data.total) * 100 : 0}
          />
        </div>
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <ChatIcon />
            <span className="font-manrope text-xs text-[#85868E]">
              {data.total > 0 ? ((data.done / data.total) * 100).toFixed(0) : 0}% completed
            </span>
          </div>
          <div className="flex items-center gap-2">
            <ListIcon />
            <span className="font-manrope text-xs text-[#85868E]">
              {data.n_questions} Questions
            </span>
          </div>
        </div>
      </div>
      {material ? (
        <button
          onClick={() => router.push(`/library/${data.parent}`)}
          className="group flex gap-2 items-center border h-10 px-4 rounded-3xl ml-8 hover:border-primary hover:animate-rebound transition-all"
        >
          <img src={material.image} width={16} />{" "}
          <span className="font-manrope font-semibold text-sm">
            {material.name}
          </span>
        </button>
      ) : (
        <div className="w-40">
          {loaded ? <div>No material data</div> : <Spinner />}
        </div>
      )}
      <VerticalDivider className="!h-[58px] mx-8" />
      <div className="flex gap-5">
        {/* <button onClick={itemViewHandler} className="group">
          <EyeIcon />
        </button> */}
        <button onClick={() => setEditNewItemModal(true)} className="group">
          <EditIcon className="w-7 h-7" />
        </button>
        <button
          onClick={() => setOpenDeleteModal(true)}
          className="group">
          <TrashIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <DeleteModal
        title="Item"
        openModal={openDeleteModal}
        setOpenModal={setOpenDeleteModal}
        isDeleting={deleting}
        handleDelete={handleDeleteItem}
      />
      <EditNewItemModal
        currentItem={data}
        openModal={editNewItemModal}
        setOpenModal={setEditNewItemModal}
      />
    </div>
  );
};

export default ItemCard;
