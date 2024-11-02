import Navbar from "../components/Navbar";
import "./SubmitData.css";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { predictData } from "../components/API/ApiFetch";
function SubmitData() {
  const { id } = useParams<{ id: string }>();
  const [depth, setDepth] = useState(0);
  const [HL, setHL] = useState(0);
  const [HB, setHB] = useState(0);
  const [FR, setFR] = useState(0);
  const [point, setPoint] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!id) {
      console.log("Error: ID is undefined");
      return;
    }
    try {
      const response = await predictData({ id, depth, HL, HB, FR, point });
      navigate(`/project/${id}`);
      return response;
    } catch (error) {
      console.log("Error submit ", error);
    }
  };
  return (
    <>
      <Navbar />
      <div className="container">
        <h3 className="text-center mt-5">Add and Analyze Data</h3>
        <div className="row justify-content-center">
          <form onSubmit={handleSubmit}>
            <div className="col-md-8 input-card">
              <h4 className="text-center mt-5 mb-5">
                Soil Analysis Bagemann and Shertmann
              </h4>
              <div className="row justify-content-center">
                <div className="col-md-5">
                  <div className="form-floating mb-3">
                    <input
                      type="number"
                      className="form-control"
                      id="floatingInput"
                      onChange={(e) => {
                        setDepth(Number(e.target.value));
                      }}
                      step="any"
                    />
                    <label htmlFor="floatingInput">Depth (Meter) </label>
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="form-floating mb-3">
                    <input
                      type="number"
                      className="form-control"
                      id="floatingInput"
                      onChange={(e) => setHB(Number(e.target.value))}
                      step="any"
                    />
                    <label htmlFor="floatingInput">Qc(Mpa)</label>
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="form-floating mb-3">
                    <input
                      type="number"
                      className="form-control"
                      id="floatingInput"
                      onChange={(e) => {
                        setHL(Number(e.target.value));
                      }}
                      step="any"
                    />
                    <label htmlFor="floatingInput">fs(Mpa)</label>
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="form-floating mb-3">
                    <input
                      type="number"
                      className="form-control"
                      id="floatingInput"
                      onChange={(e) => setFR(Number(e.target.value))}
                      step="any"
                    />
                    <label htmlFor="floatingInput">FR(%)</label>
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="form-floating mb-3">
                    <input
                      type="number"
                      className="form-control"
                      id="floatingInput"
                      onChange={(e) => {
                        setPoint(Number(e.target.value));
                      }}
                      step="any"
                    />
                    <label htmlFor="floatingInput">Point</label>
                  </div>
                </div>
              </div>
              <div className="row justify-content-center">
                <button type="submit" className="btn btn-primary btn-submit">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SubmitData;
