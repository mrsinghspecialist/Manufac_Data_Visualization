import { ExtendedWineData } from "../../interfaces/ExtendedWineData";
import { calculateMean } from "../../utils/utils";

const MeanTab = (props: {
  measureKey: keyof ExtendedWineData;
  wineData: Map<number, ExtendedWineData[]>;
}) => {
  const { measureKey, wineData } = props;
  return (
    <tr>
      <td className="border p-5 py-8">
        {measureKey}
        <br />
        Mean
      </td>
      {[...wineData.keys()].map((value: number) => {
        return (
          <td key={value} className="border">
            {calculateMean(
              wineData.get(value) as ExtendedWineData[],
              measureKey
            )}
          </td>
        );
      })}
    </tr>
  );
};

export default MeanTab;
