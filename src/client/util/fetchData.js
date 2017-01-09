export default function fetchData(handler) {
  return component => {
    component.fetchData = handler;
    return component;
  };
}
