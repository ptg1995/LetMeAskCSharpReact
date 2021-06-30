import './styles.scss'
type QuestionsProps = {
    content: string,
    author: {
        avatar: string,
        name: string,
    },
}

export function QuestionsBox({ content, author }: QuestionsProps) {

    return (
        <div className="question">
            <p>{content}</p>
            <footer>
                <div className="user-info">
                    <img src={author.avatar} alt={author.name} />
                    <span>{author.name}</span>
                </div>
            </footer>
            <div></div>
        </div>
    );
}