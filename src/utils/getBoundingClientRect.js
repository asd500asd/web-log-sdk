const getBoundingClientRect = (elm) => {
  const rect = elm.getBoundingClientRect();
  const width = rect.width || rect.right - rect.left;
  const height = rect.height || rect.bottom - rect.top;
  return {
    width,
    height,
    left: rect.left,
    top: rect.top,
  };
}

export default getBoundingClientRect;