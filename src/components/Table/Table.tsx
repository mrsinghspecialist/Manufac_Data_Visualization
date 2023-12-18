import { ExtendedWineData } from "../../interfaces/ExtendedWineData";
import MeanTab from "../MeanTab/MeanTab";
import MedianTab from "../MedianTab/MedianTab";
import ModeTab from "../ModeTab/ModeTab";
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
          <MeanTab measureKey={measureKey} wineData={wineData} />
          <MedianTab measureKey={measureKey} wineData={wineData} />
          <ModeTab measureKey={measureKey} wineData={wineData} />
        </tbody>
      </table>
    </>
  );
};

export default Table;
