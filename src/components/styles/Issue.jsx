import styled from 'styled-components';

export const IssueListContainer = styled.ul`
    padding: 0 0 0 20px;
`;

export const Issue = styled.li`
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