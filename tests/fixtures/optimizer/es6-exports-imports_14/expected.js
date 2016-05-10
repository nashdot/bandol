(function () {
/**bandol> resource: actual.js */

var bQr = React.createClass({
  propTypes: {
    description: Props.string,
    category: Props.oneOf(['News', 'Photos']).isRequired,
    dialog: Props.instanceOf(Dialog).isRequired
  }
});

console.log(bQr.propTypes.description);
console.log(bQr.propTypes.category);
console.log(bQr.propTypes.dialog);

}());