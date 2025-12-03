/********************************************************************************
* WEB422 – Assignment 02
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: Yahya Osman Student ID: 179264239 Date: 11/11/2025
*
********************************************************************************/

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Table, Pagination } from "react-bootstrap";
import PageHeader from "@/components/PageHeader";

const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
};

export default function Books() {
  const router = useRouter();
  const [page, setPage] = useState(1);

  const queryString = useMemo(() => {
    if (!router.isReady) return "";
    return new URLSearchParams(router.query).toString();
  }, [router.isReady, router.query]);

  useEffect(() => {
    setPage(1);
  }, [queryString]);

  const url = queryString
    ? `https://openlibrary.org/search.json?${queryString}&page=${page}&limit=10`
    : null;

  const { data, error } = useSWR(url, fetcher);
  const docs = data?.docs ?? [];
  const numFound = data?.numFound ?? 0;
  const pageSize = 10;
  const maxPage = Math.max(1, Math.ceil(numFound / pageSize));

  const previous = () => setPage((p) => Math.max(1, p - 1));
  const next = () => setPage((p) => Math.min(maxPage, p + 1));

  const subtext = useMemo(() => {
    if (!router.isReady) return "";
    const order = [
      ["author", "author"],
      ["title", "title"],
      ["subject", "subject"],
      ["language", "language"],
      ["first_publish_year", "first_publish_year"],
    ];
    const parts = [];
    order.forEach(([key, label]) => {
      const value = router.query[key];
      if (value && String(value).trim() !== "") {
        parts.push(
          `<strong style="color:black;">${label}:</strong> ${String(value)
            .split("+")
            .join(" ")}`
        );
      }
    });
    return parts.join(" ");
  }, [router.isReady, router.query]);

  if (error) {
    return (
      <>
        <PageHeader text="Search Results" subtext={<span dangerouslySetInnerHTML={{ __html: subtext }} />} />
        <div className="pt-5 mt-3" />
      </>
    );
  }

  if (!data) {
    return (
      <>
        <PageHeader text="Search Results" subtext={<span dangerouslySetInnerHTML={{ __html: subtext }} />} />
        <div className="pt-5 mt-3" />
      </>
    );
  }

  return (
    <div className="pt-5 mt-3">
      <PageHeader
        text="Search Results"
        subtext={<span dangerouslySetInnerHTML={{ __html: subtext }} />}
      />
      <Table striped hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Published</th>
          </tr>
        </thead>
        <tbody>
          {docs.length > 0 &&
            docs.map((b) => (
              <tr
                key={`${b.key}-${b.first_publish_year ?? "na"}`}
                style={{ cursor: b.key ? "pointer" : "default" }}
                onClick={() => {
                  if (b.key) router.push(b.key);
                }}
              >
                <td>{b.title}</td>
                <td>{b.first_publish_year ?? "N/A"}</td>
              </tr>
            ))}
        </tbody>
      </Table>
      <Pagination>
        <Pagination.Prev onClick={previous} disabled={page === 1} />
        <Pagination.Item active>{page}</Pagination.Item>
        <Pagination.Next onClick={next} disabled={page >= maxPage} />
      </Pagination>
    </div>
  );
}

