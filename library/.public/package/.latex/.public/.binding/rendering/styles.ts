export const styles = (document: { head: { querySelectorAll(selector: string): ArrayLike<{ outerHTML: string }> } }): string =>
    Array.from(document.head.querySelectorAll('style')).map(one => one.outerHTML).join('\n');
