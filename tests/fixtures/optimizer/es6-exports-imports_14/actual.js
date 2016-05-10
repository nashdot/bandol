var Props = require('./ReactPropTypes');
var MyArticle = React.createClass({
  propTypes: {
    description: Props.string,
    category: Props.oneOf(['News','Photos']).isRequired,
    dialog: Props.instanceOf(Dialog).isRequired
  }
});

console.log(MyArticle.propTypes.description);
console.log(MyArticle.propTypes.category);
console.log(MyArticle.propTypes.dialog);
