const classList = (...classes) => {
  return classes
    .filter(item => !!item)
    .join(' ');
}

export default classList;
