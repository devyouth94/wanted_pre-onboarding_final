import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { accountAPI } from "apis/account";
import { ACCOUNT_STATUS, BROKERS } from "utils/enums";
import { convertDate, convertMonetaryUnit } from "utils/func";

const AccountInfo = () => {
  const navigate = useNavigate();
  const { state, pathname } = useLocation();

  const { status, data } = useQuery(
    ["accountInfo"],
    () => accountAPI.getAccountInfo(pathname.split("/")[2]),
    { refetchOnWindowFocus: false, select: (data) => data[0] },
  );

  return (
    <>
      {status === "loading" && <span>Loading...</span>}
      {status === "error" && <span>Error!</span>}
      {status === "success" && (
        <section className="grid grid-cols-3">
          <article className="grid grid-cols-[120px_auto]">
            <span className="table-header">이름</span>
            <span
              className="table-body cursor-pointer underline"
              onClick={() => navigate(`/user/${data.uuid}`, { state: { userId: data.user_id } })}
            >
              {state.userName}
            </span>
          </article>

          <article className="grid grid-cols-[120px_auto]">
            <span className="table-header">증권사</span>
            <span className="table-body">{BROKERS[data.broker_id]}</span>
          </article>

          <article className="grid grid-cols-[120px_auto]">
            <span className="table-header">계좌 번호</span>
            <span className="table-body">{data.number}</span>
          </article>

          <article className="grid grid-cols-[120px_auto]">
            <span className="table-header">계좌 상태</span>
            <span className="table-body">{ACCOUNT_STATUS[data.status]}</span>
          </article>

          <article className="grid grid-cols-[120px_auto]">
            <span className="table-header">계좌명</span>
            <span className="table-body">{data.name}</span>
          </article>

          <article className="grid grid-cols-[120px_auto]">
            <span className="table-header">평가 금액</span>
            <span className="table-body">{convertMonetaryUnit(data.assets)}</span>
          </article>

          <article className="grid grid-cols-[120px_auto]">
            <span className="table-header">입금 금액</span>
            <span className="table-body">{convertMonetaryUnit(data.payments)}</span>
          </article>

          <article className="grid grid-cols-[120px_auto]">
            <span className="table-header">계좌 활성화</span>
            <span className="table-body">{data.is_active ? "활성화" : "비활성화"}</span>
          </article>

          <article className="grid grid-cols-[120px_auto]">
            <span className="table-header">계좌 개설일</span>
            <span className="table-body">{convertDate(data.created_at)}</span>
          </article>
        </section>
      )}
    </>
  );
};

export default AccountInfo;
