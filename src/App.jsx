import './App.css';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { pause } from './lib/helpers';
import NProgress from 'nprogress';

import Header from './components/Header';
import EditOnGithub from './components/EditOnGithub';
import Repository from './components/Repository';

import { StyledHeader } from './components/styles/StyledHeader';
import { StyledRepositoryGrid } from './components/styles/StyledRepositoryGrid';

function App() {
  const [issues, setIssues] = useState([]);
  const [openIssues, setOpenIssues] = useState([]);
  const [totalOpenIssues, setTotalOpenissues] = useState(0);
  const [closedIssues, setClosedIssues] = useState([]);
  const [totalClosedIssues, setTotalClosedIssues] = useState(0);
  const [page, setPage] = useState(0);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    NProgress.start();
    async function fetchIssues() {

      // We have to respect Github's throttling, so a short pause every 5 requests
      if (page !== 0 && page % 5 === 0) {
        await pause(10000);
      }

      await fetch(`https://api.github.com/search/issues?q=user:spatie+label:"good+first+issue"&per_page=100&page=${page}`)
        // https://github.com/search?q=label%3A%22good+first+issue%22+user%3Aspatie+is%3Aopen&type=Issues
        .then(res => res.json())
        .then(res => {
          if (res.items.length === 100 || page === 0) {
            appendIssues(res.items);
            // Recursion if we're not quiet there yet
            setPage(page => page + 1);
          } else {
            filterOpenIssues();
            filterClosedIssues();
            NProgress.done();
          }
        })
        .catch(err => {
          setApiError(true);
          NProgress.done();
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
    setTotalOpenissues(openIssues.length);
  }

  function filterClosedIssues() {
    const closedIssues = issues.filter(issue => {
      return issue.state === 'closed';
    });

    setClosedIssues(_.groupBy(closedIssues, "repository_url"));
    setTotalClosedIssues(closedIssues.length);
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
        <StyledHeader>
          <Header></Header>
          <EditOnGithub></EditOnGithub>
        </StyledHeader>

        <h3>Open issues | Total: { totalOpenIssues }</h3>
        <StyledRepositoryGrid >
          {renderIssues('open', openIssues)}
        </StyledRepositoryGrid>

        <h3 className="closed">Closed issues | Total: {totalClosedIssues}</h3>
        <StyledRepositoryGrid>
          {renderIssues('closed', closedIssues)}
        </StyledRepositoryGrid>
      </div >
    )
  } else {
    return (
      <p>Something went wrong fetching issues from GitHub, please try again in 15 seconds.</p>
    )
  }
}

export default App;
