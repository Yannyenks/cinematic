// Minimal char-splitter, standing in for GSAP SplitText (paid plugin).
// Wraps each visible character of `el`'s text in its own <span class="char">
// and returns the list of spans so callers can animate them individually.
export function splitChars(el) {
  const text = el.textContent
  el.textContent = ''
  const spans = []

  for (const char of text) {
    const span = document.createElement('span')
    span.className = 'char'
    span.textContent = char === ' ' ? ' ' : char
    el.appendChild(span)
    spans.push(span)
  }

  return spans
}
