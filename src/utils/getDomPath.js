const _getLocalNamePath = (elm) => {
  const domPath = [];
  let preCount = 0;
  let sib = elm.previousSibling;
  while (sib) {
    sib.localName === elm.localName && preCount ++;
    sib = sib.previousSibling
  }
  if (preCount === 0) {
    domPath.unshift(elm.localName);
  } else {
    domPath.unshift(`${elm.localName}:nth-of-type(${preCount + 1})`);
  }
  return domPath;
}

const getDomPath = (elm) => {
  try {
    const allNodes = document.getElementsByTagName('*');
    const domPath = [];
    for (; elm && elm.nodeType == 1; elm = elm.parentNode) {
      if (elm.hasAttribute('id')) {
        let idCount = 0;
        for (let n = 0; n < allNodes.length; n++) {
          allNodes[n].hasAttribute('id') && allNodes[n].id == elm.id && idCount++;
          if (idCount > 1) break;
        }
        if (idCount == 1) {
          domPath.unshift(`#${elm.getAttribute('id')}`);
          break;
        } else {
          domPath.unshift(..._getLocalNamePath(elm));
        }
      } else {
        domPath.unshift(..._getLocalNamePath(elm));
      }
    }
    return domPath.length ? domPath.join('>') : null
  } catch (err) {
    console.log(err)
    return null;
  }
}

export default getDomPath;