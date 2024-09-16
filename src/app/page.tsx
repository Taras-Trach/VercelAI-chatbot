"use client";

import React, { useState } from "react";
import Chat from "@/components/Chat/Chat";
import FileUpload from "@/components/FileUpload/FileUpload";

interface FormValues {
  city: string;
  population: string;
  state: string;
  filename: string;
}

export default function Home() {
  const [formValues, setFormValues] = useState<FormValues>({
    city: "",
    population: "",
    state: "",
    filename: ""
  });

  return (
    <main className="flex flex-col items-center p-7 h-full">
      <div className="flex w-full mt-8 gap-6 h-full">
        <FileUpload formValues={formValues} setFormValues={setFormValues} />
        <Chat formValues={formValues} />
      </div>
    </main>
  );
}
