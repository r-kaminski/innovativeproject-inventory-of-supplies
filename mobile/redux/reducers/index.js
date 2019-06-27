import {
  OPEN_SUPPLY_MODAL,
  OPEN_REPORT_MODAL,
  SHOW_SEARCH_BAR,
  NAV_BAR_CONFIG,
  LOG_OUT
} from "./../actions/action-types";

const initialState = {
  logout : ()=>void(0),
  openSupplyModal: false,
  supplyModalTarget: null,
  openReportModal: false,
  showSearchBar: false,
  navBarConfig: {
    showNavBar: true,
    showButtonNew: true,
    buttonNewAction: ()=>void(0),
    showButtonSearch: true,
    showButtonQr: false,
    buttonQrAction: ()=>void(0),
  }
};

export default function rootReducer(state = initialState, action) {
  if (action.type === OPEN_SUPPLY_MODAL) {
    let open = action.payload.open || false;
    let target = action.payload.target || null;
    return Object.assign({}, state, {
      openSupplyModal: open,
      supplyModalTarget: target
    });
  } else if (action.type === OPEN_REPORT_MODAL) {
    let open = action.payload.open || false;
    return Object.assign({}, state, {
      openReportModal: open
    });
  } else if (action.type === SHOW_SEARCH_BAR) {
    return Object.assign({}, state, {
      showSearchBar: action.payload.show
    });
  } else if (action.type === NAV_BAR_CONFIG) {
    return Object.assign({}, state, {
      navBarConfig: action.payload
    });
  } else if (action.type === LOG_OUT) {
    return Object.assign({}, state, {
      logout: action.payload
    });
  }

  return state;
}
