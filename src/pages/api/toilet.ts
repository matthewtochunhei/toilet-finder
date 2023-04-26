import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs";
import fsPromises from "fs/promises";
import AdmZip from "adm-zip";
import { map } from "leaflet";
import { ToiletLocation } from "@/models/toiletLocation";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const data: ToiletLocation[] = getStaticProps();
  // get lat, lng and limit from query string
  const { lat, lng, limit } = req.query;
  // parse lat, lng and limit to number
  const latNum = Number(lat);
  const lngNum = Number(lng);
  const limitNum = Number(limit);
  console.log(latNum, lngNum, limitNum);
  // get the 5 closest toilets using the haversine formula
  const closestToilets = data
    .map((toilet) => {
      const lat2 = Number(toilet.LATITUDE);
      const lng2 = Number(toilet.LONGITUDE);
      const R = 6371e3; // metres
      const φ1 = (latNum * Math.PI) / 180; // φ, λ in radians
      const φ2 = (lat2 * Math.PI) / 180;
      const Δφ = ((lat2 - latNum) * Math.PI) / 180;
      const Δλ = ((lng2 - lngNum) * Math.PI) / 180;

      const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      const d = R * c; // in metres
      return { ...toilet, distance: d };
    })
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limitNum);

  res.status(200).json(closestToilets);
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
