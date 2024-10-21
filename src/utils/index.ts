export const fromArray2Object = (arr: any) => {
  let result: any = {};
  try {
    arr.forEach((e: any) => {
      if (e.filename) {
        result[e.filename] = (e.children && e.children.length) > 0
          ? { directory: fromArray2Object(e.children) }
          : { file: { contents: e.value } };
      }
    });
  } catch (error) {
    console.log(error);
  }

  return result;
};

