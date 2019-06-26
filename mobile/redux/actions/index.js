import { OPEN_SUPPY_MODAL, OPEN_REPORT_MODAL } from "./action-types";

export const openSupplyModal = payload => {
  return { type: OPEN_SUPPLY_MODAL, payload };
};

export const openReportModal = payload => {
  return { type: OPEN_REPORT_MODAL, payload };
};
