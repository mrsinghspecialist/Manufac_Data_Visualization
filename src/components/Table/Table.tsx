import { ExtendedWineData } from "../../interfaces/ExtendedWineData";
import {
  calculateMean,
  calculateMedian,
  calculateMode,
} from "../../utils/utils";
import "./Table.css";

const Table = (props: {
  measureKey: keyof ExtendedWineData;
  wineData: Map<number, ExtendedWineData[]>;
}) => {
  const { measureKey, wineData } = props;
  return (
    <>
      <table cellSpacing={0} border={1}>
        <thead>
          <tr>
            <th className="border mw-5">Measure</th>
            {Array.from(wineData.keys()).map((value: number) => {
              return (
                <th
                  key={value}
                  className="border p-5 px-10 mw-5"
                >{`Class ${value}`}</th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-5 py-8">
              {measureKey}
              <br />
              Mean
            </td>
            {[...wineData.keys()].map((value: number) => {
              return (
                <td key={value} className="border">
                  {calculateMean(wineData.get(value) as ExtendedWineData[], measureKey)}
                </td>
              );
            })}
          </tr>
          <tr>
            <td className="border p-5  py-8">
              {measureKey}
              <br />
              Median
            </td>
            {[...wineData.keys()].map((value: number) => {
              return (
                <td key={value} className="border">
                  {calculateMedian(
                    wineData.get(value) as ExtendedWineData[],
                    measureKey
                  )}
                </td>
              );
            })}
          </tr>
          <tr>
            <td className="border p-5  py-8">
              {measureKey}
              <br />
              Mode
            </td>
            {[...wineData.keys()].map((value: number) => {
              return (
                <td key={value} className="border">
                  {calculateMode(wineData.get(value) as ExtendedWineData[], measureKey)}
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Table;
