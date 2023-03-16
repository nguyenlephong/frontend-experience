export const INVALID_VALUE = [null, undefined, "", "undefined", "null"];

/**
 *
 * @param arr
 * @param old_index
 * @param new_index
 * Input: [1,2,3,5,12,6]
 * Move item from index 3 to index 5 (move 5 to end array)
 * Output: [1,2,3,12,6,5]
 * Console.log(array_move([1, 2, 3 , 5, 12 , 6], 3, 5));
 *
 */
export const array_move_item = (arr: any, old_index: number, new_index: number) => {
  if (INVALID_VALUE.includes(arr)) return [];
  if (typeof arr === "string") return [];
  if (typeof arr === "number") return [];
  if (typeof arr === "object" && !Array.isArray(arr)) return [];

  if (Number(old_index) === old_index && old_index % 1 !== 0) return arr;
  if (Number(new_index) === new_index && new_index % 1 !== 0) return arr;

  if (old_index >= arr.length) return arr;

  if (new_index >= arr.length) {
    let k = new_index - arr.length + 1;
    while (k--) {
      arr.push(undefined);
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr;
};

export const uuidByte = () => {
  // I generate the UID from two parts here
  // to ensure the random number provide enough bits.
  let firstPart = (Math.random() * 46656) | 0;
  let secondPart = (Math.random() * 46656) | 0;
  let onePart = `000${firstPart.toString(36)}`.slice(-3);
  let twoPart = `000${secondPart.toString(36)}`.slice(-3);
  return `${onePart + twoPart}`;
};


export const convertNormalTextToSnakeText = (input: string) => {
  if (INVALID_VALUE.includes(input)) return "";

  const arrString = input.trim().toLowerCase().split(" ");
  const res: any[] = [];
  arrString.forEach(item => {
    const str = item.trim().toLowerCase();
    str && str !== "-" && str !== "_" && res.push(str);
  });
  return res.join("-");
};