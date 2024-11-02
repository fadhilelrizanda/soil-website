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
            <th scope="col">Kedalaman</th>
            <th scope="col">HB</th>
            <th scope="col">HL</th>
            <th scope="col">FR</th>
            <th scope="col">Klasifikasi (Metoda Bagemann)</th>
            <th scope="col">Klasifikasi (Shertmann)</th>
            <th scope="col">Titik</th>
            <th scope="col">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
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
