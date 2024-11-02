import "./CardProjects.css";
import { Link } from "react-router-dom";
import { deleteProject } from "./API/ApiFetch";

interface CardProjectsProps {
  title: string;
  num_data: number;
  desc: string;
  id: string;
  refresh_data: () => void;
}
function CardProjects({
  id,
  title,
  num_data,
  desc,
  refresh_data,
}: CardProjectsProps) {
  const handeDelete = async (id: string) => {
    try {
      const response = await deleteProject(id);
      console.log(response);
      refresh_data();
    } catch (error) {
      console.log("error ", error);
    }
  };
  return (
    <>
      <div className="col-md-4">
        <div className="card card_project">
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <h6 className="card-subtitle mb-2 text-body-secondary">
              Total Data : {num_data}
            </h6>
            <p className="card-text">{desc}</p>
            <Link to={`/project/${id}`} className="card-link">
              <button className="btn select-color">Select</button>
            </Link>
            <a className="card-link">
              <button
                onClick={() => handeDelete(id)}
                className="btn warning-color"
              >
                Delete
              </button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardProjects;
