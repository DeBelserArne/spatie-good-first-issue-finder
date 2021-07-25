import styled from 'styled-components';

export const RepositoryContainer = styled.div`
    ${props => console.log(props)}
    background-color: ${props => props.state === 'open' ? '#ECFDF5' : '#FEF2F2'};
    padding: 35px 15px 15px 15px;
    border-radius: 5px;
    position: relative;
    border: 1px solid ${props => props.state === 'open' ? '#047857' : '#B91C1C'};

    box-shadow: 0.25rem 0.25rem 0.6rem rgba(0,0,0,0.05), 0 0.5rem 1.125rem rgba(75,0,0,0.05);
`;