import EditIcon from "@/assets/icons/edit";
import ProgressBar from "@/components/ui/progress-bar";
import SpreadItemView from "@/components/ui/spread-item-view";
import SpreadMaterialView from "@/components/ui/spread-material-view";
import { appStore, modal } from "@/store/store";
import { TrashIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export const materialsDummyData = [
  {
    name: "Cardiologie",
    slug: "cardiologie",
    logo: "/images/cardiologie.png",
    data: [
      {
        index: 101,
        title: "Insuffisance cardiaque",
        total: 12,
        done: 4,
      },
      {
        index: 102,
        title: "Hypertension artérielle",
        total: 15,
        done: 10,
      },
      {
        index: 103,
        title: "Arythmies cardiaques",
        total: 8,
        done: 3,
      },
      {
        index: 104,
        title: "Maladie coronaire",
        total: 12,
        done: 6,
      },
      {
        index: 105,
        title: "Valvulopathies",
        total: 10,
        done: 0,
        status: "À FAIRE",
      },
      {
        index: 106,
        title: "Myocardites et péricardites",
        total: 7,
        done: 7,
        status: "FAIT",
      },
    ],
  },
  {
    name: "Chirurgie Orthopédique",
    slug: "chirurgie_orthopédique",
    logo: "/images/chirurgie-orthopédique.png",
    data: [
      {
        index: 126,
        title: "Trouble de l’érection",
        total: 10,
        done: 2,
      },
      {
        index: 96,
        title: "Myasthénie",
        total: 10,
        done: 8,
      },
      {
        index: 265,
        title: "Lithiase urinaire",
        total: 10,
        done: 1,
      },
      {
        index: 330,
        title: "Hémorragies méningées",
        total: 10,
        done: 2,
      },
      {
        index: 268,
        title: "Hypercalcémie",
        total: 10,
        done: 0,
        status: "À FAIRE",
      },
      {
        index: 259,
        title: "Protéinurie et syndrome néphrotique chez l’adulte et l’enfant",
        total: 10,
        done: 10,
        status: "FAIT",
      },
    ],
  },
  {
    name: "Dermatologie",
    slug: "dermatologie",
    logo: "/images/dermatologie.png",
    data: [
      {
        index: 201,
        title: "Acné vulgaire",
        total: 9,
        done: 5,
      },
      {
        index: 202,
        title: "Psoriasis",
        total: 11,
        done: 7,
      },
      {
        index: 203,
        title: "Dermatite atopique",
        total: 10,
        done: 1,
      },
      {
        index: 204,
        title: "Urticaire",
        total: 8,
        done: 8,
        status: "FAIT",
      },
      {
        index: 205,
        title: "Mélanome",
        total: 7,
        done: 2,
      },
      {
        index: 206,
        title: "Infections cutanées bactériennes",
        total: 10,
        done: 4,
        status: "À FAIRE",
      },
    ],
  },
  {
    name: "Endocrinologie - Diabétologie - Nutrition",
    slug: "endocrinologie_diabétologie-nutrition",
    logo: "/images/endocrinologie-diabétologie-nutrition.png",
    data: [
      {
        index: 301,
        title: "Diabète de type 1",
        total: 14,
        done: 5,
      },
      {
        index: 302,
        title: "Diabète de type 2",
        total: 16,
        done: 16,
        status: "FAIT",
      },
      {
        index: 303,
        title: "Obésité",
        total: 10,
        done: 2,
      },
      {
        index: 304,
        title: "Hyperthyroïdie",
        total: 12,
        done: 3,
      },
      {
        index: 305,
        title: "Hypothyroïdie",
        total: 10,
        done: 1,
        status: "À FAIRE",
      },
      {
        index: 306,
        title: "Ostéoporose",
        total: 8,
        done: 7,
      },
    ],
  },
];

export const itemsData = [
  {
    index: 129,
    parent: "cardiologie",
    name: "Syndromes coronariens aigus",
    total: 20,
    done: 0,
  },
  {
    index: 138,
    parent: "cardiologie",
    name: "Péricardite aiguë",
    total: 16,
    done: 0,
  },
  {
    index: 165,
    parent: "cardiologie",
    name: "Insuffisance cardiaque",
    total: 22,
    done: 0,
  },
  {
    index: 245,
    parent: "cardiologie",
    name: "Fibrillation atriale",
    total: 12,
    done: 0,
  },
  {
    index: 336,
    parent: "cardiologie",
    name: "Myocardite",
    total: 8,
    done: 0,
  },
  {
    index: 401,
    parent: "cardiologie",
    name: "Syndromes coronariens aigus #1",
    total: 25,
    done: 0,
  },
  {
    index: 402,
    parent: "cardiologie",
    name: "Péricardite aiguë #2",
    total: 21,
    done: 0,
  },
  {
    index: 403,
    parent: "cardiologie",
    name: "Insuffisance cardiaque #3",
    total: 28,
    done: 0,
  },
  {
    index: 404,
    parent: "cardiologie",
    name: "Fibrillation atriale #4",
    total: 18,
    done: 0,
  },
  {
    index: 405,
    parent: "cardiologie",
    name: "Myocardite #5",
    total: 13,
    done: 0,
  },
  {
    index: 406,
    parent: "cardiologie",
    name: "Syndromes coronariens aigus #6",
    total: 27,
    done: 0,
  },
  {
    index: 407,
    parent: "cardiologie",
    name: "Péricardite aiguë #7",
    total: 17,
    done: 0,
  },
  {
    index: 408,
    parent: "cardiologie",
    name: "Insuffisance cardiaque #8",
    total: 30,
    done: 0,
  },
  {
    index: 409,
    parent: "cardiologie",
    name: "Fibrillation atriale #9",
    total: 20,
    done: 0,
  },
  {
    index: 410,
    parent: "cardiologie",
    name: "Myocardite #10",
    total: 16,
    done: 0,
  },
];

export const questionTypes = [
  { name: "DPs", value: "dps" },
  { name: "QIs", value: "qis" },
  { name: "All", value: "all" },
];

export const sessionTypes = [
  { name: "Annales", value: "annales" },
  { name: "Library", value: "library" },
  { name: "All", value: "all" },
];

export const annalesTypes = [
  { name: "Library", value: "library" },
  { name: "Annales", value: "annales" },
  { name: "Both", value: "Both" },
];

export const rangTypes = [
  { name: "A", value: "a" },
  { name: "B", value: "b" },
  { name: "All", value: "All" },
];

export const successTypes = [
  { name: "Succeeded", value: "succeeded" },
  { name: "Failed", value: "failed" },
  { name: "All", value: "all" },
];

export const historyType = [
  { name: "Tried", value: "tried" },
  { name: "Never tried", value: "never_tried" },
  { name: "Both", value: "Both" },
];

export const itemOptions = [
  { name: "Item 1", value: "item1" },
  { name: "Item 2", value: "item2" },
  { name: "Item 3", value: "item3" },
];

export const columns = [
  {
    name: "Items",
    selector: (row) => (
      <Link href="/library/cardiologie/336.Myocardite">
        <div className="flex items-center gap-1 h-8 px-2 w-fit rounded-full bg-[#F3F3F4] border border-[#E2E2E4] shadow hover:animate-rebound">
          <span className="item-index flex justify-center items-center h-6 w-6 shadow-md py-1 text-[8px] tracking-tight font-manrope font-semibold border border-[#ECECED] rounded bg-white">
            {row.index}
          </span>
          <span className="font-manrope font-bold text-xs">{row.title}</span>
        </div>
      </Link>
    ),
    sortable: true,
    sortFunction: (rowA, rowB) => {
      const a = rowA.index;
      const b = rowB.index;

      if (a > b) {
        return 1;
      }

      if (b > a) {
        return -1;
      }

      return 0;
    },
  },
  {
    name: "Status",
    selector: (row) => {
      if (row.status === "FAIT") {
        return (
          <div className="flex justify-center items-center w-[72px] shadow-md h-6 text-xs font-manrope font-extrabold bg-[#F0FFF6] border border-[#297144] rounded-full text-[#154228]">
            FAIT
          </div>
        );
      } else if (row.status === "À FAIRE") {
        return (
          <div className="flex justify-center items-center w-[72px] shadow-md h-6 text-xs font-manrope font-extrabold bg-[#FEF2F2] border border-[#F57474] rounded-full text-[#751D1D]">
            À FAIRE
          </div>
        );
      } else {
        return <></>;
      }
    },
    // sortable: true,
    // sortFunction: (rowA, rowB) => {
    //   const a = rowA.status;
    //   const b = rowB.status;

    //   if (a === "FAIT") {
    //     return 1;
    //   }

    //   if (a === "À FAIRE") {
    //     return -1;
    //   }

    //   return 0;
    // },
  },
  {
    name: "Questions",
    selector: (row) => (
      <div className="text-xs font-manrope font-medium text-[#667085]">
        {row.total > 0 ? row.total : 0} questions
      </div>
    ),
    sortable: true,
    sortFunction: (rowA, rowB) => {
      const a = rowA.total;
      const b = rowB.total;

      if (a > b) {
        return 1;
      }

      if (b > a) {
        return -1;
      }

      return 0;
    },
  },
  {
    name: "Progress",
    selector: (row) => (
      <div className="flex items-center">
        <ProgressBar
          percent={row.total > 0 ? (row.done / row.total) * 100 : 0}
          dark={true}
        />
        <span className="w-12 ml-2 text-right text-xs text-[#667085] font-manrope">
          {row.total > 0 ? ((row.done / row.total) * 100).toFixed(0) : 0} %
        </span>
        <button
          onClick={() => {
            appStore.set(modal, { ...appStore.get(modal), customTest: true });
          }}
          className="ml-8 group"
        >
          <EditIcon />
        </button>
      </div>
    ),
    sortable: true,
    sortFunction: (rowA, rowB) => {
      const a = rowA.total > 0 ? (rowA.done / rowA.total) * 100 : 0;
      const b = rowB.total > 0 ? (rowB.done / rowB.total) * 100 : 0;

      if (a > b) {
        return 1;
      }

      if (b > a) {
        return -1;
      }

      return 0;
    },
  },
];

export const customStyles = {
  header: {
    style: {
      minHeight: "48px",
    },
  },
  headRow: {
    style: {
      borderBottomStyle: "solid",
      borderBottomWidth: "1px",
      borderBottomColor: "#EAECF0",
    },
  },
  headCells: {
    style: {
      color: "#667085",
      fontSize: "14px",
      fontWeight: "medium",
      fontFamily: "Manrope",
      transition: "all",
      "&:hover": {
        color: "#151A1E ",
      },
      "&:nth-child(1)": {
        flex: 8,
      },
      "&:nth-child(2)": {
        flex: 2,
      },
      "&:nth-child(3)": {
        flex: 1.5,
      },
      "&:nth-child(4)": {
        flex: 7,
      },
    },
  },
  rows: {
    style: {
      borderBottomStyle: "solid",
      borderBottomWidth: "1px",
      borderBottomColor: "#EAECF0",
    },
  },
  cells: {
    style: {
      "&:nth-child(1)": {
        flex: 8,
      },
      "&:nth-child(2)": {
        flex: 2,
      },
      "&:nth-child(3)": {
        flex: 1.5,
      },
      "&:nth-child(4)": {
        flex: 7,
      },
    },
  },
};

export const playlistData = [
  {
    id: 1,
    name: "Révisions",
    fontColor: "#4940AF",
    borderColor: "#E9E8FD",
    bgColor: "#F3F2FE",
  },
  {
    id: 2,
    name: "QCM DURS À REVOIR",
    fontColor: "#9A1583",
    borderColor: "#FBE6FD",
    bgColor: "#FEF8FE",
  },
  {
    id: 3,
    name: "NUL",
    fontColor: "#FCBF06",
    borderColor: "#FFF787",
    bgColor: "#FFFEED",
  },
  {
    id: 4,
    name: "erreurs listées",
    fontColor: "#494656",
    borderColor: "#E2E2E4",
    bgColor: "#F8F8F8",
  },
  {
    id: 5,
    name: "Playlist 7",
    fontColor: "#751D1D",
    borderColor: "#F57474",
    bgColor: "#FEF2F2",
  },
  {
    id: 6,
    name: "Playlist 5",
    fontColor: "#154228",
    borderColor: "#AFFAD0",
    bgColor: "#F0FFF6",
  },
  {
    id: 7,
    name: "Playlist 5",
    fontColor: "#154228",
    borderColor: "#AFFAD0",
    bgColor: "#F0FFF6",
  },
];

export const questionsData = [
  {
    qId: "1",
    qType: "DP",
    edn: "EDN 2023",
    playlists: [1],
    items: [
      {
        index: 145,
        title: "Surveillance des maladies infectieuses trans...",
      },
    ],
    lastScore: {
      current: 20,
      total: 20,
    },
  },
  {
    qId: "29",
    qType: "QI",
    edn: "EDN 2023",
    playlists: [2],
    items: [
      {
        index: 133,
        title: "Autonomie et dépendance chez le sujet âgé",
      },
    ],
    lastScore: {
      current: 19,
      total: 20,
    },
  },
  {
    qId: "1",
    qType: "DP",
    edn: "EDN 2023",
    playlists: [3, 4],
    items: [
      {
        index: 96,
        title: "Myasthénie",
      },
    ],
    lastScore: {
      current: 14.5,
      total: 20,
    },
  },
  {
    qId: "336-22",
    qType: "QI",
    playlists: [1],
    items: [
      {
        index: 330,
        title: "Hémorragies méningées",
      },
      {
        index: 186,
        title: "Oreillons",
      },
      {
        index: 186,
        title: "Oreillons",
      },
    ],
    lastScore: {
      current: 10,
      total: 20,
    },
  },
  {
    qId: "336-22",
    qType: "QI",
    playlists: [5],
    items: [
      {
        index: 268,
        title: "Hypercalcémie",
      },
    ],
    lastScore: {
      current: 0,
      total: 20,
    },
  },
  {
    qId: "1",
    qType: "DP",
    edn: "EDN 2023",
    playlists: [6],
    items: [
      {
        index: 259,
        title: "Protéinurie et syndrome néphrotique chez...",
      },
    ],
    lastScore: {
      current: 20,
      total: 20,
    },
  },
  {
    qId: "22-13",
    qType: "QI",
    edn: "EDN 2023",
    playlists: [3, 4],
    items: [
      {
        index: 87,
        title: "Epistaxis",
      },
      {
        index: 152,
        title: "Endocardites infectieuses",
      },
      {
        index: 152,
        title: "Endocardites infectieuses",
      },
      {
        index: 152,
        title: "Endocardites infectieuses",
      },
      {
        index: 152,
        title: "Endocardites infectieuses",
      },
    ],
    lastScore: {
      current: 20,
      total: 20,
    },
  },
  {
    qId: "1",
    qType: "DP",
    edn: "EDN 2023",
    playlists: [1],
    items: [
      {
        index: 101,
        title: "Paralysie faciale",
      },
      {
        index: 102,
        title: "Diplopie",
      },
    ],
    lastScore: {
      current: 10,
      total: 20,
    },
  },
  {
    qId: "198-07",
    qType: "QI",
    playlists: [1],
    items: [
      {
        index: 121,
        title: "Le handicap psychique",
      },
    ],
    lastScore: {
      current: 4,
      total: 20,
    },
  },
];

export const questionCustomStyles = {
  header: {
    style: {
      minHeight: "48px",
    },
  },
  headRow: {
    style: {
      borderBottomStyle: "solid",
      borderBottomWidth: "1px",
      borderBottomColor: "#EAECF0",
    },
  },
  headCells: {
    style: {
      color: "#667085",
      fontSize: "14px",
      fontWeight: "medium",
      fontFamily: "Manrope",
      transition: "all",
      "&:hover": {
        color: "#151A1E ",
      },
      "&:nth-child(1)": {
        flex: 1,
      },
      "&:nth-child(2)": {
        flex: 1.5,
      },
      "&:nth-child(3)": {
        flex: 1.5,
      },
      "&:nth-child(4)": {
        flex: 7,
      },
      "&:nth-child(5)": {
        flex: 1.5,
      },
      "&:nth-child(6)": {
        flex: 1,
      },
    },
  },
  rows: {
    style: {
      borderBottomStyle: "solid",
      borderBottomWidth: "1px",
      borderBottomColor: "#EAECF0",
    },
  },
  cells: {
    style: {
      "&:nth-child(1)": {
        flex: 1,
      },
      "&:nth-child(2)": {
        flex: 1.5,
      },
      "&:nth-child(3)": {
        flex: 1.5,
      },
      "&:nth-child(4)": {
        flex: 7,
      },
      "&:nth-child(5)": {
        flex: 1.5,
      },
      "&:nth-child(6)": {
        flex: 1,
      },
    },
  },
};

export const questionColumns = [
  {
    name: "Question ID",
    selector: (row) => (
      <div className="flex items-center gap-1 h-7 px-1.5 w-fit rounded-lg bg-[#F3F3F4] border border-[#E2E2E4] !overflow-visible">
        {row.edn && (
          <span className="item-index flex justify-center items-center h-5 px-0.5 py-1 text-[8px] tracking-tight text-white font-manrope border border-[#2F3037] bg-[#2F3037] rounded">
            {row.edn}
          </span>
        )}
        <span className="font-manrope font-bold text-xs">
          {row.qType} {row.qId}
        </span>
      </div>
    ),
  },
  {
    name: "Playlist",
    selector: (row) => {
      const rowPlaylist = playlistData.filter((item) =>
        row.playlists.includes(item.id)
      );
      return (
        <div className="flex justify-center gap-1 !overflow-visible">
          {rowPlaylist.length > 0 &&
            rowPlaylist.map((item, index) => (
              <Link
                href="/playlists"
                key={`playlist-item-${index}`}
                className="flex justify-center items-center h-7 px-2 text-xs font-manrope rounded-full border shadow hover:animate-rebound"
                style={{
                  color: item.fontColor,
                  borderColor: item.borderColor,
                  backgroundColor: item.bgColor,
                }}
              >
                {item.name}
              </Link>
            ))}
        </div>
      );
    },
    sortable: true,
    sortFunction: (rowA, rowB) => {
      const a = rowA.playlists ? rowA.playlists : [];
      const b = rowB.playlists ? rowB.playlists : [];

      if (a.length > b.length) {
        return 1;
      } else {
        return -1;
      }
    },
  },
  {
    name: "Items",
    selector: (row) => {
      return (
        <>{row.items && <SpreadItemView items={row.items} length={2} />}</>
      );
    },
    sortable: true,
    sortFunction: (rowA, rowB) => {
      const a = rowA.items ?? [];
      const b = rowB.items ?? [];

      if (a.length > b.length) {
        return 1;
      } else {
        return -1;
      }
    },
  },
  {
    name: "Last score",
    selector: (row) => (
      <div>
        {row.lastScore && (
          <span className="font-manrope text-normal text-[#667085]">
            {row.lastScore.current}/{row.lastScore.total}
          </span>
        )}
      </div>
    ),
    sortable: true,
    sortFunction: (rowA, rowB) => {
      const a = rowA.lastScore
        ? rowA.lastScore.current / rowA.lastScore.total
        : 0;
      const b =
        rowB.lastScore > 0 ? rowB.lastScore.current / rowB.lastScore.total : 0;

      if (a > b) {
        return 1;
      }

      if (b > a) {
        return -1;
      }

      return 0;
    },
  },
  {
    name: "",
    selector: (row) => (
      <div className="flex justify-around">
        <button className="group">
          <EditIcon />
        </button>
        <button className="group">
          <TrashIcon
            width={17}
            height={17}
            className="text-[#E2E2E4] group-hover:text-primary transition-all duration-300"
          />
        </button>
      </div>
    ),
  },
];

export const historyData = [
  {
    qId: "1",
    qType: "DP",
    edn: "EDN 2023",
    items: [
      {
        index: 145,
        title: "Surveillance des maladies infectieuses trans...",
      },
    ],
    lastScore: {
      current: 20,
      total: 20,
    },
    lastAssessed: "7 days ago",
    star: true,
  },
  {
    qId: "29",
    qType: "QI",
    edn: "EDN 2023",
    items: [
      {
        index: 133,
        title: "Autonomie et dépendance chez le sujet âgé",
      },
    ],
    lastScore: {
      current: 19,
      total: 20,
    },
    lastAssessed: "7 days ago",
    star: false,
  },
  {
    qId: "1",
    qType: "DP",
    edn: "EDN 2023",
    items: [
      {
        index: 96,
        title: "Myasthénie",
      },
    ],
    lastScore: {
      current: 14.5,
      total: 20,
    },
    lastAssessed: "7 days ago",
    star: false,
  },
  {
    qId: "336-22",
    qType: "QI",
    items: [
      {
        index: 330,
        title: "Hémorragies méningées",
      },
      {
        index: 186,
        title: "Oreillons",
      },
      {
        index: 186,
        title: "Oreillons",
      },
    ],
    lastScore: {
      current: 10,
      total: 20,
    },
    lastAssessed: "7 days ago",
    star: false,
  },
  {
    qId: "336-22",
    qType: "QI",
    items: [
      {
        index: 268,
        title: "Hypercalcémie",
      },
    ],
    lastScore: {
      current: 0,
      total: 20,
    },
    lastAssessed: "7 days ago",
    star: false,
  },
  {
    qId: "1",
    qType: "DP",
    edn: "EDN 2023",
    items: [
      {
        index: 259,
        title: "Protéinurie et syndrome néphrotique chez...",
      },
    ],
    lastScore: {
      current: 20,
      total: 20,
    },
    lastAssessed: "14 days ago",
    star: false,
  },
  {
    qId: "22-13",
    qType: "QI",
    edn: "EDN 2023",
    items: [
      {
        index: 87,
        title: "Epistaxis",
      },
      {
        index: 152,
        title: "Endocardites infectieuses",
      },
      {
        index: 152,
        title: "Endocardites infectieuses",
      },
      {
        index: 152,
        title: "Endocardites infectieuses",
      },
      {
        index: 152,
        title: "Endocardites infectieuses",
      },
    ],
    lastScore: {
      current: 20,
      total: 20,
    },
    lastAssessed: "1 month ago",
    star: true,
  },
  {
    qId: "1",
    qType: "DP",
    edn: "EDN 2023",
    items: [
      {
        index: 101,
        title: "Paralysie faciale",
      },
      {
        index: 102,
        title: "Diplopie",
      },
    ],
    lastScore: {
      current: 10,
      total: 20,
    },
    lastAssessed: "3 month ago",
    star: false,
  },
  {
    qId: "198-07",
    qType: "QI",
    items: [
      {
        index: 121,
        title: "Le handicap psychique",
      },
    ],
    lastScore: {
      current: 4,
      total: 20,
    },
    lastAssessed: "5 month ago",
    star: true,
  },
];

export const historyCustomStyles = {
  header: {
    style: {
      minHeight: "48px",
    },
  },
  headRow: {
    style: {
      borderBottomStyle: "solid",
      borderBottomWidth: "1px",
      borderBottomColor: "#EAECF0",
    },
  },
  headCells: {
    style: {
      color: "#667085",
      fontSize: "14px",
      fontWeight: "medium",
      fontFamily: "Manrope",
      transition: "all",
      "&:hover": {
        color: "#151A1E ",
      },
      "&:nth-child(1)": {
        flex: 1,
      },
      "&:nth-child(2)": {
        flex: 1.5,
      },
      "&:nth-child(3)": {
        flex: 7,
      },
      "&:nth-child(4)": {
        flex: 1,
      },
      "&:nth-child(5)": {
        flex: 1,
      },
      "&:nth-child(6)": {
        flex: 1,
      },
    },
  },
  rows: {
    style: {
      borderBottomStyle: "solid",
      borderBottomWidth: "1px",
      borderBottomColor: "#EAECF0",
    },
  },
  cells: {
    style: {
      "&:nth-child(1)": {
        flex: 1,
      },
      "&:nth-child(2)": {
        flex: 1.5,
      },
      "&:nth-child(3)": {
        flex: 7,
      },
      "&:nth-child(4)": {
        flex: 1,
      },
      "&:nth-child(5)": {
        flex: 1,
      },
      "&:nth-child(6)": {
        flex: 1,
      },
    },
  },
};

export const historyColumns = [
  {
    name: "Intitulé",
    selector: (row) => (
      <div className="flex items-center gap-1 h-7 px-1.5 w-fit rounded-lg bg-[#F3F3F4] border border-[#E2E2E4] shadow-gray !overflow-visible">
        {row.edn && (
          <span className="item-index flex justify-center items-center h-5 px-0.5 py-1 text-[8px] tracking-tight text-white font-manrope border border-[#2F3037] bg-[#2F3037] rounded shadow-gray-md">
            {row.edn}
          </span>
        )}
        <span className="font-manrope font-bold text-xs">
          {row.qType} {row.qId}
        </span>
      </div>
    ),
  },
  {
    name: "Items",
    selector: (row) => {
      return (
        <>{row.items && <SpreadItemView items={row.items} length={2} />}</>
      );
    },
    sortable: true,
    sortFunction: (rowA, rowB) => {
      const a = rowA.items ?? [];
      const b = rowB.items ?? [];

      if (a.length > b.length) {
        return 1;
      } else {
        return -1;
      }
    },
  },
  {
    name: "Last score",
    selector: (row) => (
      <div>
        {row.lastScore && (
          <span className="font-manrope text-normal text-[#667085]">
            {row.lastScore.current}/{row.lastScore.total}
          </span>
        )}
      </div>
    ),
    sortable: true,
    sortFunction: (rowA, rowB) => {
      const a = rowA.lastScore
        ? rowA.lastScore.current / rowA.lastScore.total
        : 0;
      const b =
        rowB.lastScore > 0 ? rowB.lastScore.current / rowB.lastScore.total : 0;

      if (a > b) {
        return 1;
      }

      if (b > a) {
        return -1;
      }

      return 0;
    },
  },
  {
    name: "Last assessed",
    selector: (row) => (
      <div>
        {row.lastScore && (
          <span className="font-manrope text-normal text-[#667085]">
            {row.lastAssessed}
          </span>
        )}
      </div>
    ),
    sortable: true,
    sortFunction: (rowA, rowB) => {
      const a = rowA.lastScore
        ? rowA.lastScore.current / rowA.lastScore.total
        : 0;
      const b =
        rowB.lastScore > 0 ? rowB.lastScore.current / rowB.lastScore.total : 0;

      if (a > b) {
        return 1;
      }

      if (b > a) {
        return -1;
      }

      return 0;
    },
  },
  {
    name: "",
    selector: (row) => (
      <div className="flex justify-around">
        <button className="group">
          <EditIcon />
        </button>
        <button className="group">
          {row.star ? (
            <StarIcon
              width={17}
              height={17}
              className="text-[#F29C1F] group-hover:text-primary transition-all duration-300"
            />
          ) : (
            <StarIcon
              width={17}
              height={17}
              className="text-[#EAECF0] group-hover:text-[#F29C1F] transition-all duration-300"
            />
          )}
        </button>
      </div>
    ),
  },
];

export const annalesItemData = [
  {
    qId: "1",
    qType: "DP",
    edn: "EDN 2023",
    lastScore: {
      current: 20,
      total: 20,
    },
    lastAssessed: "7 days ago",
  },
  {
    qId: "29",
    qType: "QI",
    edn: "EDN 2023",
    lastScore: {
      current: 19,
      total: 20,
    },
    lastAssessed: "7 days ago",
  },
  {
    qId: "1",
    qType: "DP",
    edn: "EDN 2023",
    lastScore: {
      current: 14.5,
      total: 20,
    },
    lastAssessed: "7 days ago",
  },
  {
    qId: "336-22",
    qType: "QI",
    edn: "EDN 2023",
    lastScore: {
      current: 10,
      total: 20,
    },
    lastAssessed: "7 days ago",
  },
  {
    qId: "336-22",
    qType: "QI",
    edn: "EDN 2023",
    lastScore: {
      current: 0,
      total: 20,
    },
    lastAssessed: "7 days ago",
  },
  {
    qId: "1",
    qType: "DP",
    edn: "EDN 2023",
    lastScore: {
      current: 20,
      total: 20,
    },
    lastAssessed: "14 days ago",
  },
  {
    qId: "22-13",
    qType: "QI",
    edn: "EDN 2023",
    lastScore: {
      current: 20,
      total: 20,
    },
    lastAssessed: "1 month ago",
  },
  {
    qId: "1",
    qType: "DP",
    edn: "EDN 2023",
    lastScore: {
      current: 10,
      total: 20,
    },
    lastAssessed: "3 month ago",
  },
  {
    qId: "198-07",
    qType: "QI",
    edn: "EDN 2023",
    lastScore: {
      current: 4,
      total: 20,
    },
    lastAssessed: "5 month ago",
  },
];

export const annalesItemCustomStyles = {
  header: {
    style: {
      minHeight: "48px",
    },
  },
  headRow: {
    style: {
      borderBottomStyle: "solid",
      borderBottomWidth: "1px",
      borderBottomColor: "#EAECF0",
    },
  },
  headCells: {
    style: {
      color: "#667085",
      fontSize: "14px",
      fontWeight: "medium",
      fontFamily: "Manrope",
      transition: "all",
      "&:hover": {
        color: "#151A1E ",
      },
      "&:nth-child(1)": {
        flex: 1,
      },
      "&:nth-child(2)": {
        flex: 7,
      },
      "&:nth-child(3)": {
        flex: 1,
      },
      "&:nth-child(4)": {
        flex: 1,
      },
      "&:nth-child(5)": {
        flex: 0.5,
      },
    },
  },
  rows: {
    style: {
      borderBottomStyle: "solid",
      borderBottomWidth: "1px",
      borderBottomColor: "#EAECF0",
    },
  },
  cells: {
    style: {
      "&:nth-child(1)": {
        flex: 1,
      },
      "&:nth-child(2)": {
        flex: 7,
      },
      "&:nth-child(3)": {
        flex: 1,
      },
      "&:nth-child(4)": {
        flex: 1,
      },
      "&:nth-child(5)": {
        flex: 0.5,
      },
    },
  },
};

export const annalesItemColumns = [
  {
    name: "Intitulé",
    selector: (row) => (
      <div className="flex items-center gap-1 h-7 px-1.5 w-fit rounded-lg bg-[#F3F3F4] border border-[#E2E2E4] shadow-gray !overflow-visible">
        {row.edn && (
          <span className="item-index flex justify-center items-center h-5 px-0.5 py-1 text-[8px] tracking-tight text-white font-manrope border border-[#2F3037] bg-[#2F3037] rounded shadow-gray-md">
            {row.edn}
          </span>
        )}
        <span className="font-manrope font-bold text-xs">
          {row.qType} {row.qId}
        </span>
      </div>
    ),
  },
  {
    name: "Last score",
    selector: (row) => (
      <div>
        {row.lastScore && (
          <span className="font-manrope text-normal text-[#667085]">
            {row.lastScore.current}/{row.lastScore.total}
          </span>
        )}
      </div>
    ),
    sortable: true,
    sortFunction: (rowA, rowB) => {
      const a = rowA.lastScore
        ? rowA.lastScore.current / rowA.lastScore.total
        : 0;
      const b =
        rowB.lastScore > 0 ? rowB.lastScore.current / rowB.lastScore.total : 0;

      if (a > b) {
        return 1;
      }

      if (b > a) {
        return -1;
      }

      return 0;
    },
  },
  {
    name: "Last assessed",
    selector: (row) => (
      <div>
        {row.lastScore && (
          <span className="font-manrope text-normal text-[#667085]">
            {row.lastAssessed}
          </span>
        )}
      </div>
    ),
    sortable: true,
    sortFunction: (rowA, rowB) => {
      const a = rowA.lastScore
        ? rowA.lastScore.current / rowA.lastScore.total
        : 0;
      const b =
        rowB.lastScore > 0 ? rowB.lastScore.current / rowB.lastScore.total : 0;

      if (a > b) {
        return 1;
      }

      if (b > a) {
        return -1;
      }

      return 0;
    },
  },
  {
    name: "",
    selector: (row) => (
      <div className="flex justify-around">
        <button className="group">
          <EditIcon />
        </button>
      </div>
    ),
  },
];

export const itemObjectives = [
  {
    goal: "Connaître la définition d’une péricardite aiguë",
    rank: "A",
  },
  {
    goal: "Connaître les symptômes et les signes cliniques d’une péricardite aiguë",
    rank: "A",
  },
  {
    goal: "Connaître les signes de gravité d’une péricardite aiguë et savoir appeler en urgence pour un drainage de l’épanchement",
    rank: "A",
  },
  {
    goal: "Connaître les modalités d’interprétation de l’ECG et du bilan biologique initial",
    rank: "A",
  },
  {
    goal: "Connaitre l’intérêt diagnostique d’une ponction péricardique",
    rank: "B",
  },
  {
    goal: "Connaître l’objectif de l’imagerie dans l’exploration d’une péricardite aiguë : radiographie thoracique et échocardiographie",
    rank: "B",
  },
  {
    goal: "Electrocardiogramme (ECG) d’une péricardite aiguë",
    rank: "A",
  },
  {
    goal: "Savoir évaluer les risques de complications nécessitant une hospitalisation ",
    rank: "A",
  },
  {
    goal: "Connaître l’étiologie de la forme clinique usuelle",
    rank: "A",
  },
];

export const materialTypes = [
  {
    id: 1,
    name: "Cardiologie",
    logo: "/images/cardiologie.png",
  },
  {
    id: 2,
    name: "Rhumatologie",
    logo: "/images/rhumatologie.png",
  },
  {
    id: 3,
    name: "Neurologie",
    logo: "/images/neurologie.png",
  },
  {
    id: 4,
    name: "Hépato-Gastro-Entérologie",
    logo: "/images/hépato-gastro-entérologie.png",
  },
  {
    id: 5,
    name: "Dermatologie",
    logo: "/images/dermatologie.png",
  },
  {
    id: 6,
    name: "Pneumologie",
    logo: "/images/pneumologie.png",
  },
  {
    id: 7,
    name: "Néphrologie",
    logo: "/images/néphrologie.png",
  },
  {
    id: 8,
    name: "Endocrinologie-Diabétologie-Nutrition",
    logo: "/images/endocrinologie-diabétologie-nutrition.png",
  },
  {
    id: 9,
    name: "Chirurgie Orthopédique",
    logo: "/images/chirurgie-orthopédique.png",
  },
];

export const annalesData = [
  {
    qId: "1",
    qType: "DP",
    edn: "EDN 2023",
    material: [1],
    items: [
      {
        index: 145,
        title: "Surveillance des maladies infectieuses trans...",
      },
    ],
    lastScore: {
      current: 20,
      total: 20,
    },
    lastAssessed: "7 days ago",
  },
  {
    qId: "29",
    qType: "QI",
    edn: "EDN 2023",
    material: [2, 3, 4, 5, 6],
    items: [
      {
        index: 133,
        title: "Autonomie et dépendance chez le sujet âgé",
      },
    ],
    lastScore: {
      current: 19,
      total: 20,
    },
    lastAssessed: "7 days ago",
  },
  {
    qId: "1",
    qType: "DP",
    edn: "EDN 2024",
    material: [3, 1],
    items: [
      {
        index: 96,
        title: "Myasthénie",
      },
    ],
    lastScore: {
      current: 14.5,
      total: 20,
    },
    lastAssessed: "7 days ago",
  },
  {
    qId: "80",
    qType: "QI",
    edn: "ECNi 2021",
    material: [4],
    items: [
      {
        index: 330,
        title: "Hémorragies méningées",
      },
      {
        index: 186,
        title: "Oreillons",
      },
      {
        index: 186,
        title: "Oreillons",
      },
    ],
    lastScore: {
      current: 10,
      total: 20,
    },
    lastAssessed: "7 days ago",
  },
  {
    qId: "2",
    qType: "KFP",
    edn: "EDN 2023",
    material: [5],
    items: [
      {
        index: 268,
        title: "Hypercalcémie",
      },
    ],
    lastScore: {
      current: 0,
      total: 20,
    },
    lastAssessed: "7 days ago",
  },
  {
    qId: "3",
    qType: "QI",
    edn: "ECNi juin 2023",
    material: [6],
    items: [
      {
        index: 259,
        title: "Protéinurie et syndrome néphrotique chez...",
      },
    ],
    lastScore: {
      current: 20,
      total: 20,
    },
    lastAssessed: "14 days ago",
  },
  {
    qId: "1",
    qType: "DP",
    edn: "EDN 2023",
    material: [7],
    items: [
      {
        index: 87,
        title: "Epistaxis",
      },
      {
        index: 152,
        title: "Endocardites infectieuses",
      },
      {
        index: 152,
        title: "Endocardites infectieuses",
      },
      {
        index: 152,
        title: "Endocardites infectieuses",
      },
      {
        index: 152,
        title: "Endocardites infectieuses",
      },
    ],
    lastScore: {
      current: 20,
      total: 20,
    },
    lastAssessed: "1 month ago",
  },
  {
    qId: "1",
    qType: "DP",
    edn: "EDN 2023",
    material: [8],
    items: [
      {
        index: 101,
        title: "Paralysie faciale",
      },
      {
        index: 102,
        title: "Diplopie",
      },
    ],
    lastScore: {
      current: 10,
      total: 20,
    },
    lastAssessed: "3 month ago",
  },
  {
    qId: "7",
    qType: "QI",
    edn: "EDN 2023",
    material: [9],
    items: [
      {
        index: 121,
        title: "Le handicap psychique",
      },
    ],
    lastScore: {
      current: 4,
      total: 20,
    },
    lastAssessed: "5 month ago",
  },
];

export const annalesCustomStyles = {
  header: {
    style: {
      minHeight: "48px",
    },
  },
  headRow: {
    style: {
      borderBottomStyle: "solid",
      borderBottomWidth: "1px",
      borderBottomColor: "#EAECF0",
    },
  },
  headCells: {
    style: {
      color: "#667085",
      fontSize: "14px",
      fontWeight: "medium",
      fontFamily: "Manrope",
      transition: "all",
      "&:hover": {
        color: "#151A1E ",
      },
      "&:nth-child(1)": {
        flex: 1,
      },
      "&:nth-child(2)": {
        flex: 1.5,
      },
      "&:nth-child(3)": {
        flex: 3,
      },
      "&:nth-child(4)": {
        flex: 4,
      },
      "&:nth-child(5)": {
        flex: 1,
      },
      "&:nth-child(6)": {
        flex: 1,
      },
      "&:nth-child(7)": {
        flex: 0.5,
      },
    },
  },
  rows: {
    style: {
      borderBottomStyle: "solid",
      borderBottomWidth: "1px",
      borderBottomColor: "#EAECF0",
    },
  },
  cells: {
    style: {
      "&:nth-child(1)": {
        flex: 1,
      },
      "&:nth-child(2)": {
        flex: 1.5,
      },
      "&:nth-child(3)": {
        flex: 3,
      },
      "&:nth-child(4)": {
        flex: 4,
      },
      "&:nth-child(5)": {
        flex: 1,
      },
      "&:nth-child(6)": {
        flex: 1,
      },
      "&:nth-child(7)": {
        flex: 0.5,
      },
    },
  },
};

export const annalesColumns = [
  {
    name: "Intitulé",
    selector: (row) => (
      <div className="flex items-center gap-1 h-7 px-1.5 w-fit rounded-lg bg-[#F3F3F4] border border-[#E2E2E4] shadow-gray !overflow-visible">
        {row.edn && (
          <span className="item-index flex justify-center items-center h-5 px-0.5 py-1 text-[8px] tracking-tight text-white font-manrope border border-[#2F3037] bg-[#2F3037] rounded shadow-gray">
            {row.edn}
          </span>
        )}
        <span className="font-manrope font-bold text-xs">
          {row.qType} {row.qId}
        </span>
      </div>
    ),
  },
  {
    name: "Matières",
    selector: (row) => {
      return (
        <>
          {row.material && (
            <SpreadMaterialView material={row.material} length={2} />
          )}
        </>
      );
    },
    sortable: true,
    sortFunction: (rowA, rowB) => {
      const a = rowA.material ?? [];
      const b = rowB.material ?? [];

      if (a.length > b.length) {
        return 1;
      } else {
        return -1;
      }
    },
  },
  {
    name: "Items",
    selector: (row) => {
      return (
        <>{row.items && <SpreadItemView items={row.items} length={2} />}</>
      );
    },
    sortable: true,
    sortFunction: (rowA, rowB) => {
      const a = rowA.items ?? [];
      const b = rowB.items ?? [];

      if (a.length > b.length) {
        return 1;
      } else {
        return -1;
      }
    },
  },
  {
    name: "Last score",
    selector: (row) => (
      <div>
        {row.lastScore && (
          <span className="font-manrope text-normal text-[#667085]">
            {row.lastScore.current}/{row.lastScore.total}
          </span>
        )}
      </div>
    ),
    sortable: true,
    sortFunction: (rowA, rowB) => {
      const a = rowA.lastScore
        ? rowA.lastScore.current / rowA.lastScore.total
        : 0;
      const b =
        rowB.lastScore > 0 ? rowB.lastScore.current / rowB.lastScore.total : 0;

      if (a > b) {
        return 1;
      }

      if (b > a) {
        return -1;
      }

      return 0;
    },
  },
  {
    name: "Last assessed",
    selector: (row) => (
      <div>
        {row.lastScore && (
          <span className="font-manrope text-normal text-[#667085]">
            {row.lastAssessed}
          </span>
        )}
      </div>
    ),
    sortable: true,
    sortFunction: (rowA, rowB) => {
      const a = rowA.lastScore
        ? rowA.lastScore.current / rowA.lastScore.total
        : 0;
      const b =
        rowB.lastScore > 0 ? rowB.lastScore.current / rowB.lastScore.total : 0;

      if (a > b) {
        return 1;
      }

      if (b > a) {
        return -1;
      }

      return 0;
    },
  },
  {
    name: "",
    selector: (row) => (
      <div className="flex justify-around">
        <button className="group">
          <EditIcon />
        </button>
      </div>
    ),
  },
];

export const annaleSessionData = [
  { time: "2021-03", name: "ECNp Mars 2021" },
  { time: "2021-06", name: "ECNi Juin 2021" },
  { time: "2022-06", name: "ECNi Juin 2022" },
  { time: "2023-06", name: "ECNi Juin 2023" },
  { time: "2023-10", name: "EDN Octobre 2023" },
  { time: "2024-01", name: "EDN Janvier 2024" },
];

export const annalesHistoryData = [
  {
    qId: "1",
    qType: "DP",
    edn: "EDN 2023",
    material: [1],
    items: [
      {
        index: 145,
        title: "Surveillance des maladies infectieuses trans...",
      },
    ],
    lastScore: {
      current: 20,
      total: 20,
    },
    lastAssessed: "7 days ago",
    star: true,
  },
  {
    qId: "29",
    qType: "QI",
    edn: "EDN 2023",
    material: [2, 3, 4, 5, 6],
    items: [
      {
        index: 133,
        title: "Autonomie et dépendance chez le sujet âgé",
      },
    ],
    lastScore: {
      current: 19,
      total: 20,
    },
    lastAssessed: "7 days ago",
    star: false,
  },
  {
    qId: "1",
    qType: "DP",
    edn: "EDN 2023",
    material: [3, 1],
    items: [
      {
        index: 96,
        title: "Myasthénie",
      },
    ],
    lastScore: {
      current: 14.5,
      total: 20,
    },
    lastAssessed: "7 days ago",
    star: false,
  },
  {
    qId: "336-22",
    qType: "QI",
    edn: "EDN 2023",
    material: [4],
    items: [
      {
        index: 330,
        title: "Hémorragies méningées",
      },
      {
        index: 186,
        title: "Oreillons",
      },
      {
        index: 186,
        title: "Oreillons",
      },
    ],
    lastScore: {
      current: 10,
      total: 20,
    },
    lastAssessed: "7 days ago",
    star: false,
  },
  {
    qId: "336-22",
    qType: "QI",
    edn: "EDN 2023",
    material: [5],
    items: [
      {
        index: 268,
        title: "Hypercalcémie",
      },
    ],
    lastScore: {
      current: 0,
      total: 20,
    },
    lastAssessed: "7 days ago",
    star: false,
  },
  {
    qId: "1",
    qType: "DP",
    edn: "EDN 2023",
    material: [6],
    items: [
      {
        index: 259,
        title: "Protéinurie et syndrome néphrotique chez...",
      },
    ],
    lastScore: {
      current: 20,
      total: 20,
    },
    lastAssessed: "14 days ago",
    star: false,
  },
  {
    qId: "22-13",
    qType: "QI",
    edn: "EDN 2023",
    material: [7],
    items: [
      {
        index: 87,
        title: "Epistaxis",
      },
      {
        index: 152,
        title: "Endocardites infectieuses",
      },
      {
        index: 152,
        title: "Endocardites infectieuses",
      },
      {
        index: 152,
        title: "Endocardites infectieuses",
      },
      {
        index: 152,
        title: "Endocardites infectieuses",
      },
    ],
    lastScore: {
      current: 20,
      total: 20,
    },
    lastAssessed: "1 month ago",
    star: true,
  },
  {
    qId: "1",
    qType: "DP",
    edn: "EDN 2023",
    material: [8],
    items: [
      {
        index: 101,
        title: "Paralysie faciale",
      },
      {
        index: 102,
        title: "Diplopie",
      },
    ],
    lastScore: {
      current: 10,
      total: 20,
    },
    lastAssessed: "3 month ago",
    star: false,
  },
  {
    qId: "198-07",
    qType: "QI",
    edn: "EDN 2023",
    material: [9],
    items: [
      {
        index: 121,
        title: "Le handicap psychique",
      },
    ],
    lastScore: {
      current: 4,
      total: 20,
    },
    lastAssessed: "5 month ago",
    star: true,
  },
];

export const annalesHistoryCustomStyles = {
  header: {
    style: {
      minHeight: "48px",
    },
  },
  headRow: {
    style: {
      borderBottomStyle: "solid",
      borderBottomWidth: "1px",
      borderBottomColor: "#EAECF0",
    },
  },
  headCells: {
    style: {
      color: "#667085",
      fontSize: "14px",
      fontWeight: "medium",
      fontFamily: "Manrope",
      transition: "all",
      "&:hover": {
        color: "#151A1E ",
      },
      "&:nth-child(1)": {
        flex: 1,
      },
      "&:nth-child(2)": {
        flex: 1.5,
      },
      "&:nth-child(3)": {
        flex: 3,
      },
      "&:nth-child(4)": {
        flex: 4,
      },
      "&:nth-child(5)": {
        flex: 1,
      },
      "&:nth-child(6)": {
        flex: 1,
      },
      "&:nth-child(7)": {
        flex: 0.5,
      },
    },
  },
  rows: {
    style: {
      borderBottomStyle: "solid",
      borderBottomWidth: "1px",
      borderBottomColor: "#EAECF0",
    },
  },
  cells: {
    style: {
      "&:nth-child(1)": {
        flex: 1,
      },
      "&:nth-child(2)": {
        flex: 1.5,
      },
      "&:nth-child(3)": {
        flex: 3,
      },
      "&:nth-child(4)": {
        flex: 4,
      },
      "&:nth-child(5)": {
        flex: 1,
      },
      "&:nth-child(6)": {
        flex: 1,
      },
      "&:nth-child(7)": {
        flex: 0.5,
      },
    },
  },
};

export const annalesHistoryColumns = [
  {
    name: "Intitulé",
    selector: (row) => (
      <div className="flex items-center gap-1 h-7 px-1.5 w-fit rounded-lg bg-[#F3F3F4] border border-[#E2E2E4] shadow-gray !overflow-visible">
        {row.edn && (
          <span className="item-index flex justify-center items-center h-5 px-0.5 py-1 text-[8px] tracking-tight text-white font-manrope border border-[#2F3037] bg-[#2F3037] rounded shadow-gray">
            {row.edn}
          </span>
        )}
        <span className="font-manrope font-bold text-xs">
          {row.qType} {row.qId}
        </span>
      </div>
    ),
  },
  {
    name: "Matières",
    selector: (row) => {
      return (
        <>
          {row.material && (
            <SpreadMaterialView material={row.material} length={2} />
          )}
        </>
      );
    },
    sortable: true,
    sortFunction: (rowA, rowB) => {
      const a = rowA.material ?? [];
      const b = rowB.material ?? [];

      if (a.length > b.length) {
        return 1;
      } else {
        return -1;
      }
    },
  },
  {
    name: "Items",
    selector: (row) => {
      return (
        <>{row.items && <SpreadItemView items={row.items} length={2} />}</>
      );
    },
    sortable: true,
    sortFunction: (rowA, rowB) => {
      const a = rowA.items ?? [];
      const b = rowB.items ?? [];

      if (a.length > b.length) {
        return 1;
      } else {
        return -1;
      }
    },
  },
  {
    name: "Last score",
    selector: (row) => (
      <div>
        {row.lastScore && (
          <span className="font-manrope text-normal text-[#667085]">
            {row.lastScore.current}/{row.lastScore.total}
          </span>
        )}
      </div>
    ),
    sortable: true,
    sortFunction: (rowA, rowB) => {
      const a = rowA.lastScore
        ? rowA.lastScore.current / rowA.lastScore.total
        : 0;
      const b =
        rowB.lastScore > 0 ? rowB.lastScore.current / rowB.lastScore.total : 0;

      if (a > b) {
        return 1;
      }

      if (b > a) {
        return -1;
      }

      return 0;
    },
  },
  {
    name: "Last assessed",
    selector: (row) => (
      <div>
        {row.lastScore && (
          <span className="font-manrope text-normal text-[#667085]">
            {row.lastAssessed}
          </span>
        )}
      </div>
    ),
    sortable: true,
    sortFunction: (rowA, rowB) => {
      const a = rowA.lastScore
        ? rowA.lastScore.current / rowA.lastScore.total
        : 0;
      const b =
        rowB.lastScore > 0 ? rowB.lastScore.current / rowB.lastScore.total : 0;

      if (a > b) {
        return 1;
      }

      if (b > a) {
        return -1;
      }

      return 0;
    },
  },
  {
    name: "",
    selector: (row) => (
      <div className="flex justify-around">
        <button className="group">
          <EditIcon />
        </button>
        <button className="group">
          {row.star ? (
            <StarIcon
              width={17}
              height={17}
              className="text-[#F29C1F] group-hover:text-primary transition-all duration-300"
            />
          ) : (
            <StarIcon
              width={17}
              height={17}
              className="text-[#EAECF0] group-hover:text-[#F29C1F] transition-all duration-300"
            />
          )}
        </button>
      </div>
    ),
  },
];

export const sessionAnnaleItems = [
  {
    qId: "8",
    qType: "DP",
    edn: "ECNi 2021",
    material: [2, 3, 1],
    items: [
      {
        index: 96,
        title: "Myasthénie",
      },
      {
        index: 268,
        title: "Hypercalcémie",
      },
      {
        index: 259,
        title: "Protéinurie et syndrome néphrotique chez...",
      },
    ],
    questions: 3,
  },
  {
    qId: "80",
    qType: "QI",
    edn: "ECNi 2021",
    material: [2, 3, 1],
    items: [
      {
        index: 96,
        title: "Myasthénie",
      },
      {
        index: 268,
        title: "Hypercalcémie",
      },
      {
        index: 259,
        title: "Protéinurie et syndrome néphrotique chez...",
      },
    ],
    questions: 12,
  },
  {
    qId: "2",
    qType: "KFP",
    edn: "ECNi 2023",
    material: [4],
    items: [
      {
        index: 96,
        title: "Myasthénie",
      },
      {
        index: 268,
        title: "Hypercalcémie",
      },
      {
        index: 259,
        title: "Protéinurie et syndrome néphrotique chez...",
      },
      {
        index: 268,
        title: "Hypercalcémie",
      },
      {
        index: 259,
        title: "Protéinurie et syndrome néphrotique chez...",
      },
    ],
  },
  {
    qId: "29",
    qType: "QI",
    edn: "EDN 2023",
    material: [5, 6, 7, 8, 9],
    items: [
      {
        index: 96,
        title: "Myasthénie",
      },
      {
        index: 268,
        title: "Hypercalcémie",
      },
    ],
    questions: 3,
  },
  {
    qId: "1",
    qType: "DP",
    edn: "EDN 2023",
    material: [2],
    items: [
      {
        index: 96,
        title: "Myasthénie",
      },
    ],
    questions: 7,
  },
  {
    qId: "56",
    qType: "QI",
    edn: "ECNp 2018",
    material: [3, 4],
    items: [
      {
        index: 96,
        title: "Myasthénie",
      },
      {
        index: 268,
        title: "Hypercalcémie",
      },
    ],
  },
];

export const quizData = {
  name: "Pneumologie",
  data: [
    {
      id: 1,
      name: "Question 1",
      qType: "DP",
      qIndex: "1",
      range: "A",
      expected: 2,
      score: 1.0,
      answer: ["A", "D"],
      fact: ["A", "D"],
      description:
        "Concernant le contrôle de l’asthme, parmi les propositions suivantes, lesquelles peuvent être qualifiées d’asthme contrôlé (2 réponses exactes)",
      options: [
        {
          index: "A",
          option:
            "Marie, 15 ans, a réalisé des EFR de contrôle qui trouve un rapport VEMS/CV > 0,7 et un VEMS > 0,8. Elle n’a pas eu de symptômes asthmatiques ces 4 dernières semaines. Elle a consulté trois fois aux urgences cette année pour asthme aigu grave.",
        },
        {
          index: "B",
          option:
            "Louis, 19 ans, a réalisé des EFR de contrôle qui trouve un rapport VEMS/CV > 0,7 et un VEMS > 0,8. Il n’a pas eu de symptômes asthmatiques ces 4 dernières semaines. Il n’est pas limité dans sa vie quotidienne. Il a consulté une fois aux urgences cette année où il a reçu une cure de corticothérapie systémique.",
        },
        {
          index: "C",
          option:
            "Louise, 25 ans, a réalisé des EFR de contrôle qui trouve un rapport VEMS/CV < 0,7 et un VEMS > 0,8. Elle n’a pas eu de symptômes asthmatiques ces 4 dernières semaines. Elle n’a pas eu de corticothérapie systémique au cours de la dernière année.",
        },
        {
          index: "D",
          option:
            "Matthieu, 30 ans, a réalisé des EFR de contrôle qui trouve un rapport VEMS/CV > 0,7 et un VEMS > 0,8. Depuis 4 semaines il se plaint d’être limité dans sa vie de tous les jours à cause de son asthme. Il a notamment augmenté la prise de SALBUTAMOL car il est particulièrement essoufflé. Il n’a pas eu de corticothérapie systémique au cours de la dernière année.",
        },
        {
          index: "E",
          option:
            "Marie, 15 ans, a réalisé des EFR de contrôle qui trouve un rapport VEMS/CV > 0,7 et un VEMS > 0,8. Elle n’a pas eu de symptômes asthmatiques ces 4 dernières semaines. Elle a consulté trois fois aux urgences cette année pour asthme aigu grave.",
        },
      ],
    },
    {
      id: 2,
      name: "Question 2",
      qType: "DP",
      qIndex: "1",
      range: "A",
      expected: 2,
      score: 0.0,
      answer: [],
      fact: ["A", "B"],
      description:
        "Concernant le contrôle de l’asthme, parmi les propositions suivantes, lesquelles peuvent être qualifiées d’asthme contrôlé (2 réponses exactes)",
      options: [
        {
          index: "A",
          option:
            "Marie, 15 ans, a réalisé des EFR de contrôle qui trouve un rapport VEMS/CV > 0,7 et un VEMS > 0,8. Elle n’a pas eu de symptômes asthmatiques ces 4 dernières semaines. Elle a consulté trois fois aux urgences cette année pour asthme aigu grave.",
        },
        {
          index: "B",
          option:
            "Louis, 19 ans, a réalisé des EFR de contrôle qui trouve un rapport VEMS/CV > 0,7 et un VEMS > 0,8. Il n’a pas eu de symptômes asthmatiques ces 4 dernières semaines. Il n’est pas limité dans sa vie quotidienne. Il a consulté une fois aux urgences cette année où il a reçu une cure de corticothérapie systémique.",
        },
        {
          index: "C",
          option:
            "Louise, 25 ans, a réalisé des EFR de contrôle qui trouve un rapport VEMS/CV < 0,7 et un VEMS > 0,8. Elle n’a pas eu de symptômes asthmatiques ces 4 dernières semaines. Elle n’a pas eu de corticothérapie systémique au cours de la dernière année.",
        },
        {
          index: "D",
          option:
            "Matthieu, 30 ans, a réalisé des EFR de contrôle qui trouve un rapport VEMS/CV > 0,7 et un VEMS > 0,8. Depuis 4 semaines il se plaint d’être limité dans sa vie de tous les jours à cause de son asthme. Il a notamment augmenté la prise de SALBUTAMOL car il est particulièrement essoufflé. Il n’a pas eu de corticothérapie systémique au cours de la dernière année.",
        },
        {
          index: "E",
          option:
            "Marie, 15 ans, a réalisé des EFR de contrôle qui trouve un rapport VEMS/CV > 0,7 et un VEMS > 0,8. Elle n’a pas eu de symptômes asthmatiques ces 4 dernières semaines. Elle a consulté trois fois aux urgences cette année pour asthme aigu grave.",
        },
      ],
    },
    {
      id: 3,
      name: "Question 3",
      qType: "DP",
      qIndex: "1",
      range: "A",
      expected: 3,
      score: 0.3333,
      answer: ["C"],
      fact: ["C", "D", "E"],
      description:
        "Concernant le contrôle de l’asthme, parmi les propositions suivantes, lesquelles peuvent être qualifiées d’asthme contrôlé (2 réponses exactes)",
      options: [
        {
          index: "A",
          option:
            "Marie, 15 ans, a réalisé des EFR de contrôle qui trouve un rapport VEMS/CV > 0,7 et un VEMS > 0,8. Elle n’a pas eu de symptômes asthmatiques ces 4 dernières semaines. Elle a consulté trois fois aux urgences cette année pour asthme aigu grave.",
        },
        {
          index: "B",
          option:
            "Louis, 19 ans, a réalisé des EFR de contrôle qui trouve un rapport VEMS/CV > 0,7 et un VEMS > 0,8. Il n’a pas eu de symptômes asthmatiques ces 4 dernières semaines. Il n’est pas limité dans sa vie quotidienne. Il a consulté une fois aux urgences cette année où il a reçu une cure de corticothérapie systémique.",
        },
        {
          index: "C",
          option:
            "Louise, 25 ans, a réalisé des EFR de contrôle qui trouve un rapport VEMS/CV < 0,7 et un VEMS > 0,8. Elle n’a pas eu de symptômes asthmatiques ces 4 dernières semaines. Elle n’a pas eu de corticothérapie systémique au cours de la dernière année.",
        },
        {
          index: "D",
          option:
            "Matthieu, 30 ans, a réalisé des EFR de contrôle qui trouve un rapport VEMS/CV > 0,7 et un VEMS > 0,8. Depuis 4 semaines il se plaint d’être limité dans sa vie de tous les jours à cause de son asthme. Il a notamment augmenté la prise de SALBUTAMOL car il est particulièrement essoufflé. Il n’a pas eu de corticothérapie systémique au cours de la dernière année.",
        },
        {
          index: "E",
          option:
            "Marie, 15 ans, a réalisé des EFR de contrôle qui trouve un rapport VEMS/CV > 0,7 et un VEMS > 0,8. Elle n’a pas eu de symptômes asthmatiques ces 4 dernières semaines. Elle a consulté trois fois aux urgences cette année pour asthme aigu grave.",
        },
      ],
    },
    {
      id: 4,
      name: "Question 1",
      qType: "DP",
      qIndex: "2",
      range: "A",
      expected: 1,
      score: 1.0,
      answer: ["B"],
      fact: ["B"],
      description:
        "Concernant le contrôle de l’asthme, parmi les propositions suivantes, lesquelles peuvent être qualifiées d’asthme contrôlé (2 réponses exactes)",
      options: [
        {
          index: "A",
          option:
            "Marie, 15 ans, a réalisé des EFR de contrôle qui trouve un rapport VEMS/CV > 0,7 et un VEMS > 0,8. Elle n’a pas eu de symptômes asthmatiques ces 4 dernières semaines. Elle a consulté trois fois aux urgences cette année pour asthme aigu grave.",
        },
        {
          index: "B",
          option:
            "Louis, 19 ans, a réalisé des EFR de contrôle qui trouve un rapport VEMS/CV > 0,7 et un VEMS > 0,8. Il n’a pas eu de symptômes asthmatiques ces 4 dernières semaines. Il n’est pas limité dans sa vie quotidienne. Il a consulté une fois aux urgences cette année où il a reçu une cure de corticothérapie systémique.",
        },
        {
          index: "C",
          option:
            "Louise, 25 ans, a réalisé des EFR de contrôle qui trouve un rapport VEMS/CV < 0,7 et un VEMS > 0,8. Elle n’a pas eu de symptômes asthmatiques ces 4 dernières semaines. Elle n’a pas eu de corticothérapie systémique au cours de la dernière année.",
        },
        {
          index: "D",
          option:
            "Matthieu, 30 ans, a réalisé des EFR de contrôle qui trouve un rapport VEMS/CV > 0,7 et un VEMS > 0,8. Depuis 4 semaines il se plaint d’être limité dans sa vie de tous les jours à cause de son asthme. Il a notamment augmenté la prise de SALBUTAMOL car il est particulièrement essoufflé. Il n’a pas eu de corticothérapie systémique au cours de la dernière année.",
        },
        {
          index: "E",
          option:
            "Marie, 15 ans, a réalisé des EFR de contrôle qui trouve un rapport VEMS/CV > 0,7 et un VEMS > 0,8. Elle n’a pas eu de symptômes asthmatiques ces 4 dernières semaines. Elle a consulté trois fois aux urgences cette année pour asthme aigu grave.",
        },
      ],
    },
    {
      id: 5,
      name: "Question 2",
      qType: "DP",
      qIndex: "2",
      range: "A",
      expected: 2,
      score: 1.0,
      answer: ["A", "E"],
      fact: ["A", "E"],
      description:
        "Concernant le contrôle de l’asthme, parmi les propositions suivantes, lesquelles peuvent être qualifiées d’asthme contrôlé (2 réponses exactes)",
      options: [
        {
          index: "A",
          option:
            "Marie, 15 ans, a réalisé des EFR de contrôle qui trouve un rapport VEMS/CV > 0,7 et un VEMS > 0,8. Elle n’a pas eu de symptômes asthmatiques ces 4 dernières semaines. Elle a consulté trois fois aux urgences cette année pour asthme aigu grave.",
        },
        {
          index: "B",
          option:
            "Louis, 19 ans, a réalisé des EFR de contrôle qui trouve un rapport VEMS/CV > 0,7 et un VEMS > 0,8. Il n’a pas eu de symptômes asthmatiques ces 4 dernières semaines. Il n’est pas limité dans sa vie quotidienne. Il a consulté une fois aux urgences cette année où il a reçu une cure de corticothérapie systémique.",
        },
        {
          index: "C",
          option:
            "Louise, 25 ans, a réalisé des EFR de contrôle qui trouve un rapport VEMS/CV < 0,7 et un VEMS > 0,8. Elle n’a pas eu de symptômes asthmatiques ces 4 dernières semaines. Elle n’a pas eu de corticothérapie systémique au cours de la dernière année.",
        },
        {
          index: "D",
          option:
            "Matthieu, 30 ans, a réalisé des EFR de contrôle qui trouve un rapport VEMS/CV > 0,7 et un VEMS > 0,8. Depuis 4 semaines il se plaint d’être limité dans sa vie de tous les jours à cause de son asthme. Il a notamment augmenté la prise de SALBUTAMOL car il est particulièrement essoufflé. Il n’a pas eu de corticothérapie systémique au cours de la dernière année.",
        },
        {
          index: "E",
          option:
            "Marie, 15 ans, a réalisé des EFR de contrôle qui trouve un rapport VEMS/CV > 0,7 et un VEMS > 0,8. Elle n’a pas eu de symptômes asthmatiques ces 4 dernières semaines. Elle a consulté trois fois aux urgences cette année pour asthme aigu grave.",
        },
      ],
    },
    {
      id: 6,
      name: "Question 1",
      qType: null,
      qIndex: null,
      range: "A",
      expected: 1,
      score: 0.0,
      answer: [],
      fact: ["F"],
      description:
        "Concernant le contrôle de l’asthme, parmi les propositions suivantes, lesquelles peuvent être qualifiées d’asthme contrôlé (2 réponses exactes)",
      options: [
        {
          index: "A",
          option:
            "Marie, 15 ans, a réalisé des EFR de contrôle qui trouve un rapport VEMS/CV > 0,7 et un VEMS > 0,8. Elle n’a pas eu de symptômes asthmatiques ces 4 dernières semaines. Elle a consulté trois fois aux urgences cette année pour asthme aigu grave.",
        },
        {
          index: "B",
          option:
            "Louis, 19 ans, a réalisé des EFR de contrôle qui trouve un rapport VEMS/CV > 0,7 et un VEMS > 0,8. Il n’a pas eu de symptômes asthmatiques ces 4 dernières semaines. Il n’est pas limité dans sa vie quotidienne. Il a consulté une fois aux urgences cette année où il a reçu une cure de corticothérapie systémique.",
        },
        {
          index: "C",
          option:
            "Louise, 25 ans, a réalisé des EFR de contrôle qui trouve un rapport VEMS/CV < 0,7 et un VEMS > 0,8. Elle n’a pas eu de symptômes asthmatiques ces 4 dernières semaines. Elle n’a pas eu de corticothérapie systémique au cours de la dernière année.",
        },
        {
          index: "D",
          option:
            "Matthieu, 30 ans, a réalisé des EFR de contrôle qui trouve un rapport VEMS/CV > 0,7 et un VEMS > 0,8. Depuis 4 semaines il se plaint d’être limité dans sa vie de tous les jours à cause de son asthme. Il a notamment augmenté la prise de SALBUTAMOL car il est particulièrement essoufflé. Il n’a pas eu de corticothérapie systémique au cours de la dernière année.",
        },
        {
          index: "E",
          option:
            "Marie, 15 ans, a réalisé des EFR de contrôle qui trouve un rapport VEMS/CV > 0,7 et un VEMS > 0,8. Elle n’a pas eu de symptômes asthmatiques ces 4 dernières semaines. Elle a consulté trois fois aux urgences cette année pour asthme aigu grave.",
        },
      ],
    },
    {
      id: 7,
      name: "Question 2",
      qType: null,
      qIndex: null,
      range: "A",
      expected: 2,
      score: 0.0,
      answer: [],
      fact: ["A", "E "],
      description:
        "Concernant le contrôle de l’asthme, parmi les propositions suivantes, lesquelles peuvent être qualifiées d’asthme contrôlé (2 réponses exactes)",
      options: [
        {
          index: "A",
          option:
            "Marie, 15 ans, a réalisé des EFR de contrôle qui trouve un rapport VEMS/CV > 0,7 et un VEMS > 0,8. Elle n’a pas eu de symptômes asthmatiques ces 4 dernières semaines. Elle a consulté trois fois aux urgences cette année pour asthme aigu grave.",
        },
        {
          index: "B",
          option:
            "Louis, 19 ans, a réalisé des EFR de contrôle qui trouve un rapport VEMS/CV > 0,7 et un VEMS > 0,8. Il n’a pas eu de symptômes asthmatiques ces 4 dernières semaines. Il n’est pas limité dans sa vie quotidienne. Il a consulté une fois aux urgences cette année où il a reçu une cure de corticothérapie systémique.",
        },
        {
          index: "C",
          option:
            "Louise, 25 ans, a réalisé des EFR de contrôle qui trouve un rapport VEMS/CV < 0,7 et un VEMS > 0,8. Elle n’a pas eu de symptômes asthmatiques ces 4 dernières semaines. Elle n’a pas eu de corticothérapie systémique au cours de la dernière année.",
        },
        {
          index: "D",
          option:
            "Matthieu, 30 ans, a réalisé des EFR de contrôle qui trouve un rapport VEMS/CV > 0,7 et un VEMS > 0,8. Depuis 4 semaines il se plaint d’être limité dans sa vie de tous les jours à cause de son asthme. Il a notamment augmenté la prise de SALBUTAMOL car il est particulièrement essoufflé. Il n’a pas eu de corticothérapie systémique au cours de la dernière année.",
        },
        {
          index: "E",
          option:
            "Marie, 15 ans, a réalisé des EFR de contrôle qui trouve un rapport VEMS/CV > 0,7 et un VEMS > 0,8. Elle n’a pas eu de symptômes asthmatiques ces 4 dernières semaines. Elle a consulté trois fois aux urgences cette année pour asthme aigu grave.",
        },
      ],
    },
    {
      id: 8,
      name: "Question 3",
      qType: null,
      qIndex: null,
      range: "A",
      expected: 4,
      score: 0.75,
      answer: ["B", "D", "E"],
      fact: ["B", "D", "E", "A"],
      description:
        "Concernant le contrôle de l’asthme, parmi les propositions suivantes, lesquelles peuvent être qualifiées d’asthme contrôlé (2 réponses exactes)",
      options: [
        {
          index: "A",
          option:
            "Marie, 15 ans, a réalisé des EFR de contrôle qui trouve un rapport VEMS/CV > 0,7 et un VEMS > 0,8. Elle n’a pas eu de symptômes asthmatiques ces 4 dernières semaines. Elle a consulté trois fois aux urgences cette année pour asthme aigu grave.",
        },
        {
          index: "B",
          option:
            "Louis, 19 ans, a réalisé des EFR de contrôle qui trouve un rapport VEMS/CV > 0,7 et un VEMS > 0,8. Il n’a pas eu de symptômes asthmatiques ces 4 dernières semaines. Il n’est pas limité dans sa vie quotidienne. Il a consulté une fois aux urgences cette année où il a reçu une cure de corticothérapie systémique.",
        },
        {
          index: "C",
          option:
            "Louise, 25 ans, a réalisé des EFR de contrôle qui trouve un rapport VEMS/CV < 0,7 et un VEMS > 0,8. Elle n’a pas eu de symptômes asthmatiques ces 4 dernières semaines. Elle n’a pas eu de corticothérapie systémique au cours de la dernière année.",
        },
        {
          index: "D",
          option:
            "Matthieu, 30 ans, a réalisé des EFR de contrôle qui trouve un rapport VEMS/CV > 0,7 et un VEMS > 0,8. Depuis 4 semaines il se plaint d’être limité dans sa vie de tous les jours à cause de son asthme. Il a notamment augmenté la prise de SALBUTAMOL car il est particulièrement essoufflé. Il n’a pas eu de corticothérapie systémique au cours de la dernière année.",
        },
        {
          index: "E",
          option:
            "Marie, 15 ans, a réalisé des EFR de contrôle qui trouve un rapport VEMS/CV > 0,7 et un VEMS > 0,8. Elle n’a pas eu de symptômes asthmatiques ces 4 dernières semaines. Elle a consulté trois fois aux urgences cette année pour asthme aigu grave.",
        },
      ],
    },
    {
      id: 9,
      name: "Question 4",
      qType: null,
      qIndex: null,
      range: "A",
      expected: 3,
      score: 0.0,
      answer: [],
      fact: ["C", "D", "G"],
      description:
        "Concernant le contrôle de l’asthme, parmi les propositions suivantes, lesquelles peuvent être qualifiées d’asthme contrôlé (2 réponses exactes)",
      options: [
        {
          index: "A",
          option:
            "Marie, 15 ans, a réalisé des EFR de contrôle qui trouve un rapport VEMS/CV > 0,7 et un VEMS > 0,8. Elle n’a pas eu de symptômes asthmatiques ces 4 dernières semaines. Elle a consulté trois fois aux urgences cette année pour asthme aigu grave.",
        },
        {
          index: "B",
          option:
            "Louis, 19 ans, a réalisé des EFR de contrôle qui trouve un rapport VEMS/CV > 0,7 et un VEMS > 0,8. Il n’a pas eu de symptômes asthmatiques ces 4 dernières semaines. Il n’est pas limité dans sa vie quotidienne. Il a consulté une fois aux urgences cette année où il a reçu une cure de corticothérapie systémique.",
        },
        {
          index: "C",
          option:
            "Louise, 25 ans, a réalisé des EFR de contrôle qui trouve un rapport VEMS/CV < 0,7 et un VEMS > 0,8. Elle n’a pas eu de symptômes asthmatiques ces 4 dernières semaines. Elle n’a pas eu de corticothérapie systémique au cours de la dernière année.",
        },
        {
          index: "D",
          option:
            "Matthieu, 30 ans, a réalisé des EFR de contrôle qui trouve un rapport VEMS/CV > 0,7 et un VEMS > 0,8. Depuis 4 semaines il se plaint d’être limité dans sa vie de tous les jours à cause de son asthme. Il a notamment augmenté la prise de SALBUTAMOL car il est particulièrement essoufflé. Il n’a pas eu de corticothérapie systémique au cours de la dernière année.",
        },
        {
          index: "E",
          option:
            "Marie, 15 ans, a réalisé des EFR de contrôle qui trouve un rapport VEMS/CV > 0,7 et un VEMS > 0,8. Elle n’a pas eu de symptômes asthmatiques ces 4 dernières semaines. Elle a consulté trois fois aux urgences cette année pour asthme aigu grave.",
        },
      ],
    },
  ],
};

export const playlistsHistoryData = [
  {
    qId: "1",
    qType: "DP",
    edn: "EDN 2023",
    playlists: [1],
    material: [1],
    items: [
      {
        index: 145,
        title: "Surveillance des maladies infectieuses trans...",
      },
    ],
    lastScore: {
      current: 20,
      total: 20,
    },
    lastAssessed: "7 days ago",
    star: true,
  },
  {
    qId: "29",
    qType: "QI",
    edn: "EDN 2023",
    playlists: [2],
    material: [2, 3, 4, 5, 6],
    items: [
      {
        index: 133,
        title: "Autonomie et dépendance chez le sujet âgé",
      },
    ],
    lastScore: {
      current: 19,
      total: 20,
    },
    lastAssessed: "7 days ago",
    star: false,
  },
  {
    qId: "1",
    qType: "DP",
    edn: "EDN 2023",
    playlists: [3, 4],
    material: [3, 1],
    items: [
      {
        index: 96,
        title: "Myasthénie",
      },
    ],
    lastScore: {
      current: 14.5,
      total: 20,
    },
    lastAssessed: "7 days ago",
    star: false,
  },
  {
    qId: "336-22",
    qType: "QI",
    edn: "EDN 2023",
    material: [4],
    playlists: [1],
    items: [
      {
        index: 330,
        title: "Hémorragies méningées",
      },
      {
        index: 186,
        title: "Oreillons",
      },
      {
        index: 186,
        title: "Oreillons",
      },
    ],
    lastScore: {
      current: 10,
      total: 20,
    },
    lastAssessed: "7 days ago",
    star: false,
  },
  {
    qId: "336-22",
    qType: "QI",
    edn: "EDN 2023",
    material: [5],
    playlists: [5],
    items: [
      {
        index: 268,
        title: "Hypercalcémie",
      },
    ],
    lastScore: {
      current: 0,
      total: 20,
    },
    lastAssessed: "7 days ago",
    star: false,
  },
  {
    qId: "1",
    qType: "DP",
    edn: "EDN 2023",
    material: [6],
    playlists: [6],
    items: [
      {
        index: 259,
        title: "Protéinurie et syndrome néphrotique chez...",
      },
    ],
    lastScore: {
      current: 20,
      total: 20,
    },
    lastAssessed: "14 days ago",
    star: false,
  },
  {
    qId: "22-13",
    qType: "QI",
    edn: "EDN 2023",
    material: [7],
    playlists: [3, 4],
    items: [
      {
        index: 87,
        title: "Epistaxis",
      },
      {
        index: 152,
        title: "Endocardites infectieuses",
      },
      {
        index: 152,
        title: "Endocardites infectieuses",
      },
      {
        index: 152,
        title: "Endocardites infectieuses",
      },
      {
        index: 152,
        title: "Endocardites infectieuses",
      },
    ],
    lastScore: {
      current: 20,
      total: 20,
    },
    lastAssessed: "1 month ago",
    star: true,
  },
  {
    qId: "1",
    qType: "DP",
    edn: "EDN 2023",
    material: [8],
    playlists: [1],
    items: [
      {
        index: 101,
        title: "Paralysie faciale",
      },
      {
        index: 102,
        title: "Diplopie",
      },
    ],
    lastScore: {
      current: 10,
      total: 20,
    },
    lastAssessed: "3 month ago",
    star: false,
  },
  {
    qId: "198-07",
    qType: "QI",
    edn: "EDN 2023",
    material: [9],
    playlists: [1],
    items: [
      {
        index: 121,
        title: "Le handicap psychique",
      },
    ],
    lastScore: {
      current: 4,
      total: 20,
    },
    lastAssessed: "5 month ago",
    star: true,
  },
];

export const playlistsHistoryCustomStyles = {
  header: {
    style: {
      minHeight: "48px",
    },
  },
  headRow: {
    style: {
      borderBottomStyle: "solid",
      borderBottomWidth: "1px",
      borderBottomColor: "#EAECF0",
    },
  },
  headCells: {
    style: {
      color: "#667085",
      fontSize: "14px",
      fontWeight: "medium",
      fontFamily: "Manrope",
      transition: "all",
      "&:hover": {
        color: "#151A1E ",
      },
      "&:nth-child(1)": {
        flex: 1,
      },
      "&:nth-child(2)": {
        flex: 1.5,
      },
      "&:nth-child(3)": {
        flex: 3,
      },
      "&:nth-child(4)": {
        flex: 3,
      },
      "&:nth-child(5)": {
        flex: 4,
      },
      "&:nth-child(6)": {
        flex: 1,
      },
      "&:nth-child(7)": {
        flex: 1,
      },
      "&:nth-child(7)": {
        flex: 0.5,
      },
    },
  },
  rows: {
    style: {
      borderBottomStyle: "solid",
      borderBottomWidth: "1px",
      borderBottomColor: "#EAECF0",
    },
  },
  cells: {
    style: {
      "&:nth-child(1)": {
        flex: 1,
      },
      "&:nth-child(2)": {
        flex: 1.5,
      },
      "&:nth-child(3)": {
        flex: 3,
      },
      "&:nth-child(4)": {
        flex: 3,
      },
      "&:nth-child(5)": {
        flex: 4,
      },
      "&:nth-child(6)": {
        flex: 1,
      },
      "&:nth-child(7)": {
        flex: 1,
      },
      "&:nth-child(7)": {
        flex: 0.5,
      },
    },
  },
};

export const playlistsHistoryColumns = [
  {
    name: "Question ID",
    selector: (row) => (
      <div className="flex items-center gap-1 h-7 px-1.5 w-fit rounded-lg bg-[#F3F3F4] border border-[#E2E2E4] !overflow-visible">
        {row.edn && (
          <span className="item-index flex justify-center items-center h-5 px-0.5 py-1 text-[8px] tracking-tight text-white font-manrope border border-[#2F3037] bg-[#2F3037] rounded">
            {row.edn}
          </span>
        )}
        <span className="font-manrope font-bold text-xs">
          {row.qType} {row.qId}
        </span>
      </div>
    ),
  },
  {
    name: "Playlist",
    selector: (row) => {
      const rowPlaylist = playlistData.filter((item) =>
        row.playlists.includes(item.id)
      );
      return (
        <div className="flex justify-center gap-1 !overflow-visible">
          {rowPlaylist.length > 0 &&
            rowPlaylist.map((item, index) => (
              <Link
                href="/playlists"
                key={`playlist-item-${index}`}
                className="flex justify-center items-center h-7 px-4 text-xs font-manrope rounded-full border shadow hover:animate-rebound"
                style={{
                  color: item.fontColor,
                  borderColor: item.borderColor,
                  backgroundColor: item.bgColor,
                }}
              >
                {item.name}
              </Link>
            ))}
        </div>
      );
    },
    sortable: true,
    sortFunction: (rowA, rowB) => {
      const a = rowA.playlists ? rowA.playlists : [];
      const b = rowB.playlists ? rowB.playlists : [];

      if (a.length > b.length) {
        return 1;
      } else {
        return -1;
      }
    },
  },
  {
    name: "Matières",
    selector: (row) => {
      return (
        <>
          {row.material && (
            <SpreadMaterialView material={row.material} length={2} />
          )}
        </>
      );
    },
    sortable: true,
    sortFunction: (rowA, rowB) => {
      const a = rowA.material ?? [];
      const b = rowB.material ?? [];

      if (a.length > b.length) {
        return 1;
      } else {
        return -1;
      }
    },
  },
  {
    name: "Items",
    selector: (row) => {
      return (
        <>{row.items && <SpreadItemView items={row.items} length={2} />}</>
      );
    },
    sortable: true,
    sortFunction: (rowA, rowB) => {
      const a = rowA.items ?? [];
      const b = rowB.items ?? [];

      if (a.length > b.length) {
        return 1;
      } else {
        return -1;
      }
    },
  },
  {
    name: "Last score",
    selector: (row) => (
      <div>
        {row.lastScore && (
          <span className="font-manrope text-normal text-[#667085]">
            {row.lastScore.current}/{row.lastScore.total}
          </span>
        )}
      </div>
    ),
    sortable: true,
    sortFunction: (rowA, rowB) => {
      const a = rowA.lastScore
        ? rowA.lastScore.current / rowA.lastScore.total
        : 0;
      const b =
        rowB.lastScore > 0 ? rowB.lastScore.current / rowB.lastScore.total : 0;

      if (a > b) {
        return 1;
      }

      if (b > a) {
        return -1;
      }

      return 0;
    },
  },
  {
    name: "Last assessed",
    selector: (row) => (
      <div>
        {row.lastScore && (
          <span className="font-manrope text-normal text-[#667085]">
            {row.lastAssessed}
          </span>
        )}
      </div>
    ),
    sortable: true,
    sortFunction: (rowA, rowB) => {
      const a = rowA.lastScore
        ? rowA.lastScore.current / rowA.lastScore.total
        : 0;
      const b =
        rowB.lastScore > 0 ? rowB.lastScore.current / rowB.lastScore.total : 0;

      if (a > b) {
        return 1;
      }

      if (b > a) {
        return -1;
      }

      return 0;
    },
  },
  {
    name: "",
    selector: (row) => (
      <div className="flex justify-around">
        <button className="group">
          <EditIcon />
        </button>
        <button className="group">
          <TrashIcon
            width={17}
            height={17}
            className="text-[#E2E2E4] group-hover:text-primary transition-all duration-300"
          />
        </button>
      </div>
    ),
  },
];

export const myPlaylist = [
  {
    name: "Révisions",
    bgColor: "#F3F2FE",
    borderColor: "#E9E8Fe",
    textColor: "#4940Af",
    questions: 234,
  },
  {
    name: "QCM DURS À REVOIR",
    bgColor: "#FEF8FE",
    borderColor: "#FBE6FD",
    textColor: "#9A1583",
    questions: 120,
  },
  {
    name: "Playlist 5",
    bgColor: "#F0FFF6",
    borderColor: "#C3FBDC",
    textColor: "#154228",
    questions: 89,
  },
  {
    name: "Playlist 7",
    bgColor: "#FEF2F2",
    borderColor: "#F57474",
    textColor: "#751D1D",
    questions: 12,
  },
  {
    name: "Playlist 5",
    bgColor: "#F0FFF6",
    borderColor: "#C3FBDC",
    textColor: "#154228",
    questions: 89,
  },
  {
    name: "Playlist 7",
    bgColor: "#FEF2F2",
    borderColor: "#F57474",
    textColor: "#751D1D",
    questions: 12,
  },
];

export const modalPlaylist = [
  {
    name: "Playlist 1",
    bgColor: "#F3F2FE",
    borderColor: "#E9E8Fe",
    textColor: "#4940Af",
  },
  {
    name: "Playlist 2",
    bgColor: "#FEF2F2",
    borderColor: "#F57474",
    textColor: "#751D1D",
  },
  {
    name: "Playlist 3",
    bgColor: "#FFFEED",
    borderColor: "#FFF787",
    textColor: "#FCC313",
  },
  {
    name: "Playlist 4",
    bgColor: "#F8F8F8",
    borderColor: "#E2E2E4",
    textColor: "#494656",
  },
  {
    name: "Playlist 5",
    bgColor: "#F0FFF6",
    borderColor: "#B3FAD2",
    textColor: "#154228",
  },
  {
    name: "Playlist 6",
    bgColor: "#E4FDFF",
    borderColor: "#1DABFB",
    textColor: "#0D5ABF",
  },
  {
    name: "Playlist 7",
    bgColor: "#FEF2F2",
    borderColor: "#F57474",
    textColor: "#751D1D",
  },
];

export const colorOptions = [
  {
    index: 1,
    bgColor: "#F3F2FE",
    borderColor: "#E9E8Fe",
    textColor: "#4940Af",
  },
  {
    index: 2,
    bgColor: "#FEF2F2",
    borderColor: "#F57474",
    textColor: "#751D1D",
  },
  {
    index: 3,
    bgColor: "#F0FFF6",
    borderColor: "#B3FAD2",
    textColor: "#154228",
  },
  {
    index: 4,
    bgColor: "#F8F9FB",
    borderColor: "#D6D9EB",
    textColor: "#494656",
  },
  {
    index: 5,
    bgColor: "#E4FDFF",
    borderColor: "#1DABFB",
    textColor: "#0D5ABF",
  },
  {
    index: 6,
    bgColor: "#F4F3FE",
    borderColor: "#D9D6FA",
    textColor: "#4940Af",
  },
  {
    index: 7,
    bgColor: "#FDF6EF",
    borderColor: "#F4DCBA",
    textColor: "#FCC313",
  },
  {
    index: 8,
    bgColor: "#FDF6EE",
    borderColor: "#EAECF0",
    textColor: "#494656",
  },
];
