export function filterUsers(users, query) {
  const keyword = query.trim().toLocaleLowerCase();
  return users.filter((user) =>
    [user.name, user.username, user.email, user.company?.name].some(
      (value) => typeof value === 'string' && value.toLocaleLowerCase().includes(keyword),
    ),
  );
}

export function filterPosts(posts, query) {
  const keyword = query.trim().toLocaleLowerCase();
  return posts.filter((post) => `${post.title} ${post.body}`.toLocaleLowerCase().includes(keyword));
}

export function getInitials(name) {
  return (
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0])
      .join('')
      .toUpperCase() || '?'
  );
}
