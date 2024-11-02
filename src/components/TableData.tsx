import React from "react";
import "./TableData.css";
import { bagemann_class, shertmann_class } from "./utils/utils";
import { deleteDataEntry } from "./API/ApiFetch";
// Define props interface
interface TableDataProps {
  data: {
    _id: string;
    kedalaman: number;
    HB: number;
    HL: number;
    FR: number;
    bagemann: number;
    shertmann: number;
    titik: number;
  }[];
  refresh_data: () => void;
  project_id: string;
}

const TableData: React.FC<TableDataProps> = ({
  data,
  refresh_data,
  project_id,
}) => {
  const sortedData = [...data].sort((a, b) => {
    if (a.titik === b.titik) {
      return b.kedalaman - a.kedalaman; // Secondary sort by kedalaman in descending order
    }
    return b.titik - a.titik; // Primary sort by titik in descending order
  });

  const handleDelete = async (p_id: string, d_id: string) => {
    try {
      const response = await deleteDataEntry(p_id, d_id);
      refresh_data();
      return response;
    } catch (error) {
      console.log("error handle delete", error);
    }
  };
  return (
    <div className="TableData">
      <h4>Tabel Data Tanah</h4>
      <table className="table table-bordered">
        <thead className="head">
          <tr className="tableHead">
            <th scope="col">No</th>
            <th scope="col">Depth (meter)</th>
            <th scope="col">QC(Mpa)</th>
            <th scope="col">fs(Mpa)</th>
            <th scope="col">FR(%)</th>
            <th scope="col">Classification (Bagemann)</th>
            <th scope="col">Classification (Shertmann)</th>
            <th scope="col">Point</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, index) => (
            <tr key={row._id}>
              <th scope="row">{index + 1}.</th>
              <td>{row.kedalaman}</td>
              <td>{row.HB}</td>
              <td>{row.HL}</td>
              <td>{row.FR}</td>
              <td>{bagemann_class[row.bagemann]}</td>
              <td>{shertmann_class[row.shertmann]}</td>
              <td>{row.titik}</td>
              <td>
                <button
                  onClick={() => handleDelete(project_id, row._id)}
                  className="btn warning-color"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableData;
