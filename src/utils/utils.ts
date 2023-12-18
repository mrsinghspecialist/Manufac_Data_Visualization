import { WineData } from "../interfaces/WineData";

export function getUniqueAlcoholValues(wineDataArray: WineData[]): number[] {
  const uniqueAlcoholValues: number[] = [];

  wineDataArray.forEach((wineData) => {
    if (!uniqueAlcoholValues.includes(wineData.Alcohol)) {
      uniqueAlcoholValues.push(wineData.Alcohol);
    }
  });

  return uniqueAlcoholValues;
}

export function groupByAlcohol(
  wineDataArray: WineData[]
): Map<number, WineData[]> {
  const alcoholMap = new Map<number, WineData[]>();

  wineDataArray.forEach((wineData) => {
    const alcoholValue = wineData.Alcohol;

    if (alcoholMap.has(alcoholValue)) {
      // If the map already has the alcohol value, add the WineData to the existing array
      alcoholMap.get(alcoholValue)?.push(wineData);
    } else {
      // If the alcohol value is not in the map, create a new array with the current WineData
      alcoholMap.set(alcoholValue, [wineData]);
    }
  });

  return alcoholMap;
}

export function calculateMean<T>(array: T[], key: keyof T): number {
  let sum = 0;
  let count = 0;
  array.forEach((value: T) => {
    if (typeof value[key as keyof T] === "number") {
      sum += value[key as keyof T] as number;
      count++;
    } else {
      try {
        sum += parseFloat(value[key as keyof T] as string);
        count++;
      } catch (error) {
        console.log(error);
      }
    }
  });
  return Number((sum / count).toFixed(3));
}

export function calculateMedian<T>(array: T[], key: keyof T): number | null {
  const mappedArray = array.map((value) => {
    if (typeof value[key] === "number") return value[key];
    return parseFloat(value[key] as string);
  }) as number[];

  // Check for empty array
  if (mappedArray.length === 0) {
    return null;
  }

  const sortedArray = mappedArray.slice().sort((a, b) => a - b);
  const length = sortedArray.length;
  const middle = Math.floor(length / 2);

  if (length % 2 === 0) {
    // If the number of elements is even, calculate the average of the two middle values
    return (sortedArray[middle - 1] + sortedArray[middle]) / 2;
  } else {
    // If the number of elements is odd, the median is the middle value
    return sortedArray[middle];
  }
}

export function calculateMode<T>(
  array: T[],
  key: keyof T
): number | string | null {
  if (array.length === 0) {
    return null; // Return an empty array for an empty input
  }
  const valueCount = new Map<string | number, number>();
  // Count the occurrences of each value for the specified key
  array.forEach((object) => {
    const value = object[key];
    if (value !== undefined) {
      valueCount.set(
        value as string | number,
        (valueCount.get(value as string | number) || 0) + 1
      );
    }
  });
  // Find the highest frequency
  const maxFrequency = Math.max(...valueCount.values());

  // Return value with the highest frequency (modes)
  for (const [key, value] of valueCount) {
    if (value === maxFrequency) {
      return key;
    }
  }
  return null;
}
