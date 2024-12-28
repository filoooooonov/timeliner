import mongoose, { models, Schema } from "mongoose";
import { boolean } from "zod";

const companySchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
    },
    creator: {
      type: String,
      // ref: "User",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    month_founded: {
      type: String,
      required: true,
    },
    year_founded: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: String,
      },
    ],
    founders: [
      {
        // id: {
        //   type: String,
        //   required: true,
        // },
        name: {
          type: String,
          required: false,
        },
        job_title: {
          type: String,
          required: false,
        },
        image: {
          type: String,
          required: false,
        },
      },
    ],
    timeline_entries: [
      {
        dateISO: {
          type: Date,
          required: true,
        },
        includesDay: {
          type: Boolean,
          required: true,
        },
        text: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Company = models.Company || mongoose.model("Company", companySchema);
export default Company;
