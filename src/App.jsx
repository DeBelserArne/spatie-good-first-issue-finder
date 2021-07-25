import './App.css';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { pause } from './lib/helpers';
import NProgress from 'nprogress';

import Repository from './components/Repository';

import { Header } from './styled-components/Header';
import { RepositoryGrid } from './styled-components/RepositoryGrid';

function App() {
  const [issues, setIssues] = useState([]);
  const [openIssues, setOpenIssues] = useState([]);
  const [closedIssues, setClosedIssues] = useState([]);
  const [page, setPage] = useState(0);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    NProgress.start();
    async function fetchIssues() {
      console.log('------------------------');
      console.log('Retrieving github issues');
      console.log('current page', page);

      // Gotta respect Github's throttling, so a short pause every 5 requests
      if (page !== 0 && page % 5 === 0) {
        console.log('Let\'s pause for a while');
        await pause(10000);
      }

      await fetch(`https://api.github.com/search/issues?q=user:spatie+label:"good+first+issue"&per_page=100&page=${page}`)
        // https://github.com/search?q=label%3A%22good+first+issue%22+user%3Aspatie+is%3Aopen&type=Issues
        .then(res => res.json())
        .then(res => {
          if (res.items.length === 100 || page === 0) {
            appendIssues(res.items);
            // Recursion if we're not quiet there yet
            console.log('Recursively getting more issues');
            setPage(page => page + 1);
          } else {
            console.log('We\'re done fetching issues, let\'s group them by repository_url');
            filterOpenIssues();
            filterClosedIssues();
            NProgress.done();
          }
        })
        .catch(err => {
          setApiError(true);
        });
    }

    fetchIssues();
    // eslint-disable-next-line
  }, [page]);

  useEffect(() => {
    setPage(page => page + 1);
  }, []);

  function appendIssues(newIssues) {
    setIssues([...issues, ...newIssues]);
  }

  function filterOpenIssues() {
    const openIssues = issues.filter(issue => {
      return issue.state === 'open';
    });

    setOpenIssues(_.groupBy(openIssues, "repository_url"));
  }

  function filterClosedIssues() {
    const closedIssues = issues.filter(issue => {
      return issue.state === 'closed';
    });

    setClosedIssues(_.groupBy(closedIssues, "repository_url"));
  }

  function renderIssues(state, issues) {
    return Object.entries(issues).map(([repositoryUrl, issueList], i) => {
      return (
        <Repository issues={issueList} ind={i} key={i} repositoryUrl={repositoryUrl} state={state}></Repository>
      )
    })
  }

  if (!apiError) {
    return (
      <div className="App">
        <Header>
          <img src="/img/android-chrome-192x192.png" alt="" />
          <h1>Spatie "Good First Issue" Finder</h1>
        </Header>

        <h3>Open issues</h3>
        <RepositoryGrid >
          {renderIssues('open', openIssues)}
        </RepositoryGrid>

        <h3 className="closed">Closed issues</h3>
        <RepositoryGrid>
          {renderIssues('closed', closedIssues)}
        </RepositoryGrid>
      </div >
    )
  } else {
    return (
      <p>Something went wrong fetching issues from GitHub, please try again in 15 seconds.</p>
    )
  }
}

export default App;
