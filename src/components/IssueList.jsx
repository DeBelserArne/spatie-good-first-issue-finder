import { IssueListContainer, Issue } from './styles/Issue';

const IssueList = ({ issues }) => {
    return (
        <IssueListContainer>
            {issues && issues.map((issue, index) => {
                return (
                    <Issue key={index}>
                        <a href={issue.html_url} target="_blank" rel="noopener noreferrer">{issue.title}</a>
                    </Issue>
                )
            })}
        </IssueListContainer>
    )
}

export default IssueList;