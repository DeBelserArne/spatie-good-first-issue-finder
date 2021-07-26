import styled from 'styled-components';

export const StyledRepositoryName = styled.div`
    position: absolute;
    top: -15px;
    left: 10px;
    padding: 5px 15px;
    border-radius: 10px;
    text-transform: capitalize;
    margin-bottom: 30px;
    color: #1F2937;
    background-color: ${props => props.state === 'open' ? '#A7F3D0' : '#FECACA'};
    border: 1px solid ${props => props.state === 'open' ? '#047857' : '#B91C1C'};

    box-shadow: 0.25rem 0.25rem 0.6rem rgba(0,0,0,0.05), 0 0.5rem 1.125rem rgba(75,0,0,0.05);
`;