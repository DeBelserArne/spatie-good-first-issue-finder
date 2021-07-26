import { StyledIssue } from './styles/StyledIssue';
import { StyledIssueListContainer } from './styles/StyledIssueListContainer';
import Issue from './Issue';

const IssueList = ({ issues, state }) => {
    return (
        <StyledIssueListContainer state={state}>
            {issues && issues.map((issue, index) => {
                return (
                    <StyledIssue key={index}>
                        <Issue key={index} issue={issue}></Issue>
                    </StyledIssue>
                )
            })}
        </StyledIssueListContainer>
    )
}

export default IssueList;