import { request } from ".";

export const reportApi = {
  summary: (vendorId?: number) => {
    return request.get(`/report-service/summary`, {
      params: {
        vendorId,
        fromDate: dateFormater(new Date(), "-"),
        toDate: dateFormater(new Date(), "-"),
      },
    });
  },
  annualProfit: (vendorId?: number) => {
    return request.get(`/report-service/annual-profit`, {
      params: {
        vendorId,
      },
    });
  },
  annualRevenue: (vendorId?: number) => {
    return request.get(`/report-service/annual-revenue`, {
      params: {
        vendorId,
      },
    });
  },
  sales: (vendorId?: number) => {
    return request.get(`/report-service/sales`, {
      params: {
        vendorId,
      },
    });
  },
  sendEmail: (userId: number, message?: string) => {
    return request.post(`/notification-service/email`, {
      userId,
      message,
      emailType: "OtherCommunication",
    });
  },
};

const dateFormater = (date: Date, separator: string) => {
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  if (day < 10) {
    //@ts-ignore
    day = "0" + day;
  }
  if (month < 10) {
    //@ts-ignore
    month = "0" + month;
  }

  // now we have day, month and year
  // use the separator to join them
  return year + separator + month + separator + day;
};
