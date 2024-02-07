import { Trash } from "@phosphor-icons/react"
import styles from "./Comment.module.css"
import { ThumbsUp } from "@phosphor-icons/react/dist/ssr"
import { Avatar } from "./Avatar"
import { useState } from "react"



interface CommentProps{
  content: string
  onDeleteComment: (comment: string) => void

}

export function Comment({ content, onDeleteComment }: CommentProps) {
  const [likeCount, setLikeCount] = useState(0)

  function handleLikeComment() {
    setLikeCount((state) => {
      return state + 1
    })
  }

  function handleDeleteComment() {
    onDeleteComment(content)
  }

  return (
    <div className={styles.comment}>
      <Avatar
        hasBorder={false}
        src="https://mighty.tools/mockmind-api/content/human/15.jpg"
        alt=""
      />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Natalye Cavalieri</strong>
              <time title="11 de Maio às 13:30h" dateTime="2024-01-31 13:30">
                Cerca de 2h atrás
              </time>
            </div>

            <button onClick={handleDeleteComment} title="Deletar comentário">
              <Trash size={24} />
            </button>
          </header>
          <p> {content} </p>
        </div>
        <footer>
          <button onClick={handleLikeComment}>
            <ThumbsUp size={20} />
            Apludir <span> {likeCount} </span>
          </button>
        </footer>
      </div>
    </div>
  )
}
