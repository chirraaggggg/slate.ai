"use client";

import dynamic from "next/dynamic";

const CreateNoteDialog = dynamic(() => import("@/components/CreateNoteDialog"), {
  ssr: false,
});

const CreateNoteDialogClient = () => {
  return <CreateNoteDialog />;
};

export default CreateNoteDialogClient;
