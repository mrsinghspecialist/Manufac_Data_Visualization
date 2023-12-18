import wineJSONData from "../../assets/wineData.json";
import { WineData } from "../../interfaces/WineData";
import {
  calculateMean,
  calculateMedian,
  calculateMode,
  groupByAlcohol,
} from "../../utils/utils";
import "./FlavanoidsTable.css";

const FlavanoidsTable = () => {
  const wineData: Map<number, WineData[]> = groupByAlcohol(
    wineJSONData as WineData[]
  );

  return (
    <>
      <table cellSpacing={0}>
        <thead>
          <tr>
            <th className="border">Measure</th>
            {Array.from(wineData.keys()).map((value: number) => {
              return (
                <th
                  key={value}
                  className="border p-5 px-10"
                >{`Class ${value}`}</th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-5">
              Flavanoids
              <br />
              Mean
            </td>
            {[...wineData.keys()].map((value: number) => {
              return (
                <td key={value} className="border">
                  {calculateMean(
                    wineData.get(value) as WineData[],
                    "Flavanoids"
                  )}
                </td>
              );
            })}
          </tr>
          <tr>
            <td className="border p-5">
              Flavanoids
              <br />
              Median
            </td>
            {[...wineData.keys()].map((value: number) => {
              return (
                <td key={value} className="border">
                  {calculateMedian(
                    wineData.get(value) as WineData[],
                    "Flavanoids"
                  )}
                </td>
              );
            })}
          </tr>
          <tr>
            <td className="border p-5">
              Flavanoids
              <br />
              Mode
            </td>
            {[...wineData.keys()].map((value: number) => {
              return (
                <td key={value} className="border">
                  {calculateMode(
                    wineData.get(value) as WineData[],
                    "Flavanoids"
                  )}
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default FlavanoidsTable;
