import IssueList from './IssueList';

import { RepositoryContainer } from '../styled-components/RepositoryContainer';
import { RepositoryName } from '../styled-components/RepositoryName';

const Repository = ({ ind, issues, repositoryUrl, state}) => {
    const url = repositoryUrl.split("/").pop().replace(/-/g, " ");

    return (
        <RepositoryContainer key={ind} state={state}>
            <RepositoryName state={state}>{url}</RepositoryName>
            <IssueList issues={issues}></IssueList>
        </RepositoryContainer>
    )
}

export default Repository;