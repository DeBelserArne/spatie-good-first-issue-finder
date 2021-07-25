import styled from 'styled-components';

const IssueListContainer = styled.ol`
    padding: 0 0 0 20px;
`;

const Issue = styled.li`
    a {
        color: #4B5563;
        text-decoration: none;
        display: block;
        text-align: left;
        margin-bottom: 10px;
        &:hover {
            color: #065F46;
        }
    }
`;

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