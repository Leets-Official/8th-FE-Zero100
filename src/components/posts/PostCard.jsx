export default function PostCard({ post, author }) {
  return (
    <article className="post-card">
      <div className="flex items-center justify-between gap-3">
        <span className="post-label">POST {String(post.id).padStart(3, '0')}</span>
        <span className="post-author">{author || `사용자 ${post.userId}`}</span>
      </div>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </article>
  );
}
