import "./Project.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import TableData from "../components/TableData";
import PieChart from "../components/Chart/PieChart";
import StackedBarChart from "../components/Chart/StackedBarChart";
import { getProjectById } from "../components/API/ApiFetch";
import { useParams } from "react-router-dom";
import { bagemann_class, shertmann_class } from "../components/utils/utils";

function Project() {
  const { id } = useParams<{ id: string }>();
  const [dataProject, setDataproject] = useState<unknown>({});
  interface DataTableItem {
    _id: string;
    kedalaman: number;
    HB: number;
    HL: number;
    FR: number;
    bagemann: number;
    shertmann: number;
    titik: number;
  }
  const classificationColors = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
  ];

  const [dataTable, setDataTable] = useState<DataTableItem[]>([]);

  const [bagemannPieData, setBagemannPieData] = useState<{
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
      borderColor: string;
      borderWidth: number;
    }[];
  }>({
    labels: [],
    datasets: [],
  });
  const [shertmannPieData, setShertmannPieData] = useState<{
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
      borderColor: string;
      borderWidth: number;
    }[];
  }>({
    labels: [],
    datasets: [],
  });
  const [bagemannBarData, setBagemannBarData] = useState<{
    labels: string[];
    datasets: { label: string; data: number[]; backgroundColor: string }[];
  }>({
    labels: [],
    datasets: [],
  });
  const [shertmannBarData, setShertmannBarData] = useState<{
    labels: string[];
    datasets: { label: string; data: number[]; backgroundColor: string }[];
  }>({
    labels: [],
    datasets: [],
  });

  // Function to map classification numbers to category labels
  const mapClassification = (value: number, type: "bagemann" | "shertmann") => {
    if (type === "bagemann") {
      return bagemann_class[value] || "UNKNOWN"; // Adjusted for 1-based index
    } else {
      return shertmann_class[value] || "UNKNOWN"; // Adjusted for 1-based index
    }
  };

  const getDataProject = async () => {
    try {
      if (id) {
        const response = await getProjectById(id);
        setDataproject(response);
        setDataTable(response.data); // Use the 'data' field from API response
      } else {
        console.error("Project ID is undefined");
      }
    } catch (error) {
      console.log("error occurs", error);
    }
  };

  useEffect(() => {
    getDataProject();
    const depthLabels = dataTable.map((item) => item.kedalaman);
    const bagemannCounts: Record<string, number> = {};
    const shertmannCounts: Record<string, number> = {};

    const initializeDepthCounts = (labels: string[], length: number) => {
      return Object.fromEntries(
        labels.map((label) => [label, new Array(length).fill(0)])
      );
    };

    const bagemannDepthCounts = initializeDepthCounts(
      bagemann_class,
      depthLabels.length
    );
    const shertmannDepthCounts = initializeDepthCounts(
      shertmann_class,
      depthLabels.length
    );

    dataTable.forEach((item, index) => {
      const bagemannLabel = mapClassification(item.bagemann, "bagemann");
      const shertmannLabel = mapClassification(item.shertmann, "shertmann");

      if (bagemannDepthCounts[bagemannLabel]) {
        bagemannDepthCounts[bagemannLabel][index] += 1;
      }
      if (shertmannDepthCounts[shertmannLabel]) {
        shertmannDepthCounts[shertmannLabel][index] += 1;
      }

      bagemannCounts[bagemannLabel] = (bagemannCounts[bagemannLabel] || 0) + 1;
      shertmannCounts[shertmannLabel] =
        (shertmannCounts[shertmannLabel] || 0) + 1;
    });

    setBagemannPieData({
      labels: Object.keys(bagemannCounts),
      datasets: [
        {
          label: "Bagemann Classification",
          data: Object.values(bagemannCounts),
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
          ],
          borderColor: "black",
          borderWidth: 2,
        },
      ],
    });

    setShertmannPieData({
      labels: Object.keys(shertmannCounts),
      datasets: [
        {
          label: "Shertmann Classification",
          data: Object.values(shertmannCounts),
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
          ],
          borderColor: "black",
          borderWidth: 2,
        },
      ],
    });

    const getBarData = (
      countsByDepth: Record<string, number[]>,
      depthLabels: string[]
    ) => ({
      labels: depthLabels,
      datasets: Object.keys(countsByDepth).map((classification, index) => ({
        label: classification,
        data: countsByDepth[classification],
        backgroundColor:
          classificationColors[index % classificationColors.length],
      })),
    });

    setBagemannBarData(getBarData(bagemannDepthCounts, depthLabels));
    setShertmannBarData(getBarData(shertmannDepthCounts, depthLabels));
  }, [dataTable]);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++)
      color += letters[Math.floor(Math.random() * 16)];
    return color;
  };

  return (
    <>
      <Navbar />
      <div className="container create_project">
        <h3 className="text-center mb-5 mt-5">Project {dataProject.title}</h3>
        <div className="row statistic">
          <div className="col-md-2 card-stat card-count">
            <p>Total Data: {dataProject.data?.length || 0}</p>
          </div>
          <div className="col-md-5 card-stat">
            <p>{dataProject.desc}</p>
          </div>
          <div className="col-md-3">
            <Link to={`/add/data/${id}`}>
              <button className="btn btn-primary btn-submit">
                Add New Data
              </button>
            </Link>
          </div>
        </div>
        <div className="row mt-5 border_box">
          <div className="col-md-8 table-section border_box">
            <TableData
              data={dataTable}
              refresh_data={getDataProject}
              project_id={id || ""}
            />
          </div>
          <div className="col-md-4 chart-graph border_box">
            {bagemannPieData.labels.length > 0 && (
              <PieChart
                chartData={bagemannPieData}
                text_data="Bagemann Classification Distribution"
              />
            )}
            {bagemannBarData.labels.length > 0 && (
              <StackedBarChart
                chartData={bagemannBarData}
                text_data="Bagemann Classification by Depth"
              />
            )}
            {shertmannPieData.labels.length > 0 && (
              <PieChart
                chartData={shertmannPieData}
                text_data="Shertmann Classification Distribution"
              />
            )}
            {shertmannBarData.labels.length > 0 && (
              <StackedBarChart
                chartData={shertmannBarData}
                text_data="Shertmann Classification by Depth"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Project;
