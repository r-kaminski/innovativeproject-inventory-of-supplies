import {
  OPEN_SUPPLY_MODAL,
  OPEN_REPORT_MODAL,
  SHOW_SEARCH_BAR,
  NAV_BAR_CONFIG,
  LOG_OUT,
} from "./action-types";

export const openSupplyModal = payload => {
  return { type: OPEN_SUPPLY_MODAL, payload };
};

export const openReportModal = payload => {
  return { type: OPEN_REPORT_MODAL, payload };
};

export const showSearchBar = payload => {
  return { type: SHOW_SEARCH_BAR, payload };
};

export const navBarConfig = payload => {
  return { type: NAV_BAR_CONFIG, payload };
};

export const logout = payload => {
  return { type: LOG_OUT, payload };
};