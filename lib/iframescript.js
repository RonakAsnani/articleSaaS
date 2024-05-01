export const script = `function activateDomInspector() {
  let highlightedElement = null;
  let isInspectorActive = true;
  let originalCursorStyle = ''; // Variable to store the original cursor style

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
      if (element.id !== '') {
          return '//' + element.tagName.toLowerCase() + '[@id="' + element.id + '"]';
      }
      if (element === document.body) {
          return element.tagName.toLowerCase();
      }
      const siblings = Array.from(element.parentNode.children);
      const index = siblings.indexOf(element) + 1;
      return getXPath(element.parentNode) + '/' + element.tagName.toLowerCase() + '[' + index + ']';
  }

  // Attach event listeners
  document.addEventListener('mouseover', handleMouseOver);
  document.addEventListener('click', handleClick);

  return stopInspector;
}
`;
