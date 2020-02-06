import React from "react";
import { useImmerReducer } from "use-immer";
import uuidv1 from "uuid/v1";
import styled from "styled-components";
import { EditableFragmentData } from "./Editable";
import { OfflineBanner, PanelBanner, ProfileBanner } from "./Fragments";
import Editor from "./Editor";
import Button from "../Button";
import preset from "../../config/preset";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: calc(100% - ${props => props.theme.editorWidth});
  margin-right: ${props => props.theme.editorWidth};
`;
const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  & li {
    width: 300px;

    &:last-child {
      padding: 30px;
    }
  }
`;

interface ToggleEditorAction {
  type: "TOGGLE_EDITOR";
  id: string;
}

interface OpenEditorAction {
  type: "OPEN_EDITOR";
  id: string;
}

interface UpdateBannerAction {
  type: "UPDATE_BANNER";
  data: EditableFragmentData;
}

interface UpdateActiveBannerAction {
  type: "UPDATE_ACTIVE_BANNER";
  data: EditableFragmentData;
}

interface CenterActiveBannerTextAction {
  type: "CENTER_ACTIVE_BANNER_TEXT";
}

interface AddNewPanelAction {
  type: "ADD_NEW_PANEL";
}

interface removeActiveBannerAction {
  type: "REMOVE_ACTIVE_BANNER";
}

type ActionTypes =
  | ToggleEditorAction
  | OpenEditorAction
  | UpdateBannerAction
  | UpdateActiveBannerAction
  | CenterActiveBannerTextAction
  | AddNewPanelAction
  | removeActiveBannerAction;

export interface EditorInterface {
  toggle: () => void;
  open: () => void;
}

interface DesignerData {
  profileBanner: EditableFragmentData;
  offlineBanner: EditableFragmentData;
  panelBanners: EditableFragmentData[];
}

interface DesignerState {
  data: DesignerData;
  preset: string;
  activeId: string | null;
}

const initialPanelData: EditableFragmentData = {
  id: uuidv1(),
  x: 0,
  y: 0,
  text: "About Me",
  fill: "white",
  fontFamily: "Bangers",
  fontSize: 40,
  position: "manual",
  removable: true
};

const initialState: DesignerState = {
  data: {
    profileBanner: {
      id: uuidv1(),
      x: 0,
      y: 0,
      text: "Welcome to My Channel",
      fill: "white",
      fontFamily: "Bangers",
      fontSize: 100,
      position: "manual",
      removable: false
    },
    offlineBanner: {
      id: uuidv1(),
      x: 0,
      y: 0,
      text: "Streamer is offline.",
      fill: "white",
      fontFamily: "Bangers",
      fontSize: 120,
      position: "manual",
      removable: false
    },
    panelBanners: [initialPanelData]
  },
  preset: preset.preset3,
  activeId: null
};

function getById(draft: DesignerData, id: string): EditableFragmentData {
  if (id === draft.profileBanner.id) {
    return draft.profileBanner;
  } else if (id === draft.offlineBanner.id) {
    return draft.offlineBanner;
  } else {
    return draft.panelBanners.find(item => item.id === id);
  }
}

function setById(draft: DesignerData, id: string, data: EditableFragmentData) {
  if (id === draft.profileBanner.id) {
    draft.profileBanner = data;
  } else if (id === draft.offlineBanner.id) {
    draft.offlineBanner = data;
  } else {
    const index = draft.panelBanners.findIndex(item => item.id === id);
    draft.panelBanners[index] = data;
  }
}

function reducer(draft: DesignerState, action: ActionTypes): DesignerState {
  switch (action.type) {
    case "TOGGLE_EDITOR":
      if (action.id === draft.activeId) {
        draft.activeId = null;
      } else {
        draft.activeId = action.id;
      }
      return draft;
    case "OPEN_EDITOR":
      draft.activeId = action.id;
      return draft;
    case "UPDATE_ACTIVE_BANNER":
      let activeBanner = getById(draft.data, draft.activeId);
      activeBanner = {
        ...activeBanner,
        position: "center"
      };
    case "UPDATE_BANNER":
      setById(draft.data, action.data.id, {
        ...action.data,
        position: "manual"
      });
      return draft;
    case "CENTER_ACTIVE_BANNER_TEXT":
      let item = getById(draft.data, draft.activeId);
      setById(draft.data, draft.activeId, {
        ...item,
        position: "center"
      });
      return draft;
    case "ADD_NEW_PANEL":
      let newPanel = draft.data.panelBanners.length
        ? { ...draft.data.panelBanners[0] }
        : { ...initialPanelData };
      newPanel.text = "Panel Text";
      newPanel.id = uuidv1();
      draft.data.panelBanners.push(newPanel);
      return draft;
    case "REMOVE_ACTIVE_BANNER":
      const index = draft.data.panelBanners.findIndex(
        item => item.id === draft.activeId
      );
      draft.data.panelBanners.splice(index, 1);
      return draft;
    default:
      throw new Error(`Undefined action ${action}`);
  }
}

const Designer = () => {
  const [state, dispatch] = useImmerReducer(reducer, initialState);

  const addNewPanel = () => {
    dispatch({
      type: "ADD_NEW_PANEL"
    });
  };

  const updateActiveBannerData = (data: EditableFragmentData) => {
    dispatch({
      type: "UPDATE_ACTIVE_BANNER",
      data
    });
  };

  const updateBannerData = (data: EditableFragmentData) => {
    dispatch({
      type: "UPDATE_BANNER",
      data
    });
  };

  const centerActivePanelText = () => {
    dispatch({
      type: "CENTER_ACTIVE_BANNER_TEXT"
    });
  };

  const removeActiveBanner = () => {
    dispatch({
      type: "REMOVE_ACTIVE_BANNER"
    });
  };

  const createEditorInterface = (id: string): EditorInterface => {
    return {
      toggle: () => {
        dispatch({
          type: "TOGGLE_EDITOR",
          id
        });
      },
      open: () => {
        dispatch({
          type: "OPEN_EDITOR",
          id
        });
      }
    };
  };

  const profileBannerEditor = createEditorInterface(
    state.data.profileBanner.id
  );
  const offlineBannerEditor = createEditorInterface(
    state.data.offlineBanner.id
  );

  const activeFragmentData: EditableFragmentData = getById(
    state.data,
    state.activeId
  );

  return (
    <Container>
      <ProfileBanner
        data={state.data.profileBanner}
        updateData={updateBannerData}
        editor={profileBannerEditor}
        preset={state.preset}
      />
      <OfflineBanner
        data={state.data.offlineBanner}
        updateData={updateBannerData}
        editor={offlineBannerEditor}
        preset={state.preset}
      />
      <List>
        {state.data.panelBanners.map(panel => {
          const panelBannerEditor = createEditorInterface(panel.id);
          return (
            <PanelBanner
              key={panel.id}
              data={panel}
              updateData={updateBannerData}
              editor={panelBannerEditor}
              preset={state.preset}
            />
          );
        })}
        <li>
          <Button onClick={addNewPanel}>Add New Panel</Button>
        </li>
      </List>
      <Editor
        data={activeFragmentData}
        updateData={updateActiveBannerData}
        centerText={centerActivePanelText}
        removeBanner={removeActiveBanner}
      />
    </Container>
  );
};

export default Designer;
