export const path = (pathname: string) => {
  if (pathname === "/") {
    return "계좌 목록";
  } else if (pathname.includes("/account")) {
    return "계좌 상세";
  } else if (pathname === "/user") {
    return "사용자 목록";
  } else if (pathname.includes("/user") && pathname.split("/").length === 3) {
    return "사용자 상세";
  } else {
    return "";
  }
};

export const convertDate = (value: string) => {
  const [month, date, year] = new Date(value).toLocaleDateString("en-US").split("/");

  return `${year}년 ${month}월 ${date}일`;
};

export const convertMonetaryUnit = (value: string) => {
  return `${Number(value).toLocaleString("ko-KR")}원`;
};
