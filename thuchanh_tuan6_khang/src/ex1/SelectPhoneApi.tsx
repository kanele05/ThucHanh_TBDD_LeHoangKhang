import React, { useCallback, useEffect, useState } from "react";
import { Phone } from "../types";
import { fetchPhone } from "../api/phoneApi";
import { Loading } from "../components/Loading";
import { ErrorBox } from "../components/ErrorBox";
import { SelectPhoneApp } from "./SelectPhoneApp";

export function SelectPhoneApi() {
  const [phone, setPhone] = useState<Phone | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    // TODO 1: xoá kết quả cũ để hiện lại vòng xoay
    setError(null);
    setPhone(null);
    // TODO 2: gọi API
    try {
      setPhone(await fetchPhone("1"));
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  }, []);

  // TODO 3: tải khi màn hình mở lần đầu
  useEffect(() => {
    load();
  }, [load]);

  if (error) return <ErrorBox message={error} onRetry={load} />;   // TODO 4
  if (!phone) return <Loading />;                                     // TODO 5
  return <SelectPhoneApp phone={phone} />;                            // TODO 6
}
