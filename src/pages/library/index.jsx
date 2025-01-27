import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import TabNav from "@/components/ui/tabs/tab-nav";
import TabPanel from "@/components/ui/tabs/tab-panel";
import {
  BriefcaseIcon,
  ClipboardIcon,
  DocumentIcon,
  FolderIcon,
  Square3Stack3DIcon,
  TagIcon,
  RectangleGroupIcon,
} from "@heroicons/react/24/outline";
import MaterialCard from "@/components/ui/cards/material-card";
import ItemCard from "@/components/ui/cards/item-card";
import useAuthHttpClient from "@/hooks/useAuthHttpClient";
import Spinner from "@/components/ui/spinner";
import { useAuth } from "@/providers/authProvider";
import LibraryHeader from "@/components/ui/libraryHeader";
import AddNewMatiereModal from "@/components/ui/modals/library/AddNewMatiereModal";
import { libraryAtom, updateLibraryState } from "@/store/store";
import AddNewItemModal from "@/components/ui/modals/library/AddNewItemModal";
import Tags from "@/components/ui/tags";
import Sessions from "@/components/ui/sessions";
import DPSComponent from "@/components/ui/dps";
import LibraryCard from "@/components/ui/cards/library-card";
import QuestionsComponent from "@/components/ui/questions";

const LibraryPage = () => {
  const authHttpClient = useAuthHttpClient();
  const { user } = useAuth();
  // const [activeTabIndex, setActiveTabIndex] = useState("matieres");
  const [searchKeyword, setSearchKeyword] = useState("");
  // const [materialsData, setMaterialsData] = useState([]);
  const [libraryState, setLibraryState] = useAtom(libraryAtom);

  // const [itemsData, setItemsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openNewMatiereModal, setOpenNewMatiereModal] = useState(false)
  const [openNewItemModal, setOpenNewItemModal] = useState(false);

  const [tabs, setTabs] = useState(
    user.role === "admin"
      ? [
        { name: "Matières", icon: BriefcaseIcon, current: true, code: "matieres" },
        { name: "Items", icon: FolderIcon, current: false, code: "items" },
        { name: "Cards", icon: ClipboardIcon, current: false, code: "cards" },
        { name: "Tags", icon: TagIcon, current: false, code: "tags" },
        { name: "Sessions", icon: Square3Stack3DIcon, current: false, code: "sessions" },
        { name: "DPs", icon: RectangleGroupIcon, current: false, code: "dps" },
        { name: "Questions", icon: DocumentIcon, current: false, code: "questions" },
      ] : [
        { name: "Matières", icon: BriefcaseIcon, current: true, code: "matieres" },
        { name: "Items", icon: FolderIcon, current: false, code: "items" },
      ]
  );

  useEffect(() => {
    const fetchData = async () => {
      if (authHttpClient) {
        setLoading(true);
        try {
          const [res1, res2] = await Promise.all([
            authHttpClient.get("/matiere"),
            authHttpClient.get("/item"),
          ]);
          updateLibraryState({
            materialsAtom: res1.data.data,
            itemsAtom: res2.data.data,
            isRenderingData: false
          });
          setLoading(false);
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      }
    };

    if (libraryState.isRenderingData) {
      fetchData();
    }
  }, [libraryState.isRenderingData]);

  const filteredMaterials = libraryState.materialsAtom.filter((item) =>
    item.name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const filteredItems = libraryState.itemsAtom.filter((item) =>
    item.name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <h2 className="my-8 font-sf-pro font-extrabold text-4xl">Library</h2>
        </div>
      </div>
      <div>
        <div className="flex gap-6 border-b border-[rgba(0,0,0,0.1)]">
          {tabs.map((item, index) => (
            <TabNav
              icon={item.icon}
              key={`tab-nav-${index}`}
              text={item.name}
              isActive={libraryState.activeTabIndex === item.code}
              click={() => {
                updateLibraryState({
                  activeTabIndex: item.code,
                  isRenderingData: true
                });
                // setActiveTabIndex(item.code);
              }}
            />
          ))}
        </div>
        <div>
          <TabPanel isActive={libraryState.activeTabIndex === "matieres"}>
            <LibraryHeader
              buttonTitle="Add New Matières"
              searchKeyword={searchKeyword}
              setSearchKeyword={setSearchKeyword}
              buttonClick={() => setOpenNewMatiereModal(true)}
            />
            <div className="flex flex-col gap-[18px]">
              {loading ? (
                <Spinner size="md" />
              ) : (
                filteredMaterials.map((item, index) => (
                  <MaterialCard key={`material-card-${index}`} data={item} />
                ))
              )}
            </div>
          </TabPanel>
          <TabPanel isActive={libraryState.activeTabIndex === "items"}>
            <LibraryHeader buttonTitle="Add New Item" searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} buttonClick={() => setOpenNewItemModal(true)}
            />
            <div className="flex flex-col gap-[18px]">
              {loading ? (
                <Spinner />
              ) : (
                filteredItems.map((item, index) => (
                  <ItemCard key={`item-card-${index}`} data={item} />
                ))
              )}
            </div>
          </TabPanel>
          <TabPanel isActive={libraryState.activeTabIndex === "cards"}>
            <LibraryCard />
          </TabPanel>
          <TabPanel isActive={libraryState.activeTabIndex === "tags"}>
            <Tags />
          </TabPanel>
          <TabPanel isActive={libraryState.activeTabIndex === "sessions"}>
            <Sessions />
          </TabPanel>
          <TabPanel isActive={libraryState.activeTabIndex === "dps"}>
            <DPSComponent />
          </TabPanel>
          <TabPanel isActive={libraryState.activeTabIndex === "questions"}>
            <QuestionsComponent />
          </TabPanel>
        </div>
      </div>

      <AddNewMatiereModal
        openNewMatiereModal={openNewMatiereModal}
        setOpenNewMatiereModal={setOpenNewMatiereModal}
      />
      <AddNewItemModal
        openModal={openNewItemModal}
        setOpenModal={setOpenNewItemModal}
      />

    </div>
  );
};

export default LibraryPage;
