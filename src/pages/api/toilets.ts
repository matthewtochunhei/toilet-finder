import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs";
import fsPromises from "fs/promises";
import AdmZip from "adm-zip";
import { map } from "leaflet";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const data = getStaticProps();
  res.status(200).json(data);
}

function getStaticProps() {
  // read zip file located in public folder
  const filePath = path.join(
    process.cwd(),
    "public",
    "FEHDfacilityandservicelocations_CSV.zip"
  );
  const zipFile = fs.readFileSync(filePath);
  const zip = new AdmZip(zipFile);
  // read file from zip
  const zipEntries = zip.getEntries();
  const csvFile = zip.readAsText(zipEntries[0]);
  // parse csv file
  const csv = csvFile.split("\n");
  const headers = csv[0].split(",");
  const data = csv.slice(1);
  const toilets = data.map((row) => {
    //const rowData = row.split(",");
    const rowData = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);

    const toilet: any = {};
    headers.forEach((header, index) => {
      toilet[header] = rowData[index];
    });
    return toilet;
  });
  return toilets;
}
