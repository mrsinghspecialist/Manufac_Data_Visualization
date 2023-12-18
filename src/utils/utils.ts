import { ExtendedWineData } from "../interfaces/ExtendedWineData";
import { WineData } from "../interfaces/WineData";

/**
 * Gets unique values of the "Alcohol" property from an array of WineData objects.
 * @param wineDataArray - An array of WineData objects.
 * @returns An array of unique Alcohol values.
 */
export function getUniqueAlcoholValues(wineDataArray: WineData[]): number[] {
  // Initialize an array to store unique Alcohol values
  const uniqueAlcoholValues: number[] = [];
  // Iterate through each WineData object in the array
  wineDataArray.forEach((wineData) => {
    // Check if the current Alcohol value is not already in the unique array
    if (!uniqueAlcoholValues.includes(wineData.Alcohol)) {
      // If not, add it to the unique values array
      uniqueAlcoholValues.push(wineData.Alcohol);
    }
  });
  // Return the array of unique Alcohol values
  return uniqueAlcoholValues;
}

/**
 * Groups WineData objects by their "Alcohol" property values.
 * @param wineDataArray - An array of WineData objects.
 * @returns A Map where keys are unique Alcohol values and values are arrays of corresponding WineData objects.
 */
export function groupByAlcohol(
  wineDataArray: WineData[]
): Map<number, WineData[]> {
  // Initialize a Map to store WineData objects grouped by Alcohol values
  const alcoholMap = new Map<number, WineData[]>();
  // Iterate through each WineData object in the array
  wineDataArray.forEach((wineData) => {
    // Extract the Alcohol value from the current WineData
    const alcoholValue = wineData.Alcohol;
    // Check if the Map already has the current Alcohol value
    if (alcoholMap.has(alcoholValue)) {
      // If the map already has the alcohol value, add the WineData to the existing array
      alcoholMap.get(alcoholValue)?.push(wineData);
    } else {
      // If the alcohol value is not in the map, create a new array with the current WineData
      alcoholMap.set(alcoholValue, [wineData]);
    }
  });
  // Return the Map containing WineData objects grouped by Alcohol values
  return alcoholMap;
}

/**
 * Calculates the mean of a numeric property specified by the key in an array of objects.
 * @param array - An array of objects containing numeric and/or string property values.
 * @param key - The key of the property for which the mean is to be calculated.
 * @returns The mean value rounded to 3 decimal places.
 */
export function calculateMean<T>(array: T[], key: keyof T): number {
  // Initialize variables to store the sum and count of valid numeric values
  let sum = 0;
  let count = 0;
  // Iterate through each object in the array
  array.forEach((value: T) => {
    // Check if the property value is a number
    if (typeof value[key as keyof T] === "number") {
      sum += value[key as keyof T] as number;
      count++;
    } else {
      // If it's a string, attempt to parse it as a float
      try {
        sum += parseFloat(value[key as keyof T] as string);
        count++;
      } catch (error) {
        // Log any parsing errors, but continue processing other values
        console.log(error);
      }
    }
  });
  // Calculate the mean by dividing the sum by the count and rounding to 3 decimal places
  return Number((sum / count).toFixed(3));
}

/**
 * Calculates the median of a numeric property specified by the key in an array of objects.
 * @param array - An array of objects containing numeric and/or string property values.
 * @param key - The key of the property for which the median is to be calculated.
 * @returns The median value rounded to 3 decimal places, or null if the array is empty.
 */
export function calculateMedian<T>(array: T[], key: keyof T): number | null {
  // Map the array to extract the specified property values and handle numeric and string types
  const mappedArray = array.map((value) => {
    if (typeof value[key] === "number") return value[key];
    return parseFloat(value[key] as string);
  }) as number[];

  // Check for empty array
  if (mappedArray.length === 0) {
    return null;
  }
  // Sort the mapped array in ascending order
  const sortedArray = mappedArray.slice().sort((a, b) => a - b);

  // Calculate the middle index and length of the sorted array
  const length = sortedArray.length;
  const middle = Math.floor(length / 2);

  if (length % 2 === 0) {
    // If the number of elements is even, calculate the average of the two middle values
    return Number(
      ((sortedArray[middle - 1] + sortedArray[middle]) / 2).toFixed(3)
    );
  } else {
    // If the number of elements is odd, the median is the middle value
    return Number(sortedArray[middle].toFixed(3));
  }
}

/**
 * Calculates the mode of a property specified by the key in an array of objects.
 * @param array - An array of objects containing property values.
 * @param key - The key of the property for which the mode is to be calculated.
 * @returns The mode value rounded to 3 decimal places, or null if the array is empty.
 */
export function calculateMode<T>(
  array: T[],
  key: keyof T
): number | string | null {
  // Check for empty array
  if (array.length === 0) {
    return null; // Return an empty array for an empty input
  }
  // Initialize a Map to count the occurrences of each property value
  const valueCount = new Map<string | number, number>();
  // Count the occurrences of each value for the specified key
  array.forEach((object) => {
    const value = object[key];
    if (value !== undefined) {
      // Update the count in the Map for the current property value
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
      // Return the mode value rounded to 3 decimal places
      return (key as number).toFixed(3);
    }
  }
  // Return null if there is no mode
  return null;
}

/**
 * Calculates the "Gamma" property for each WineData object based on specified operations.
 * @param wineDataArray - An array of WineData objects.
 * @returns An array of ExtendedWineData objects with the added "Gamma" property.
 */
export function calculateGamma(wineDataArray: WineData[]): ExtendedWineData[] {
  // Initialize an array to store ExtendedWineData objects with the calculated "Gamma" property
  const extendedWineDataArray: ExtendedWineData[] = [];
  // Iterate through each WineData object in the array
  wineDataArray.forEach((wineData) => {
    // Perform the operation to calculate Gamma
    const gamma = (wineData.Ash * wineData.Hue) / wineData.Magnesium;

    // Create a new object with the added "Gamma" property
    const extendedWineData: ExtendedWineData = {
      ...wineData,
      Gamma: gamma,
    } as ExtendedWineData;
    // Add the extended wine data to the result array
    extendedWineDataArray.push(extendedWineData);
  });
  // Return the array of ExtendedWineData objects with the added "Gamma" property
  return extendedWineDataArray;
}
