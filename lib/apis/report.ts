import { request } from ".";
import { REPORT_URL } from "../constants";

export const reportApi = {
  annualProfit: (vendorId?: number) => {
    return request.get(`${REPORT_URL}/onlineshopping/reporting/annual-profit`, {
      params: {
        vendorId,
      },
    });
  },
  annualRevenue: (vendorId?: number) => {
    return request.get(
      `${REPORT_URL}/onlineshopping/reporting/annual-revenue`,
      {
        params: {
          vendorId,
        },
      }
    );
  },
  sales: (vendorId?: number) => {
    return request.get(`${REPORT_URL}/onlineshopping/reporting/sales`, {
      params: {
        vendorId,
      },
    });
  },
  sendEmail: (userId: number, message?: string) => {
    return request.post(`${REPORT_URL}/notification-service/email`, {
      userId,
      message,
      emailType: "OtherCommunication",
    });
  },
};
