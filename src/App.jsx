import { useEffect, useState } from "react";
import "./App.css";
import { useDropzone } from "react-dropzone";
import Select from "react-select";
import Papa from "papaparse";
import DynamicChart from "./components/DynamicChart";
import CloseIcon from "./assets/close.png";
function App() {
  const [acceptedFiles, setAcceptedFiles] = useState([]);
  // React file DropZone Initalisation
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: {
      "text/csv": [".csv"],
      "application/json": [".json"],
    },
    onDrop: (files) => {
      setAcceptedFiles(files);
    },
  });
  /**Parsing Json files */
  const handleJsonUpload = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      let data = JSON.parse(reader.result);
      setHeaders(
        Object.keys(data[0]).map((key) => {
          return { value: key, label: key };
        })
      );
      setConfig({
        ...config,
        data: data,
      });
    };
    reader.readAsText(file);
  };

  /**Parsing CSV Files */
  const handleCsvUpload = (file) => {
    Papa.parse(file, {
      header: true,
      complete: (result) => {
        setHeaders(
          Object.keys(result.data[0]).map((key) => {
            return { value: key, label: key };
          })
        );
        setConfig({
          ...config,
          data: result.data,
        });
      },
    });
  };

  // Hook to capture change of acceptedFiles variable
  useEffect(() => {
    setConfig({
      xAxis: null,
      yAxis: null,
      chartType: null,
      data: null,
    });
    setHeaders([]);
    if (acceptedFiles.length) {
      if (acceptedFiles[0].type === "application/json")
        handleJsonUpload(acceptedFiles[0]);
      if (acceptedFiles[0].type === "text/csv")
        handleCsvUpload(acceptedFiles[0]);
    }
  }, [acceptedFiles]);

  // Types of charts available to generate
  const CHART_TYPES = [
    {
      label: "Donut",
      value: "donut",
    },
    {
      label: "Scatterplot",
      value: "scatterplot",
    },
    {
      label: "Bar Chart",
      value: "bar_chart",
    },
    {
      label: "Line Chart",
      value: "line_chart",
    },
    {
      label: "Area Chart",
      value: "area_chart",
    },
    {
      label: "Pie Chart",
      value: "pie_chart",
    },
    {
      label: "Radar Chart",
      value: "radar_chart",
    },
  ];

  // Chart Config
  const [config, setConfig] = useState({
    xAxis: null,
    yAxis: null,
    chartType: null,
    data: null,
  });

  // Headers of the given data to select axis keys
  const [headers, setHeaders] = useState([]);

  return (
    <div className="">
      <div className="my-[2rem] w-[90%] m-auto bg-white p-10 max-sm:p-3 rounded-lg border border-slate-200">
        <h3 className="text-4xl font-semibold text-slate-600 text-center">
          Dynamic Data Visualisation Dashboard
        </h3>
        <div className="flex justify-between flex-wrap max-sm:gap-5 mt-10">
          <div className="w-[40%] max-sm:w-[100%]">
            {/* File Upload - Click or Drag and Drop */}
            <div className="">
              <div
                {...getRootProps({ className: "dropzone" })}
                className="rounded-md py-8 max-sm:px-12 px-40 w-fit border-slate-300 border-dashed border-[3px]"
              >
                <input {...getInputProps()} />
                <div>
                  <p className="text-center">Upload File</p>
                  <span className="text-xs font-medium text-slate-400">
                    Accepted files .csv, .json
                  </span>
                </div>
              </div>
              {acceptedFiles.length ? (
                <>
                  <div className="flex gap-2  align-middle mt-3">
                    <p className="text-sm">{acceptedFiles[0].name} </p>
                    <div>
                      <img
                        src={CloseIcon}
                        onClick={() => {
                          setAcceptedFiles([]);
                        }}
                        alt=""
                        className="cursor-pointer w-2 h-2"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
            {/* Chart Type Select */}
            <div className="mt-10">
              <p className="mb-2 font-semibold">Chart Configuration:</p>
              <div className="">
                <div className="w-fit">
                  <p className="text-sm font-medium mb-2">Chart Type</p>
                  <Select
                    className="min-w-[250px]"
                    options={CHART_TYPES}
                    value={config.chartType}
                    onChange={(option) => {
                      setConfig({ ...config, chartType: option });
                    }}
                    isClearable
                  />
                </div>
                <div className="flex flex-wrap gap-4 mt-5">
                  <div className="w-[45%] max-sm:w-[100%]">
                    <p className="text-sm font-medium mb-2">X-axis</p>
                    <Select
                      className=""
                      options={headers}
                      value={config.xAxis}
                      isOptionDisabled={(option) =>
                        option.value === config.yAxis?.value
                      }
                      onChange={(option) => {
                        setConfig({
                          ...config,
                          xAxis: option,
                        });
                      }}
                      isClearable
                    />
                  </div>
                  <div className="w-[45%] max-sm:w-[100%]">
                    <p className="text-sm font-medium mb-2">Y-axis</p>
                    <Select
                      className=""
                      options={headers}
                      value={config.yAxis}
                      isOptionDisabled={(option) =>
                        option.value === config.xAxis?.value
                      }
                      onChange={(option) => {
                        setConfig({
                          ...config,
                          yAxis: option,
                        });
                      }}
                      isMulti={
                        [
                          "bar_chart",
                          "line_chart",
                          "area_chart",
                          "radar_chart",
                        ].includes(config.chartType?.value)
                          ? true
                          : false
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-3">
              {/* Other Options */}
              {/* <div className="flex gap-8">
                <p className="text-xs flex gap-2"><input type="checkbox" name="" id="" /> Tool Tip</p>
                <p className="text-xs flex gap-2"><input type="checkbox" name="" id="" /> Label</p>
              </div> */}
            </div>
          </div>
          <div className="w-[50%] max-sm:w-[100%]">
            {config.chartType && <DynamicChart {...config} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
