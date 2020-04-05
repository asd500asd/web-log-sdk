const getElmByXPath = (xpath) => {
  if (!xpath) {
    return null;
  }
  try {
    const elm = document.querySelector(xpath);
    return elm;
  } catch (e) {
    return null;
  }
}

export default getElmByXPath;