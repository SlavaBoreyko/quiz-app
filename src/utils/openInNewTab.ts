const openInNewTab = (url: string) => {
  // window.open(url, '_blank', 'noopener, noreferrer');
  window.open(url, '_self', 'noopener, noreferrer');
};

export default openInNewTab;
