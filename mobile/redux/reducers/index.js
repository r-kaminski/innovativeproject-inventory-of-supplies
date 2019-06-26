import { OPEN_SUPPLY_MODAL, OPEN_REPORT_MODAL } from "../actions/action-types";

const initialState = {
  openSupplyModal: false,
  supplyModalTarget: null,
  openReportModal: false
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
  }
  return state;
}
