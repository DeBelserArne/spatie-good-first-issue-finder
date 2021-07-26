const Issue = ({ issue }) => {
    return (
        <a href={issue.html_url} target="_blank" rel="noopener noreferrer">{issue.title}</a>
    )
}

export default Issue;