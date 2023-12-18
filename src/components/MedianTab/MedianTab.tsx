import { ExtendedWineData } from "../../interfaces/ExtendedWineData";
import { calculateMedian } from "../../utils/utils";

const MedianTab = (props: {
  measureKey: keyof ExtendedWineData;
  wineData: Map<number, ExtendedWineData[]>;
}) => {
  const { measureKey, wineData } = props;
  return (
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
  );
};

export default MedianTab;
