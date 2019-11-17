const _getLocalNamePath = (elm) => {
  const domPath = [];
  let preCount = 0;
  for (let sib = elm.previousSibling; sib; sib = sib.previousSibling) {
    if (sib.localName == elm.localName) preCount ++;
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
    let domPath = [];
    for (; elm && elm.nodeType == 1; elm = elm.parentNode) {
      if (elm.hasAttribute('id')) {
        let uniqueIdCount = 0
        for (var n = 0; n < allNodes.length; n++) {
          if (allNodes[n].hasAttribute('id') && allNodes[n].id == elm.id) uniqueIdCount++;
          if (uniqueIdCount > 1) break;
        }
        if (uniqueIdCount == 1) {
          domPath.unshift(`#${elm.getAttribute('id')}`);
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