const getElmByXPath = (xpath) => {
  if (!xpath) {
    return null;
  }
  const elm = document.querySelector(xpath);
  return elm;
}

export default getElmByXPath;