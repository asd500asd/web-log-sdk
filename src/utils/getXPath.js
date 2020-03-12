const _getLocalNamePath = (elm) => {
  const xpath = [];
  let preCount = 0;
  let sib = elm.previousSibling;
  while (sib) {
    sib.localName === elm.localName && preCount ++;
    sib = sib.previousSibling
  }
  if (preCount === 0) {
    xpath.unshift(elm.localName);
  } else {
    xpath.unshift(`${elm.localName}:nth-of-type(${preCount + 1})`);
  }
  return xpath;
}

const getXPath = (elm) => {
  try {
    const allNodes = document.getElementsByTagName('*');
    const xpath = [];
    for (; elm && elm.nodeType == 1; elm = elm.parentNode) {
      if (elm.hasAttribute('id')) {
        let idCount = 0;
        for (let n = 0; n < allNodes.length; n++) {
          allNodes[n].hasAttribute('id') && allNodes[n].id == elm.id && idCount++;
          if (idCount > 1) break;
        }
        if (idCount == 1) {
          xpath.unshift(`#${elm.getAttribute('id')}`);
          break;
        } else {
          xpath.unshift(..._getLocalNamePath(elm));
        }
      } else {
        xpath.unshift(..._getLocalNamePath(elm));
      }
    }
    return xpath.length ? xpath.join('>') : null
  } catch (err) {
    console.log(err)
    return null;
  }
}

export default getXPath;