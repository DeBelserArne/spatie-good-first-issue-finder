import IssueList from './IssueList';

import { StyledRepositoryContainer } from './styles/StyledRepositoryContainer';
import { StyledRepositoryName } from './styles/StyledRepositoryName';

const Repository = ({ ind, issues, repositoryUrl, state}) => {
    const niceName = repositoryUrl.split("/").pop().replace(/-/g, " ");

    return (
        <StyledRepositoryContainer key={ind} state={state}>
            <StyledRepositoryName state={state}>{niceName} <strong>({issues.length})</strong></StyledRepositoryName>
            <IssueList issues={issues} state={state}></IssueList>
        </StyledRepositoryContainer>
    )
}

export default Repository;