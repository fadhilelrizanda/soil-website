import { useState } from "react";
import "./CreateProject.css";
import Navbar from "../components/Navbar";
import { createProject } from "../components/API/ApiFetch";
import { useNavigate } from "react-router-dom";

function CreateProject() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createProject({ title, desc });
      console.log("API ", response);
      if (response._id) {
        setMessage("Project created successfully");
        navigate("/");
      } else {
        setMessage("Failed to create project");
      }
    } catch (error) {
      setMessage("Error Occurs when creating project");
    }
  };
  return (
    <>
      <Navbar />
      <div className="container create_project">
        <h3 className="text-center mb-5 mt-5">Create New Project</h3>
        <form onSubmit={handleSubmit}>
          <div className="row ">
            <div className="col-md-10 mx-auto">
              <div className="form-floating mb-3 ">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Project title"
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                <label htmlFor="floatingInput">Project's name</label>
              </div>
              <div className="form-floating">
                <textarea
                  className="form-control"
                  placeholder="Desc Project"
                  id="floatingTextarea"
                  onChange={(e) => setDesc(e.target.value)}
                  required
                ></textarea>
                <label htmlFor="floatingTextarea">Description</label>
              </div>
            </div>
            <button
              type="submit"
              className="btn select-color btn-submit mx-auto"
            >
              Submit
            </button>
            {message && <p className="mt-3">{message}</p>}
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateProject;
