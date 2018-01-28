export default function logger(isServer, prefix, color) {
  let logit = () => {};

  if (!isServer) {
    return function log(msg) {
      console.log(`%c[${prefix}]`, `color: ${color || '#b0c4de'};`, msg);
    };
  }

  return logit;
}
