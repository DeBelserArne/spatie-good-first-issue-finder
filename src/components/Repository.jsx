import IssueList from './IssueList';

import { RepositoryContainer } from './styles/RepositoryContainer';
import { RepositoryName } from './styles/RepositoryName';

const Repository = ({ ind, issues, repositoryUrl, state}) => {
    const niceName = repositoryUrl.split("/").pop().replace(/-/g, " ");

    return (
        <RepositoryContainer key={ind} state={state}>
            <RepositoryName state={state}>{niceName} <strong>({issues.length})</strong></RepositoryName>
            <IssueList issues={issues}></IssueList>
        </RepositoryContainer>
    )
}

export default Repository;