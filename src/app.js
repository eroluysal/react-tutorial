var App = React.createClass({
  getInitialState: function () {
    return {
      username: "",
      repositories: []
    };
  },
  setUsername: function (e) {
    var username = e.target.value;

    this.setState({
      username: username
    });

    var githubApiUrl = "https://api.github.com/users/" + username + "/repos";

    $.get(githubApiUrl, function (response) {
      this.setState({repositories: response});
    }.bind(this));
  },
  render: function () {
    var content;

    if (this.state.username) {
      content = <SearchResults username={this.state.username} repositories={this.state.repositories} />
    } else {
      content = null;
    }

    return (
      <div className="github-wrapper">
        <Search setUsername={this.setUsername} />
        {content}
      </div>
    );
  }
});

var Repositories = React.createClass({
  render: function () {
    return (
      <ul className="github-repository-list">
        {this.props.repositories.map(function (repository, i) {
          return (
            <Repository
            key={i}
            name={repository.name}
            description={repository.description}
            forks={repository.forks}
            watchers={repository.watchers}
            cloneUrl={repository.clone_url}
            />
          );
        }.bind(this))}
      </ul>
    );
  }
});

var Repository = React.createClass({
  render: function () {
    return (
      <li className="github-repository-item">
        <div className="github-repository-name">
          <strong>
            {this.props.name}
          </strong>
        </div>
        <div className="github-repository-description">
          {this.props.description}
        </div>
        <div className="github-repository-features">
          <div className="github-repository-forks">
            <strong>Forks:</strong> {this.props.forks}
          </div>
          <div className="github-repository-watchers">
            <strong>Watchers:</strong> {this.props.watchers}
          </div>
          <div className="clearfix"></div>
        </div>
        <div className="github-repository-clone-url">
          {this.props.cloneUrl}
        </div>
      </li>
    );
  }
});

var Search = React.createClass({
  render: function () {
    return (
      <div className="github-username-search-form">
        <input
        onBlur={this.props.setUsername}
        type="text"
        className="github-username-text-input"
        placeholder="Please enter your GitHub username"/>
      </div>
    );
  }
});

var SearchResults = React.createClass({
  render: function () {
    return (
      <div className="github-account-details">
        <h1 className="github-account-owner-username">
          {this.props.username + "\'s Repositories"}
          <span className="github-repository-count">
            ({this.props.repositories.length})
          </span>
        </h1>
        <Repositories repositories={this.props.repositories}/>
      </div>
    );
  }
});

React.render(<App />, document.getElementById('container'));
