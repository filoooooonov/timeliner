"use client";

import React, { useState } from "react";
import { CompanyData } from "../timeline/[slug]/page";

const production = "https://timeliner-demo.vercel.app";
const development = "http://localhost:3000";
const URL = process.env.NODE_ENV === "development" ? development : production;

const addCompanyDataToDB = async (formData: CompanyData) => {
  const response = await fetch(`${URL}/api/add-company`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (response.ok) {
    console.log("Company added successfully");
  } else {
    console.error("API Error:", response.statusText);
  }
};

const page = () => {
  const [formData, setFormData] = useState({
    slug: "",
    name: "",
    description: "",
    month_founded: "",
    year_founded: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = generateSlug(formData.name);
    addCompanyDataToDB({ ...formData, slug });
  };

  return (
    <div className="w-max mx-auto mt-40 p-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
        className="flex flex-col gap-4 max-w-4xl"
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="input"
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="input"
        />
        <input
          type="text"
          name="month_founded"
          placeholder="Month Founded"
          value={formData.month_founded}
          onChange={handleChange}
          className="input"
        />
        <input
          type="text"
          name="year_founded"
          placeholder="Year Founded"
          value={formData.year_founded}
          onChange={handleChange}
          className="input"
        />
        <button type="submit" className="button-primary">
          Add to DB
        </button>
      </form>
    </div>
  );
};

export default page;
