export const script = `
var preHighlighted = null;
function activateDomInspector() {
  let highlightedElement = null;
  let isInspectorActive = true;
  let originalCursorStyle = ''; // Variable to store the original cursor style
  if (preHighlighted) {
    preHighlighted.style.backgroundColor = '';
    preHighlighted.style.cursor = originalCursorStyle; // Reset cursor style
}

  // Highlight function
  function highlightElement(element) {
      if (highlightedElement) {
          highlightedElement.style.backgroundColor = '';
          highlightedElement.style.cursor = originalCursorStyle; // Reset cursor style
      }
      originalCursorStyle = element.style.cursor; // Store the original cursor style
      element.style.backgroundColor = 'yellow';
      element.style.cursor = 'crosshair';
      highlightedElement = element;
  }

  // Mouseover event handler
  function handleMouseOver(event) {
      if (!isInspectorActive) return;
      const target = event.target;
      highlightElement(target);
  }

  // Click event handler
  function handleClick(event) {
      if (!isInspectorActive) return;
      const target = event.target;
      const xpath = getXPath(target);
      // alert('XPath of the clicked element: ' + xpath);
      stopInspector();
      highlightElement(target);
      preHighlighted = target
      window.parent.postMessage({ xpath: xpath, text: target.textContent }, '*');
      return xpath;
  }

  // Deactivate DOM inspector
  function stopInspector() {
      isInspectorActive = false;
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('click', handleClick);
      if (highlightedElement) {
          highlightedElement.style.cursor = originalCursorStyle; // Reset cursor style
      }
  }

  // Get XPath of the element
  function getXPath(element) {
    let nodeElem = element;

        const parts = [];
        while (nodeElem && nodeElem.nodeType === Node.ELEMENT_NODE) {
          let nbOfPreviousSiblings = 0;
          let hasNextSiblings = false;
          let sibling = nodeElem.previousSibling;
          while (sibling) {
            if (
              sibling.nodeType !== Node.DOCUMENT_TYPE_NODE &&
              sibling.nodeName === nodeElem.nodeName
            ) {
              nbOfPreviousSiblings++;
            }
            sibling = sibling.previousSibling;
          }
          sibling = nodeElem.nextSibling;
          while (sibling) {
            if (sibling.nodeName === nodeElem.nodeName) {
              hasNextSiblings = true;
              break;
            }
            sibling = sibling.nextSibling;
          }
          const prefix = nodeElem.prefix ? nodeElem.prefix + ":" : "";
          const nth =
            nbOfPreviousSiblings || hasNextSiblings
              ? "[" + (nbOfPreviousSiblings + 1) + "]"
              : "";
          parts.push(prefix + nodeElem.localName + nth);
          nodeElem = nodeElem.parentNode;
        }
        return parts.length ? "/" + parts.reverse().join("/") : "";
      
  }

  // Attach event listeners
  document.addEventListener('mouseover', handleMouseOver);
  document.addEventListener('click', handleClick);

  return stopInspector;
}
var prevElement = null;
window.highlightElementByXPath = function(xpath) {
    if(prevElement){
        prevElement.style.backgroundColor = '';
    
    }
    const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    
    if (element) {
        element.style.backgroundColor = 'yellow';
   \
        element.scrollIntoView();
        prevElement = element;
    } else {
        console.error('Element not found with XPath:', xpath);
    }
}
`;
