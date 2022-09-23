// Fixes errors about "Not implemented: window.computedStyle(elt, pseudoElt)"
// See https://github.com/nickcolley/jest-axe/issues/147
if (typeof window !== 'undefined') {
  const { getComputedStyle } = window;
  window.getComputedStyle = elt => getComputedStyle(elt);
}

export {};
