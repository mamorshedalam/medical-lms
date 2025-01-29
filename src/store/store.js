import { atom, createStore } from "jotai";

export const appStore = createStore();

export const location = atom([]);

export const modal = atom({
  launchTraining: false,
  customTest: false,
  createSessionAnnale: false,
  quizBackHomeConfirmationModal: false,
  quizTerminateConfirmationModal: false,
  playlistModal: false
});

export const quizState = atom({
  name: "",
  flags: [],
  questions: [],
  loadQuestions: [],
  rightSidebar: true,
  isExpanded: false,
  currentIndex: 0,
  terminated: false
});

export const libraryAtom = atom({
  materialsAtom: [],
  itemsAtom: [],
  tagsAtom: [],
  cardAtom: [],
  sessionAtom: [],
  dpsAtom: [],
  sessionAtom: [],
  activeTabIndex: "matieres",
  isRenderingData: true,
});


appStore.set(location, []);
appStore.set(modal, {
  launchTraining: false,
  customTest: false,
  createSessionAnnale: false,
  quizBackHomeConfirmationModal: false,
  quizTerminateConfirmationModal: false,
  playlistModal: false
});
appStore.set(quizState, {
  name: "",
  flags: [],
  questions: [],
  rightSidebar: true,
  isExpanded: false,
  currentIndex: 0,
  terminated: false
});

export const updateLibraryState = (updates) => {
  const currentState = appStore.get(libraryAtom);
  appStore.set(libraryAtom, {
    ...currentState,
    ...updates,
  });
};


export const updateQuizeState = (updates) => {
  const currentState = appStore.get(quizState);
  appStore.set(quizState, {
    ...currentState,
    ...updates,
  });
};



const unsub1 = appStore.sub(location, () => {
  console.log("locationAtom value is changed to", appStore.get(location));
});

const unsub2 = appStore.sub(modal, () => {
  console.log("modalAtom value is changed to", appStore.get(modal));
});
