import { useState, useEffect } from "react";
import "./Home.css";
import Navbar from "../components/Navbar";
import CardProjects from "../components/CardProjects";
import { Link } from "react-router-dom";
import { getProject } from "../components/API/ApiFetch";
function Home() {
  const [projects, setProjects] = useState<
    { _id: string; title: string; dataCount: number; desc: string }[]
  >([]);
  const fetchProject = async () => {
    try {
      const projectData = await getProject();
      setProjects(projectData);
      console.log(projectData);
    } catch (error) {
      console.log("Error :", error);
    }
  };
  useEffect(() => {
    fetchProject();
  }, []);
  return (
    <>
      <Navbar />
      <div className="container secondary-color">
        <h3 className="main-title text-center mt-5">
          Select or Create Project
        </h3>
        <div className="row create-section mb-5">
          <div className="col-4 col-md-2 ms-auto ">
            <Link to="/create">
              <button className="btn select-color">Create New Project</button>
            </Link>
          </div>
        </div>
        <div className="row projects-section">
          {projects.map((project) => (
            <CardProjects
              key={project._id}
              title={project.title}
              num_data={project.dataCount}
              desc={project.desc}
              id={project._id}
              refresh_data={fetchProject}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
