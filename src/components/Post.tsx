import { format, formatDistanceToNow } from "date-fns"
import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react"
import { ptBR } from "date-fns/locale"
import { Comment } from "./Comment"
import { Avatar } from "./Avatar"
import styles from "./Post.module.css"

interface Author {
  name: string
  avatarUrl: string
  role: string
}

interface Content {
  type: "paragraph" | "link"
  content: string
}

export interface PostType {
  id: number
  author: Author
  content: Content[]
  publishedAt: Date
}

interface PostProps {
  post: PostType
}

export function Post({ post }: PostProps) {
  const [comments, setComments] = useState(["Post muito legal"])

  const [newCommentText, setNewCommentText] = useState("")

  const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, {
    locale: ptBR,
    addSuffix: true,
  })

  const publishedDateFormatted = format(
    post.publishedAt,
    "dd 'de' MMMM 'às' HH:mm'h'",
    {
      locale: ptBR,
    }
  )

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault()

    setComments([...comments, newCommentText])
    setNewCommentText("")
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("")
    setNewCommentText(event.target.value)
  }

  function deleteComment(commentToDelete: string) {
    const commentsWithoutDeleteOne = comments.filter((comment) => {
      return comment !== commentToDelete
    })
    setComments(commentsWithoutDeleteOne)
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("Esse campo é obrigatório!!!")
  }

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={post.author.avatarUrl} />
          <div className={styles.info}>
            <strong>{post.author.name}</strong>
            <p>{post.author.role} </p>
          </div>
        </div>
        <time
          title={publishedDateFormatted}
          dateTime={post.publishedAt.toISOString()}
        >
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {post.content.map((item) => {
          if (item.type === 'paragraph') {
            return <p key={item.content}>{item.content}</p>
          } else if (item.type === 'link') {
            return (
              <p key={item.content}>
                <a href="#">{item.content} </a></p>
            )
          }
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>
        <textarea
          name="comment"
          value={newCommentText}
          placeholder="Escreva um comentário..."
          onChange={handleNewCommentChange}
          onInvalid={handleNewCommentInvalid}
          required
        />
        <footer>
          <button type="submit" disabled={newCommentText.length === 0}>
            {" "}
            Publicar{" "}
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map((comment) => {
          return (
            <Comment
              key={comment}
              content={comment}
              onDeleteComment={deleteComment}
            />
          )
        })}
      </div>
    </article>
  )
}
