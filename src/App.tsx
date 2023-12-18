import "./App.css";
import wineJSONData from "./assets/wineData.json";

import Table from "./components/Table/Table";
import { WineData } from "./interfaces/WineData";
import { calculateGamma, groupByAlcohol } from "./utils/utils";

function App() {
  const wineData: Map<number, WineData[]> = groupByAlcohol(
    wineJSONData as WineData[]
  );
  const extendedWineData = wineData;
  Array.from(extendedWineData.keys()).forEach((value) => {
    const data = extendedWineData.get(value);
    if (data !== undefined) extendedWineData.set(value, calculateGamma(data));
  });

  return (
    <div className="App">
      <div>
        <Table measureKey={"Flavanoids"} wineData={wineData} />
      </div>
      <div>
        <Table measureKey={"Gamma"} wineData={extendedWineData} />
      </div>
    </div>
  );
}

export default App;
