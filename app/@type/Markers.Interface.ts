import { MarkerDetailsInterface } from "./Markers.Details";

export interface MarkersInterface {
  _id: string;
  courseName: string;
  markersId: string;
  courseLayoutId: string;
  color: string;
  colorCode: string;
  totalPar: number;
  totalDistance: number;
  markerDetails: MarkerDetailsInterface[];
}
