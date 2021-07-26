import styled from 'styled-components';
import OpenIssue from '../svg/OpenIssue.svg';
import ClosedIssue from '../svg/ClosedIssue.svg';

export const StyledIssueListContainer = styled.ul`
    padding: 0;
    li {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        &::before {
            flex-shrink: 0;
            content: '';
            height: 15px;
            width: 15px;
            margin-right: 10px;
            background-image: url(${ props => props.state === 'open' ? OpenIssue : ClosedIssue});
        }
    }
`;