import React from "react";
import GridExample from "./components/GridExample";
// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-alpine.css";
import GridWithAPI from "./components/GridWithAPI";
import GridLayout from "./components/GridLayout";
import GridDarkMode from "./components/GridDarkMode";
import GridMultiple from "./components/GridMultiple";
import GridSparkLine from "./components/GridSparkLine";
import ThreeData from "./components/ThreeData";


const App = () => {
  return (
    <div>
      <div style={{ height: "100vh", width: "100%" }}>
      {/* <GridWithAPI />  */}
      {/* <GridMultiple /> */}
      {/* <GridSparkLine /> */}
      {/* <GridDarkMode /> */}
      {/* <GridLayout></GridLayout> */}
      <ThreeData />
      </div>
      {/* <GridExample /> */}
    </div>
  );
};

export default App;
