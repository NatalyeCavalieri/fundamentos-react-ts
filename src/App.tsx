import { Post, PostType } from "./components/Post"
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import './global.css'
import styles  from './App.module.css'

const posts: PostType[] = [
  {
    id: 1,
    author: {
      avatarUrl: "https://mighty.tools/mockmind-api/content/human/50.jpg",
      name: "Jerry Topsom",
      role: "FullStack Developer",
    },
    content: [
      {
        type: "paragraph",
        content: "Fala galeraa 👋",
      },
      {
        type: "paragraph",
        content:
          "Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀",
      },
      {
        type: "link",
        content: "👉 jane.design/doctorcare",
      },
    ],
    publishedAt: new Date("2024-02-01 05:30"),
  },
  {
    id: 2,
    author: {
      avatarUrl: "https://mighty.tools/mockmind-api/content/human/5.jpg",
      name: "Tom Rodrigues",
      role: "Backend Developer",
    },
    content: [
      {
        type: "paragraph",
        content: "Fala galeraa 👋",
      },
      {
        type: "paragraph",
        content:
          "Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀",
      },
      {
        type: "link",
        content: "👉 jane.design/doctorcare",
      },
    ],
    publishedAt: new Date("2024-01-02 10:30"),
  },
]
export function App() {
  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
         {posts.map(post => {
         return (
         <Post 
        key= {post.id}
        post = {post}
         />
         )
         })}
        </main>
      </div>
    </div>
  )
}

