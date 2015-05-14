/** @jsx React.DOM */
var Query = React.createClass({
  render: function() {
   var query = this.props.query;
    return (
      <td className={"Query " + query.className}>
        {query.elapsed}
        <div className="popover left">
          <div className="popover-content">{query.query}</div>
          <div className="arrow"></div>
        </div>
      </td>
    );
  }
})

var Database = React.createClass({
  render: function() {
    var item = this.props.item;
    return (
      <tr>
        <td className="dbname">
          {item.name}
        </td>
        <td className="query-count">
          <span className={item.countClassName}>
            {item.queries.length}
          </span>
        </td>
        {item.topFiveQueries.map(function(query) {
          return (<Query query={query} />)
        })}
      </tr>
    );
  }
});

var DBMon = React.createClass({
  getInitialState: function() {
    return {dbs: getDatabases()};
  },

  loadSamples: function () {
    var newData = {dbs: getDatabases()};
    this.setState(newData);
    setTimeout(this.loadSamples, TIMEOUT);
  },

  componentDidMount: function() {
    this.loadSamples();
  },

  render: function() {
    var dbs = this.state.dbs;
    return (
      <table className="table table-striped latest-data">
        <tbody>
          {dbs.map(function(item) {
            return (<Database item={item} />)
          })}
        </tbody>
      </table>
    );
  }
});

React.render(<DBMon />, document.getElementById('dbmon'));
