import { Suspense } from "react";
import ConfirmBusinessPage from "./ConfirmBusinessPage";

export default function ConfirmBusinessPageWrapper() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <ConfirmBusinessPage />
    </Suspense>
  );
}