import React, { useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./FileUpload.module.css";

interface FormValues {
  city: string;
  population: string;
  state: string;
  filename: string;
}

interface FileUploadProps {
  formValues: FormValues;
  setFormValues: (values: FormValues) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ formValues, setFormValues }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formik = useFormik<FormValues>({
    initialValues: formValues,
    validationSchema: Yup.object({
      city: Yup.string(),
      population: Yup.string(),
      state: Yup.string(),
      filename: Yup.string(),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();

      formData.append("city", values.city);
      formData.append("population", values.population);
      formData.append("state", values.state);
      formData.append("filename", values.filename);

      const url = `${process.env.NEXT_PUBLIC_BASE_URL_BE}/ingest-files`;

      try {
        const response = await fetch(url, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          return alert("File upload failed. Try again");
        }

        alert("Files uploaded successfully");
      } catch (error) {
        console.error("Error uploading files:", error);
        alert("File upload failed. Try again");
      }
    },
  });

  const handleReset = () => {
    formik.resetForm();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e);
    setFormValues({
      ...formik.values,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="ml-10">
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <div className="flex justify-between items-center mt-4">
          <label htmlFor="city">City</label>
          <input
            id="city"
            name="city"
            type="text"
            className={styles.input}
            onChange={handleChange}
            value={formik.values.city}
          />
          {formik.errors.city ? (
            <div className=''>{formik.errors.city}</div>
          ) : null}
        </div>
        <div className="flex justify-between items-center">
          <label htmlFor="population" className="mr-3">Population</label>
          <input
            id="population"
            name="population"
            type="text"
            className={styles.input}
            onChange={handleChange}
            value={formik.values.population}
          />
          {formik.errors.population ? (
            <div className={styles.errors}>{formik.errors.population}</div>
          ) : null}
        </div>
        <div className="flex justify-between items-center">
          <label htmlFor="state">State</label>
          <input
            id="state"
            name="state"
            type="text"
            className={styles.input}
            onChange={handleChange}
            value={formik.values.state}
          />
          {formik.errors.state ? (
            <div className={styles.errors}>{formik.errors.state}</div>
          ) : null}
        </div>

        <div className="flex justify-between items-center">
          <label htmlFor="filename">FileName</label>
          <input
            id="filename"
            name="filename"
            type="text"
            className={styles.input}
            onChange={handleChange}
            value={formik.values.filename}
          />
          {formik.errors.state ? (
            <div className={styles.errors}>{formik.errors.state}</div>
          ) : null}
        </div>
      </form>
    </div>
  );
};

export default FileUpload;
