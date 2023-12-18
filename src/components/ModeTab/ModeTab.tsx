import { ExtendedWineData } from "../../interfaces/ExtendedWineData";
import { calculateMode } from "../../utils/utils";

const ModeTab = (props: {
  measureKey: keyof ExtendedWineData;
  wineData: Map<number, ExtendedWineData[]>;
}) => {
  const { measureKey, wineData } = props;
  return (
    <tr>
      <td className="border p-5  py-8">
        {measureKey}
        <br />
        Mode
      </td>
      {[...wineData.keys()].map((value: number) => {
        return (
          <td key={value} className="border">
            {calculateMode(
              wineData.get(value) as ExtendedWineData[],
              measureKey
            )}
          </td>
        );
      })}
    </tr>
  );
};

export default ModeTab;
