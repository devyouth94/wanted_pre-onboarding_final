import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { userAPI } from "apis/user";
import { accountAPI } from "apis/account";
import { IAccounts, IUsers } from "utils/tpyes";
import { ACCOUNT_TABLE_HEADER } from "utils/arr";
import { ACCOUNT_STATUS, BROKERS } from "utils/enums";
import { convertDate, convertMonetaryUnit } from "utils/func";

const AccountList = () => {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [isSearch, setIsSearch] = useState(false);
  const [query, setQuery] = useState("");

  const { data: userData } = useQuery(["users"], userAPI.getUserAll, {
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    select: (users) => users.filter((user: IUsers) => user.uuid),
  });

  const {
    status,
    data: accountData,
    isFetching,
    isPreviousData,
  } = useQuery(["accounts", { page, isSearch }], () => accountAPI.getAccountList({ page, query }), {
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    staleTime: 5000,
    enabled: !!userData,
  });

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (query.trim().length) {
      setPage(1);
      setIsSearch((prev) => !prev);
    } else {
      alert("검색어를 입력해주세요.");
    }
  };

  const handleSearchReset = () => {
    if (!query) return;

    setPage(1);
    setIsSearch((prev) => !prev);
    setQuery("");
  };

  const userName = (id: number) => {
    const [data] = userData.filter((user: IUsers) => user.id === id);

    return data.name;
  };

  return (
    <>
      {status === "loading" && <span>Loading...</span>}
      {status === "error" && <span>Error!</span>}

      <section className="flex h-[40px] items-center justify-between">
        <form onSubmit={handleSearch} className="flex h-full items-center gap-5">
          <input
            className="h-full w-80 rounded-xl border border-stone-300 px-2"
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="검색어를 입력해주세요"
          />
          <button type="submit">검색</button>
          <button type="button" onClick={handleSearchReset}>
            초기화
          </button>
        </form>

        <article className="flex gap-4">
          <button onClick={() => setPage((prev) => Math.max(prev - 1, 0))} disabled={page === 1}>
            이전
          </button>
          <span>{page} 페이지</span>
          <button
            onClick={() => setPage((prev) => (accountData?.length ? prev + 1 : prev))}
            disabled={isPreviousData || !accountData?.length}
          >
            다음
          </button>
        </article>
      </section>

      <section className="mt-5 flex flex-nowrap overflow-x-scroll">
        {status === "success" && !isFetching && (
          <table className="table">
            <thead>
              <tr>
                {ACCOUNT_TABLE_HEADER.map((header, idx) => (
                  <th className="table-header" key={idx}>
                    <span>{header}</span>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {accountData.map((item: IAccounts) => (
                <tr key={item.uuid}>
                  <td
                    className="table-body cursor-pointer underline"
                    onClick={() =>
                      navigate(`/user/${item.uuid}`, { state: { userId: item.user_id } })
                    }
                  >
                    {userName(item.user_id)}
                  </td>
                  <td className="table-body">{BROKERS[item.broker_id]}</td>
                  <td
                    className="table-body cursor-pointer underline"
                    onClick={() =>
                      navigate(`/account/${item.uuid}`, {
                        state: { userName: userName(item.user_id) },
                      })
                    }
                  >
                    {item.number}
                  </td>
                  <td className="table-body">{ACCOUNT_STATUS[item.status]}</td>
                  <td className="table-body">{item.name}</td>
                  <td className="table-body text-end">{convertMonetaryUnit(item.assets)}</td>
                  <td className="table-body text-end">{convertMonetaryUnit(item.payments)}</td>
                  <td className="table-body">{item.is_active ? "활성화" : "비활성화"}</td>
                  <td className="table-body">{convertDate(item.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </>
  );
};

export default AccountList;
